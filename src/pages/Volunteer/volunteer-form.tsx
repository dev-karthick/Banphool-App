import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, Tag, message, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { VolunteerService } from '../../services/volunteer.service';

const { TextArea } = Input;

const volunteerRoles = [
    {
        label: "Social Justice",
        value: "socialJustice"
    },
    {
        label: "Women Empowerment",
        value: "womenEmpowerment"
    },
    {
        label: "Education",
        value: "education"
    },
    {
        label: "Health Assistance",
        value: "healthAssistance"
    },
    {
        label: "Legal Assistance",
        value: "legalAssistance"
    }
];

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

export default function VolunteerForm() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        console.log("Values: ", values);
        try {
            setIsSubmitting(true);

            const response = await VolunteerService.createVolunteer(values);

            messageApi.success(response.message);

            navigate("/volunteer");
        } catch (error) {
            console.log(error);

            messageApi.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        messageApi.warning('Please fill in all required fields correctly.');
    };

    return (
        <div className="p-4" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            {contextHolder}
            <div className="d-flex justify-content-between align-items-center mb-4 col-md-8">
                <h2 className="fw-bold mb-0">Add New Volunteer</h2>
                <Button onClick={() => navigate('/volunteer')} icon={<i className="bi bi-arrow-left"></i>} size="large">
                    Back to List
                </Button>
            </div>

            <Card className="border-0 shadow-sm rounded-4 col-md-8">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    requiredMark={customizeRequiredMark}
                >
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            {/* 1. Simple Input */}
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>First Name</span>}
                                name="firstName"
                                rules={[{ required: true, message: 'Please input the volunteer name!' }]}
                            >
                                <Input placeholder="Enter first name" size="large" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Last Name</span>}
                                name="lastName"
                                rules={[{ required: true, message: 'Please input the volunteer name!' }]}
                            >
                                <Input placeholder="Enter last name" size="large" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Email</span>}
                                name="email"
                                rules={[{ required: false, message: 'Please input the volunteer email!' }]}
                            >
                                <Input placeholder="Enter email" size="large" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Phone Number</span>}
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please input the phone number!' }]}
                            >
                                <Input placeholder="Enter phone number" size="large" maxLength={10} />
                            </Form.Item>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Address</span>}
                                name="address"
                                rules={[{ required: true, message: 'Please input the address!' }]}
                            >
                                <Input placeholder="Enter address" size="large" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6 mb-2">
                            {/* 2. Dropdown (Select) */}
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Area of Interest</span>}
                                name="interestArea"
                                rules={[{ required: true, message: 'Please select an area of interest!' }]}
                            >
                                <Select size="large" placeholder="Select an area of interest" showSearch={{ optionFilterProp: 'label' }} allowClear>
                                    {volunteerRoles.map((role) => (
                                        <Select.Option
                                            key={role.value}
                                            value={role.value}
                                            label={role.label}
                                        >
                                            {role.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        {/* 3. Textarea */}
                        <div className="col-md-12">
                            <Form.Item
                                label={<span className="fw-semibold fs-6" style={{ fontFamily: 'Poppins' }}>Remarks</span>}
                                name="remarks"
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Enter remarks or any additional notes..."
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item className="mb-0 mt-4 text-end">
                        <Button size="large" className="me-2" onClick={() => form.resetFields()}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit" size="large" loading={isSubmitting} style={{ backgroundColor: 'var(--logo-primary)' }}>
                            Save Volunteer
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
