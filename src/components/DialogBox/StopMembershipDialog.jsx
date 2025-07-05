/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal, Button, message, Input, Spin } from 'antd';
import axios from 'axios';
import { apis } from '../../auth/apis';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const StopMembershipDialog = ({ visible, onOk, onCancel, user }) => {
    const [endReason, setEndReason] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        const token = localStorage.getItem('refresh_token');
        setLoading(true);

        try {
            await axios.put(`${apis.restrictUserUrl}/${user.id}/`, {
                reason: endReason 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            toast.success('Mwanachama amesitishwa kikamilifu', {
                position: 'top-right',
            });
            onOk(); // Update state after successful action
        } catch (error) {
            console.error('Error ending membership:', error);
            toast.error('Imeshindikana kusitisha uanachama', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEndReason(''); // Clear reason input on cancel
        onCancel();
    };

    return (
        <Modal
            title={`Sitisha Uanachama wa: ${user ? user.name : ''}`}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="end" type="primary" onClick={handleOk} disabled={!endReason.trim() || loading}>
                    Sitisha Uanachama
                </Button>,
            ]}
        >
            <Spin spinning={loading}>
                {user ? (
                    <>
                        <p>Sababu:</p>
                        <Input.TextArea
                            placeholder="Eleza sababu za kusitisha uanachama"
                            value={endReason}
                            onChange={(e) => setEndReason(e.target.value)}
                            rows={4}
                        />
                    </>
                ) : (
                    <p>No user selected.</p>
                )}
            </Spin>
            <ToastContainer transition={Bounce} />
        </Modal>
    );
}

export default StopMembershipDialog;
