/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import moment from 'moment';
import { message } from 'antd';
import axios from 'axios';
import { apis } from '../../auth/apis';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const AdminVerifyLoansDialog = ({ setOpenModal, loan, user }) => {
    const token = localStorage.getItem('refresh_token');

    let [isOpen, setIsOpen] = useState(true);
    const [loanValidity, setLoanValidity] = useState('');
    const [reason, setReason] = useState('');
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [successPaymentData, setSuccessPaymentData] = useState({});
    const [loading, setLoading] = useState(false)

    function closeModal() {
        setIsOpen(false);
        setOpenModal(false);
    }

    const checkEligibility = async () => {
        try {
            const response = await axios.post(`${apis.verifyLoanUrl}/${loan.id}/`, {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.data.eligible) {
                toast.success("Mkopo huu umekidhi vigezo vya kulipwa", {
                    position: 'top-right',
                });
                setLoanValidity('Eligible');
            } else {
                toast.error('Haujakidhi vigezo vya mkopo', {
                    position: 'top-right',
                });
                setLoanValidity('Not Eligible');
            }
        } catch (error) {
            console.error('Error checking eligibility:', error);
            toast.error('Tatizo limejitokeza', {
                position: 'top-right',
            });
        }
    };

    const approveLoan = async () => {
        try {
            const response = await axios.post(`${apis.approveLoanUrl}/${loan.id}/`, {
                is_valid: loanValidity,
                reason,
                successPaymentData,
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.data.success) {
                toast.success("Mkopo umelipwa kwa mhusika kikamilifu", {
                    position: 'top-right',
                });
                console.log('Success: ', response.data);
                closeModal();
            } else {
                toast.error("Mkopo haukukidhi vigezo", {
                    position: 'top-right',
                });
            }
        } catch (error) {
            console.error('Error approving loan:', error);
            toast.error('Error approving loan:', {
                position: 'top-right',
            });
        }
    };

    const configuration = {
        public_key: 'FLWPUBK_TEST-ad169f46c21db341e24cbde5816d72bf-X',
        tx_ref: Date.now(),
        amount: loan.loanRequestAmount,
        currency: 'TZS',
        payment_options: "card, mobilemoney, ussd, bank transfer",
        customer: {
            email: user.email,
            phone_number: user.phone_number,
            name: user.name,
        },
        customizations: {
            title: 'Idhinisha Mkopo wa Mwombaji',
            description: 'Malipo ya mkopo kwenda kwa mwombaji',
        },
    };

    const handleFlutterPayment = useFlutterwave(configuration);

    const handlePaymentCallback = async (response) => {
        console.log('Payment response:', response);

        if (response.status === "successful") {
            const paymentData = {
                ...response,
                description: 'Malipo ya mkopo kwenda kwa mwombaji'
            };
            setSuccessPaymentData(paymentData);
            setIsPaymentSuccessful(true);
            toast.success('Malipo yamekamilika.', {
                position: 'top-right',
            });
            closePaymentModal();
            toast.info('Tafadhali subiri....', {
                position: 'top-right',
            });
        } else {
            toast.error("Malipo hayakufanikiwa, tafadhali jaribu tena.", {
                position: 'top-right',
            });
            closePaymentModal();
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full"
                    onClick={closeModal}
                ></div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto flex items-start justify-center pt-10">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-3xl p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl absolute top-5 elevation-5 right-20">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Fomu ya Kuidhinisha Mkopo</h1>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                                    onClick={closeModal}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </Dialog.Title>

                                        {/* Display loan and user details */}
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-semibold">Namba ya Uanachama wa Saccos:</p>
                                                <p>{user.membership_number}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Jina:</p>
                                                <p>{user.name}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Namba ya simu:</p>
                                                <p>{user.phone_number}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Aina ya Mkopo:</p>
                                                <p>{loan.loanType}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Kiasi cha Mkopo kilichoombwa:</p>
                                                <p>{loan.loanRequestAmount}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Sababu ya kuomba Mkopo:</p>
                                                <p>{loan.loanDescription}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Muda wa Marejesho(Miezi):</p>
                                                <p>{loan.loanRepayDuration}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Marejesho ya Kila Mwezi:</p>
                                                <p>{loan.loanRepayPerMonth}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Mfumo wa Urejeshaji mkopo:</p>
                                                <p>{loan.loanRepaymentPlan}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Wadhamini:</p>
                                                <p>{loan.referee}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Tarehe ya Maombi:</p>
                                                <p>{moment(loan.loanRequestDate).format("DD MMM YYYY")}</p>
                                            </div>
                                            {/* Eligibility check button */}
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white btn btn-primary border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                                    onClick={checkEligibility}
                                                >
                                                    Hakiki
                                                </button>
                                            </div>

                                            {/* Loan validity selection */}
                                            <div className="mt-4">
                                                <p className="block font-semibold">{loanValidity}</p>
                                            </div>
                                        </div>

                                        {/* Reason for invalidity */}
                                        {loanValidity === "Not Eligible" && (
                                            <div className="mt-4">
                                                <label htmlFor="reason" className="block font-semibold">Sababu ya Kutoidhinisha:</label>
                                                <textarea
                                                    id="reason"
                                                    className="w-full p-2 mt-2 border rounded"
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    placeholder="Eleza sababu za kutokuidhinisha mkopo"
                                                ></textarea>
                                            </div>
                                        )}

                                        {/* Buttons */}
                                        <div className="mt-6 flex justify-between">
                                            {loanValidity === 'Eligible' ? (
                                                !isPaymentSuccessful ? (
                                                    <button
                                                        onClick={() => {
                                                            message.warning('Tafadhali subiri....');
                                                            setLoading(true);
                                                            handleFlutterPayment({
                                                                callback: handlePaymentCallback,
                                                                onClose: () => {
                                                                    console.log('Payment modal closed');
                                                                    setLoading(false);
                                                                },
                                                            });
                                                        }}
                                                        className={"btn mt-2 w-full btn-primary"}
                                                    >
                                                        Fanya Malipo
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={"btn mt-2 w-full btn-primary"}
                                                        onClick={approveLoan}
                                                    >
                                                        Wasilisha
                                                    </button>
                                                )
                                            ) : (
                                                <button
                                                    type="button"
                                                    className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
                                                >
                                                    Wasilisha Sababu
                                                </button>
                                            )}
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <ToastContainer transition={Bounce} />
        </>
    );
} 


export default AdminVerifyLoansDialog