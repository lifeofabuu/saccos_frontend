/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';

const EventModal = ({ isOpen, onClose, onSave }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();
            onSave({
                event_date: values.event_date.format('YYYY-MM-DD HH:mm:ss'),
                next_event_date: values.next_event_date ? values.next_event_date.format('YYYY-MM-DD HH:mm:ss') : null,
                description: values.description,
                venue: values.venue
            });
            form.resetFields();
            onClose();
        } catch (error) {
            console.error('Validation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Weka Matukio"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" loading={loading} onClick={handleSave}>
                    Save
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="event_date"
                    label="Tarehe ya tukio:"
                    rules={[{ required: true, message: 'Chagua tarehe ya tukio' }]}
                >
                    <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name="next_event_date"
                    label="Tarehe ya Tukio linalofuata:"
                >
                    <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Maelezo ya tukio:"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="venue"
                    label="Ukumbi:"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EventModal;
