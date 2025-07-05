/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal, Button, message, Spin } from 'antd';
import axios from 'axios';
import { apis } from '../../auth/apis';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const ReturnMembershipDialog = ({ visible, onOk, onCancel, user }) => {
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        const token = localStorage.getItem('refresh_token');
        setLoading(true);

        try {
            await axios.put(`${apis.returnUserMembershipUrl}/${user.id}/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            toast.success('Mwanachama amerudishwa kikamilifu', {
                position: 'top-right',
            });
            onOk(); // Update state after successful action
        } catch (error) {
            console.error('Error returning membership:', error);
            toast.error('Imeshindikana kurudisha uanachama', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Modal
            title={`Rudisha Uanachama wa: ${user ? user.name : ''}`}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel} disabled={loading}>
                    Cancel
                </Button>,
                <Button key="end" type="primary" onClick={handleOk} disabled={loading}>
                    Rudisha Uanachama
                </Button>,
            ]}
        >
            <Spin spinning={loading}>
                {user ? (
                    <p>Uko karibu kurudisha uanachama wa {user.name}. Tafadhali thibitisha hatua hii.</p>
                ) : (
                    <p>No user selected.</p>
                )}
            </Spin>
            <ToastContainer transition={Bounce} />
        </Modal>
    );
}

export default ReturnMembershipDialog;
