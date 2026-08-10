import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Spin, Tag, message, ConfigProvider, Image } from 'antd';
import { ViedoService } from '../../services/viedo.service';

interface VideoData {
    id: string;
    header: string;
    description: string;
    document: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    status: string;
}

const VideoView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetchVideoDetails(id);
        }
    }, [id]);

    const fetchVideoDetails = async (videoId: string) => {
        try {
            setLoading(true);
            const response = await ViedoService.getViedoById(videoId);
            setData(response.data || response);
        } catch (error) {
            message.error('Failed to load video details.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <h4 className="text-muted mb-4">Video not found</h4>
                <Button type="primary" onClick={() => navigate('/video-gallery')}>Back to Gallery</Button>
            </div>
        );
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Descriptions: {
                        labelBg: '#f2f7f5',
                        contentColor: '#333333',
                    },
                    Card: {
                        headerBg: 'linear-gradient(135deg, rgba(23, 59, 48, 0.03), rgba(186, 46, 38, 0.03))',
                    }
                }
            }}
        >
            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0 page-title" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Video Details</h2>
                    <Button onClick={() => navigate('/video-gallery')} icon={<i className="bi bi-arrow-left"></i>} size="large">
                        Back to Gallery
                    </Button>
                </div>

                <div className="row g-4">
                    {/* Left Column: Image Viewer */}
                    <div className="col-12 col-lg-5">
                        <Card
                            className="shadow-sm h-100"
                            style={{ borderRadius: '12px', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            bodyStyle={{ padding: '24px', width: '100%', display: 'flex', justifyContent: 'center' }}
                        >
                            <Image
                                src={data.document}
                                alt={data.header}
                                style={{ maxHeight: '400px', objectFit: 'contain', borderRadius: '8px' }}
                                fallback="https://via.placeholder.com/400x300?text=Image+Not+Found"
                            />
                        </Card>
                    </div>

                    {/* Right Column: Details */}
                    <div className="col-12 col-lg-7">
                        <Card
                            className="shadow-sm h-100"
                            style={{ borderRadius: '12px', border: 'none' }}
                            title={
                                <div className="d-flex align-items-center gap-3 py-2">
                                    <div
                                        className="d-flex justify-content-center align-items-center text-white shadow-sm"
                                        style={{
                                            width: '48px', height: '48px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--logo-primary), var(--logo-secondary))',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        <i className="bi bi-image"></i>
                                    </div>
                                    <div>
                                        <h3 className="mb-1" style={{ color: 'var(--logo-primary)', fontWeight: 700, letterSpacing: '-0.3px' }}>
                                            {data.header}
                                        </h3>
                                        <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                                            ID: <span style={{ fontFamily: 'monospace' }}>{data.id}</span>
                                        </span>
                                    </div>
                                </div>
                            }
                        >
                            <Descriptions
                                bordered
                                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                                size="middle"
                                labelStyle={{ fontWeight: 600, color: '#1e293b', width: '180px' }}
                                contentStyle={{ fontSize: '0.95rem' }}
                            >
                                <Descriptions.Item label="Header">
                                    {data.header}
                                </Descriptions.Item>

                                <Descriptions.Item label="Description">
                                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                        {data.description || <span className="text-muted fst-italic">No description provided</span>}
                                    </div>
                                </Descriptions.Item>

                                <Descriptions.Item label="Status">
                                    <Tag color={data.isActive ? 'success' : 'error'} style={{ fontWeight: 600, padding: '2px 10px', borderRadius: '6px' }}>
                                        {data.status || (data.isActive ? 'Active' : 'Inactive')}
                                    </Tag>
                                </Descriptions.Item>

                                <Descriptions.Item label="Created On">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-calendar-event text-muted"></i>
                                        {new Date(data.createdAt).toLocaleString(undefined, {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </div>
                                </Descriptions.Item>

                                <Descriptions.Item label="Last Updated">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-clock-history text-muted"></i>
                                        {new Date(data.updatedAt).toLocaleString(undefined, {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </div>
                                </Descriptions.Item>

                                <Descriptions.Item label="Document Link">
                                    <a href={data.document} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                                        <i className="bi bi-box-arrow-up-right me-1"></i> Open Image in New Tab
                                    </a>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VideoView;
