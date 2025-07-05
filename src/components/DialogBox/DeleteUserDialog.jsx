/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, message } from 'antd';
import axios from 'axios';
import { apis } from '../../auth/apis';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const DeleteUserDialog = ({ visible, onOk, onCancel, user, loading }) => {
    const [financialData, setFinancialData] = useState({
        shares: 0,
        savings: 0,
        pendingLoans: 0,
    });
    const [fetchingData, setFetchingData] = useState(false); // State for loading indicator
    const [buttonText, setButtonText] = useState('Ondoa Mwanachama');
    const [handleClick, setHandleClick] = useState(() => onOk);
    const [successPaymentData, setSuccessPaymentData] = useState({});
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    useEffect(() => {
        const fetchUserFinancialData = async () => {
            if (user) {
                setFetchingData(true); // Start loading indicator
                const token = localStorage.getItem('refresh_token');
                try {
                    const response = await axios.get(`${apis.getUserFinancialDataUrl}/${user.id}/`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`,
                        },
                    });
                    setFinancialData(response.data);
                } catch (error) {
                    console.error('Error fetching user financial data:', error);
                    toast.error('Imeshindikana kupata taarifa za kifedha za mwanachama', {
                        position: 'top-right',
                    });
                } finally {
                    setFetchingData(false); // Stop loading indicator
                }
            }
        };

        if (visible) {
            fetchUserFinancialData();
        }
    }, [visible, user]);

    const total = financialData.savings + financialData.shares;
    const userr = JSON.parse(localStorage.getItem('user'));

    const configuration = {
        public_key: 'FLWPUBK_TEST-ad169f46c21db341e24cbde5816d72bf-X',
        tx_ref: Date.now(),
        amount: total,
        currency: 'TZS',
        payment_options: "card, mobilemoney, ussd, bank transfer",
        customer: {
            email: userr.email,
            phone_number: userr.phone_number,
            name: userr.name,
        },
        customizations: {
            title: 'Rudisha Fedha',
            description: 'Rudisha Fedha',
        },
        // isTestMode: true,
    };

    const handleFlutterPayment = useFlutterwave(configuration);

    const handlePayment = async (response) => {
        console.log('Payment response:', response);

        if (response.status === "successful") {
            const paymentData = {
                ...response,
                description: 'Rudisha Fedha'
            };
            setSuccessPaymentData(paymentData);
            toast.success('Malipo yamekamilika.', {
                position: 'top-right',
            });
            setIsPaymentSuccessful(true);
            closePaymentModal();
        } else {
            message.error('Malipo hayakufanikiwa.', {
                position: 'top-right',
            });
            closePaymentModal();
        }
    };

    useEffect(() => {
        if (isPaymentSuccessful) {
            setButtonText('Ondoa Mwanachama');
            setHandleClick(() => onOk);
        } else {
            if (total !== 0) {
                setButtonText('Rudisha Fedha');
                setHandleClick(() => () => handleFlutterPayment({
                    callback: handlePayment,
                    onClose: () => {
                        console.log('Payment modal closed');
                    },
                }));
            } else {
                setButtonText('Ondoa Mwanachama');
                setHandleClick(() => onOk);
            }
        }
    }, [financialData.savings, financialData.shares, handleFlutterPayment, onOk, total, isPaymentSuccessful]);

    return (
        <Modal
            title={`Ondoa Mwanachama: ${user ? user.name : ''}`}
            open={visible}
            onOk={handleClick}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>,
                <Button key="delete" type="primary" onClick={handleClick} disabled={loading} danger>
                    {buttonText}
                </Button>,
            ]}
        >
            <Spin spinning={loading || fetchingData}>
                <p>Je, una uhakika unataka kuondoa mwanachama huyu?</p>
                <p>Hisa: {financialData.shares}</p>
                <p>Akiba: {financialData.savings}</p>
                <p>Mikopo Inayosubiri: {financialData.pendingLoans}</p>
                <p>Jumla ya Akiba + Hisa: {total}</p>
            </Spin>
            <ToastContainer transition={Bounce} />
        </Modal>
    );
};

export default DeleteUserDialog;
