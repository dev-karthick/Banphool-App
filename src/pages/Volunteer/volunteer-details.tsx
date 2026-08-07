import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Spin, Tag, message, ConfigProvider } from 'antd';
import { VolunteerService } from '../../services/volunteer.service';

interface VolunteerData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    interestArea: string;
    address: string;
    remarks: string;
    createdAt: string;
    updatedAt: string;
}

const VolunteerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<VolunteerData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetchVolunteerDetails(id);
        }
    }, [id]);

    const fetchVolunteerDetails = async (volunteerId: string) => {
        try {
            setLoading(true);
            const response = await VolunteerService.getVolunteerById(volunteerId);
            setData(response.data || response);
        } catch (error) {
            message.error('Failed to load volunteer details.');
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
                <h4 className="text-muted mb-4">Volunteer not found</h4>
                <Button type="primary" onClick={() => navigate('/volunteer')}>Back to List</Button>
            </div>
        );
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Descriptions: {
                        labelBg: '#f2f7f5', // Very light green background for labels
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
                    <h2 className="mb-0 page-title" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Volunteer Profile</h2>
                    <Button onClick={() => navigate('/volunteer')} icon={<i className="bi bi-arrow-left"></i>} size="large">
                        Back to List
                    </Button>
                </div>

                <Card
                    className="shadow-sm"
                    style={{ borderRadius: '12px', border: 'none', overflow: 'hidden' }}
                    title={
                        <div className="d-flex align-items-center gap-3 py-3">
                            <div
                                className="d-flex justify-content-center align-items-center text-white shadow-sm"
                                style={{
                                    width: '56px', height: '56px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--logo-primary), var(--logo-secondary))',
                                    fontSize: '1.5rem', fontWeight: 600
                                }}
                            >
                                {data.firstName.charAt(0)}
                            </div>
                            <div>
                                <h3 className="mb-1" style={{ color: 'var(--logo-primary)', fontWeight: 700, letterSpacing: '-0.3px' }}>
                                    {data.firstName} {data.lastName}
                                </h3>
                                <span className="text-muted d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                                    <i className="bi bi-clock"></i> Joined {new Date(data.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    }
                >
                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        size="middle"
                    >
                        <Descriptions.Item label={<span className="fw-medium text-dark"><i className="bi bi-envelope me-2 text-muted"></i>Email</span>}>
                            {data.email}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="fw-medium text-dark"><i className="bi bi-telephone me-2 text-muted"></i>Phone Number</span>}>
                            {data.phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="fw-medium text-dark"><i className="bi bi-star me-2 text-muted"></i>Interest Area</span>}>
                            <Tag color="green" style={{ textTransform: 'capitalize', padding: '4px 12px', borderRadius: '4px', fontSize: '13px' }}>
                                {data.interestArea}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="fw-medium text-dark"><i className="bi bi-calendar-check me-2 text-muted"></i>Last Updated</span>}>
                            {new Date(data.updatedAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="fw-medium text-dark"><i className="bi bi-geo-alt me-2 text-muted"></i>Address</span>} span={2}>
                            {data.address || 'Not Provided'}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="fw-medium text-dark"><i className="bi bi-chat-left-text me-2 text-muted"></i>Remarks</span>} span={2}>
                            {data.remarks || 'None'}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </ConfigProvider>
    );
};

export default VolunteerDetails;
