import React, { useState, useRef } from 'react';
import { Card, Button, Progress, message, Input, Form, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ViedoService } from '../../services/viedo.service';

/**
 * PhotoForm Component
 * 
 * [ANGULAR CONCEPT]: In Angular, this would be your @Component class (e.g. PhotoFormComponent).
 * In React, we use functional components. We manage state (like properties in an Angular class) using the `useState` hook.
 */
export default function VideoForm() {
    const navigate = useNavigate();

    // [ANGULAR CONCEPT]: `useRef` is similar to `@ViewChild()` in Angular. 
    // It gives us a direct reference to a DOM element.
    const fileInputRef = useRef<HTMLInputElement>(null);

    // [ANGULAR CONCEPT]: `useState` is how we declare state. 
    // `fileList` is the current value (like `this.fileList`), and `setFileList` is the function to update it.
    const [fileList, setFileList] = useState<any[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // [ANGULAR CONCEPT]: Ant Design Form instance for reactive forms
    const [form] = Form.useForm();
    const header = Form.useWatch('header', form);
    const description = Form.useWatch('description', form);

    /**
     * Handle file selection from the hidden input or drag-and-drop
     */
    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const file = files[0];

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            return message.error("Only JPG and PNG files are allowed.");
        }

        if (file.size > 1 * 1024 * 1024) {
            return message.error("File size must be less than 1 MB.");
        }

        setFileList([
            {
                id: Date.now(),
                file,
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(1) + " MB",
                progress: 0,
                status: "pending",
            },
        ]);
    };

    /**
     * Submit all pending and error files
     */
    /**
     * Submit all pending and error files in a single batch request
     */
    const submitAllFiles = async () => {
        if (!fileList.length) return;

        try {
            const values = await form.validateFields();

            updateFileState(fileList[0].id, {
                status: "uploading",
                progress: 50,
            });

            const response = await ViedoService.uploadViedo({
                header: values.header,
                description: values.description,
                document: fileList[0].file,
            });

            updateFileState(fileList[0].id, {
                status: "success",
                progress: 100,
            });
            console.log(response);
            message.success(response.message);
            navigate('/video-gallery')
        } catch (error: any) {
            if (error.errorFields) {
                return; // Validation failed, do not proceed
            }

            updateFileState(fileList[0].id, {
                status: "error",
            });

            message.error(error.message || 'Upload failed');
        }
    };

    /**
     * Helper to update specific file attributes in the state array
     */
    const updateFileState = (id: number, updates: any) => {
        setFileList(prev =>
            prev.map(file =>
                file.id === id ? { ...file, ...updates } : file
            )
        );
    };

    const removeFile = (id: number) => {
        setFileList(prev => prev.filter(file => file.id !== id));
    };

    // --- Drag and Drop Handlers ---
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
        <>
            {required ? (
                <Tag color="error" className="me-2 fw-semibold">Required</Tag>
            ) : (
                <Tag color="warning" className="me-2 fw-semibold">optional</Tag>
            )}
            {label}
        </>
    );

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Card
                className="shadow-sm border-0"
                style={{ width: '650px', borderRadius: '16px' }}
                bodyStyle={{ padding: '32px' }}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                        <i className="bi bi-file-earmark-arrow-up"></i> Upload Files
                    </h5>
                    <Button type="text" icon={<i className="bi bi-x-lg"></i>} onClick={() => navigate('/video-gallery')} />
                </div>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Uploaded project attachments.</p>

                {/* Form Fields */}
                <div className="mt-1">
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark={customizeRequiredMark}>
                        <div className='col-md-12'>
                            <Form.Item label={<span className='fs-6 fw-semibold' style={{ fontFamily: 'Poppins' }}>Enter Video Header</span>} name="header"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please enter the video header!'
                                        }
                                    ]
                                }>
                                <Input
                                    placeholder="Enter Video Header"
                                    className="mb-2"
                                    size="large"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item name="description" label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Description</span>} rules={
                            [
                                {
                                    required: true,
                                    message: 'Please enter the description!'
                                }
                            ]
                        }>
                            <Input.TextArea
                                placeholder="Enter Description"
                                rows={3}
                                cols={1}
                            />
                        </Form.Item>
                    </Form>
                </div>

                {/* Drag & Drop Zone */}
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="d-flex flex-column justify-content-center align-items-center text-center mt-3"
                    style={{
                        border: `1.5px dashed ${isDragging ? 'var(--logo-primary)' : '#b7d5c9'}`,
                        backgroundColor: isDragging ? '#eaf5ef' : '#f4faf7',
                        borderRadius: '12px',
                        padding: '30px 20px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <i className="bi bi-file-earmark-medical-fill mb-2" style={{ fontSize: '2rem', color: 'var(--logo-primary)' }}></i>
                    <p className="mb-2" style={{ fontWeight: 500, color: '#333' }}>Drag & drop your files here or</p>

                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="d-none"
                        ref={fileInputRef}
                        onChange={(e) => handleFiles(e.target.files)}
                    />

                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        style={{ backgroundColor: '#e2e8f0', border: 'none', color: '#475569', fontWeight: 500, borderRadius: '8px' }}
                    >
                        Choose files
                    </Button>
                </div>

                <p className="text-muted mt-2 mb-4" style={{ fontSize: '0.85rem' }}>
                    Only .jpg and .png files. 1MB max file size.
                </p>

                {/* [ANGULAR CONCEPT]: *ngIf="fileList.length > 0" */}
                {
                    fileList.length > 0 && (
                        <>
                            <h6 className="fw-bold mb-3">Uploaded Files</h6>

                            <div className="d-flex flex-column gap-3 mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {/* [ANGULAR CONCEPT]: *ngFor="let file of fileList" */}
                                {fileList.map((file) => (
                                    <div key={file.id} className="card border rounded-3 p-3 position-relative" style={{ borderColor: '#e2e8f0' }}>
                                        <div className="d-flex align-items-center gap-3">

                                            {/* Icon based on status */}
                                            <div style={{ color: file.status === 'error' ? '#dc3545' : '#64748b' }}>
                                                {file.status === 'success' && <i className="bi bi-file-image fs-4"></i>}
                                                {file.status === 'error' && <i className="bi bi-image fs-4"></i>}
                                                {(file.status === 'uploading' || file.status === 'pending') && <i className="bi bi-file-earmark fs-4"></i>}
                                            </div>

                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="text-truncate fw-semibold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                                                    {file.name}
                                                </div>

                                                {file.status === 'pending' && (
                                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                        {file.size} | Ready to upload
                                                    </div>
                                                )}

                                                {file.status === 'uploading' && (
                                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                        {file.size} | {file.progress}% • uploading...
                                                    </div>
                                                )}

                                                {file.status === 'success' && (
                                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                        {file.size}
                                                    </div>
                                                )}

                                                {file.status === 'error' && (
                                                    <div className="text-danger" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                                                        Upload failed
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="d-flex align-items-center gap-2">
                                                {file.status === 'error' && (
                                                    <Button type="text" size="small" icon={<i className="bi bi-arrow-repeat"></i>} onClick={() => updateFileState(file.id, { status: 'pending' })} />
                                                )}
                                                <Button type="text" size="small" className="text-muted" icon={<i className="bi bi-trash3"></i>} onClick={() => removeFile(file.id)} />
                                            </div>
                                        </div>

                                        {/* Progress Bar overlay at the bottom of the card for uploading state */}
                                        {file.status === 'uploading' && (
                                            <div className="position-absolute bottom-0 start-0 w-100 px-3 pb-1">
                                                <Progress percent={file.progress} showInfo={false} strokeColor="var(--logo-primary)" size="small" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }

                {/* Footer Buttons */}
                <div className="d-flex gap-3 mt-4">
                    <Button size="large" className="flex-fill fw-semibold rounded-3" onClick={() => navigate('/video-gallery')}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        className="flex-fill fw-semibold rounded-3"
                        style={{ backgroundColor: 'var(--logo-primary)' }}
                        disabled={fileList.length === 0 || fileList.some(f => f.status === 'uploading') || !header || !description}
                        onClick={submitAllFiles}
                    >
                        {fileList.some(f => f.status === 'uploading') ? 'Uploading...' : 'Attach files'}
                    </Button>
                </div>
            </Card >
        </div >
    );
}