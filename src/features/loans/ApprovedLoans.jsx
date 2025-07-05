/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { apis } from '../../auth/apis';
import axios from 'axios';
import moment from 'moment';
import { message } from 'antd';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const ApprovedLoans = () => {
    const token = localStorage.getItem('refresh_token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [loading, setLoading] = useState(false);
    const [approvedLoans, setApprovedLoans] = useState([]);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [successPaymentData, setSuccessPaymentData] = useState({});

    useEffect(() => {
        const fetchApprovedLoans = async () => {
            setLoading(true);
            try {
                const response = await axios.get(apis.userApprovedLoansUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                console.log("Response: ", response.data);
                if (response.data.success) {
                    setApprovedLoans(response.data.data);
                    console.log(response.data);
                } else {
                    console.log('An error occured')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedLoans();
    }, [token]);

    const handlePaymentCallback = async (response, approvedLoan) => {

        if (response.status === "successful") {
            const paymentData = {
                response,
                description: 'Malipo ya kupunguza deni la mkopo.'
            };
            setSuccessPaymentData(paymentData);
            setIsPaymentSuccessful(true);
            message.success('Malipo yamekamilika.');
            closePaymentModal();
            message.warning('Tafadhali subiri....');

            // Perform backend update after successful payment
            try {

                const response = await axios.put(`${apis.approveLoanUrl}/${approvedLoan.id}/`, successPaymentData, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    message.success('Mikopo imesasishwa kwa mafanikio.');
                    // Update loan data locally
                    setApprovedLoans(prevLoans =>
                        prevLoans.map(loan => loan.id === approvedLoan.id ? { ...loan } : loan)
                    );
                } else {
                    message.error('Imeshindwa kusasisha mkopo, tafadhali jaribu tena.');
                }
            } catch (error) {
                console.error('Error updating loan:', error);
                message.error('Imeshindwa kusasisha mkopo, tafadhali jaribu tena.');
            }
        } else {
            message.error("Malipo hayakufanikiwa, tafadhali jaribu tena.");
            closePaymentModal();
        }
    };

    const handlePayment = (approvedLoan) => {
        const configuration = {
            public_key: 'FLWPUBK_TEST-ad169f46c21db341e24cbde5816d72bf-X',
            tx_ref: Date.now(),
            amount: approvedLoan.loanRepayPerMonth,
            currency: 'TZS',
            payment_options: "card, mobilemoney, ussd, bank transfer",
            customer: {
                email: user.email,
                phone_number: user.phone_number,
                name: user.name,
            },
            customizations: {
                title: 'Punguza Deni La Mkopo',
                description: 'Punguza Deni La Mkopo',
            },
        };

        const handleFlutterPayment = useFlutterwave(configuration);

        // Wrap handlePaymentCallback to include approvedLoan
        const callbackWrapper = (response) => handlePaymentCallback(response, approvedLoan);

        handleFlutterPayment({
            callback: callbackWrapper,
            onClose: () => {
                console.log('Payment modal closed');
                setLoading(false);
            },
        });
    };


    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Kiasi Cha mkopo(TZS)</th>
                                <th>Aina ya Mkopo</th>
                                <th>Tarehe ya maombi</th>
                                <th>Muda wa malipo (miezi)</th>
                                <th>Kiasi cha malipo ya kila mwezi</th>
                                <th>Tarehe ya mwisho ya malipo</th>
                                <th>Aina ya malipo</th>
                                <th>Wadhamini</th>
                                <th>Kiasi Ambacho kishalipwa</th>
                                <th>Kiasi Kilichobaki</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {approvedLoans.map((approvedLoan, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{approvedLoan.loanRequestAmount}</td>
                                    <td>{approvedLoan.loanType}</td>
                                    <td>{moment(approvedLoan.loanRequestDate).format("DD MMM YYYY")}</td>
                                    <td>{approvedLoan.loanRepayDuration}</td>
                                    <td>{approvedLoan.loanRepayPerMonth}</td>
                                    <td>{moment(approvedLoan.loanPaymentDeadline).format("DD MMM YYYY")}</td>
                                    <td>{approvedLoan.loanRepaymentPlan}</td>
                                    <td>{approvedLoan.referee}</td>
                                    <td>{approvedLoan.amount_already_paid}</td>
                                    <td>{approvedLoan.amount_remaining}</td>
                                    <td>
                                        {approvedLoan.loanRepaymentPlan === 'malipo binafsi' ?
                                            <button
                                                onClick={() => {
                                                    message.warning('Tafadhali subiri....');
                                                    setLoading(true);
                                                    handlePayment(approvedLoan);
                                                }}
                                                className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
                                            >
                                                Punguza Deni
                                            </button>
                                            :
                                                ''
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </>
    )
}

export default ApprovedLoans