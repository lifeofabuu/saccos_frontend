/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import InputText from "../Input/InputText";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { message } from 'antd';
import axios from "axios";
import { apis } from "../../auth/apis";
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const SHARE_COST = 30000; // Cost of each share

export default function Modal({ setOpenModal }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('refresh_token');

    const INITIAL_OBJ = {
        membership_number: user.membership_number || '',
        amount: '', number_of_shares: ''
    };

    let [isOpen, setIsOpen] = useState(true)
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false); // State variable for the inner payment dialog
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // New state for payment success
    const [successPaymentData, setSuccessPaymentData] = useState({});
    const [requestObj, setRequestObj] = useState(INITIAL_OBJ);
    const [loading, setLoading] = useState(false);

    const configuration = {
        public_key: 'FLWPUBK_TEST-ad169f46c21db341e24cbde5816d72bf-X',
        tx_ref: Date.now(),
        amount: requestObj.amount,
        currency: 'TZS',
        payment_options: "card, mobilemoneytanzania, account, banktransfer, credit, ussd",
        customer: {
            email: user.email,
            phone_number: user.phone_number,
            name: user.name,
        },
        customizations: {
            title: 'Hisa',
            description: 'Malipo ya Hisa',
        },
        // isTestMode: true,
    };

    const handleFlutterPayment = useFlutterwave(configuration);

    const handlePaymentCallback = async (response) => {
        if (response.status === "successful") {
            // Append the description field to the response data
            const paymentData = {
                ...response,
                description: 'Hisa'
            };
            console.log('Payment Data: ', paymentData);
            setSuccessPaymentData(paymentData);
            setIsPaymentSuccessful(true);
            toast.success('Malipo yamekamilika.', {
                position: "top-right",
            })
            // closes the Flutterwave payment modal after successful payment
            closePaymentModal();
            toast.info('Tafadhali subiri....', {
                position: "top-right",
            })
            // function to save share data to backend
            try {
                const data = {
                    requestObj: {
                        membership_number: requestObj.membership_number,
                        amount: requestObj.amount,
                        number_of_shares: requestObj.number_of_shares
                    },
                    successPaymentData: paymentData,
                    user: user,
                };

                const response = await axios.post(apis.sharesUrl, data, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    toast.success('Hisa imewasilishwa kikamilifu', {
                        position: "top-right",
                    });
                    closeModal();
                } else {
                    console.log('Error: ', response.error);
                    toast.error("Failed", {
                        position: "top-right",
                    });
                    setIsPaymentDialogOpen(true);
                }
            } catch (error) {
                console.log('Error: ', error);
                toast.error('An error Occured', {
                    position: "top-right",
                });
            } finally {
                setLoading(false);
            }
        } else {
            // Payment failed
            toast.error("Malipo hayakufanikiwa, tafadhali jaribu tena.", {
                position: 'top-right',
            });
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        if (updateType === "number_of_shares") {
            const newAmount = value * SHARE_COST;
            setRequestObj({ ...requestObj, number_of_shares: value, amount: newAmount });
        } else {
            setRequestObj({ ...requestObj, [updateType]: value });
        }
    };

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // Function to handle payment submission
    const handlePayment = () => {
        // Implement payment logic here
        setIsPaymentDialogOpen(true); // Open the inner payment dialog after successful payment submission
    }

    // Function to close the inner payment dialog
    const closePaymentDialog = () => {
        setIsPaymentDialogOpen(false);
        setIsOpen(false)
    }

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full"
                    onClick={() => setOpenModal(false)}
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

                        <div className="fixed inset-0 overflow-y-auto">
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
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Fomu ya Malipo ya Hisa
                                        </Dialog.Title>
                                        {/* Input fields for payment details */}
                                        <div className="mt-4">
                                            <InputText
                                                labelTitle="Namba ya Uanachama wa Saccos"
                                                updateType="membership_number"
                                                value="membership_number"
                                                placeholder={requestObj.membership_number}
                                                defaultValue={requestObj.membership_number}
                                                updateFormValue={updateFormValue}
                                                disabled={true} 
                                            />
                                            <InputText
                                                labelTitle="Idadi ya Hisa"
                                                updateType="number_of_shares"
                                                value="number_of_shares"
                                                placeholder={requestObj.number_of_shares}
                                                defaultValue={requestObj.number_of_shares}
                                                updateFormValue={updateFormValue}
                                            />
                                            <InputText
                                                labelTitle="Kiasi"
                                                updateType="amount"
                                                value='amount'
                                                placeholder={requestObj.amount}
                                                defaultValue={requestObj.amount}
                                                updateFormValue={updateFormValue}
                                                disabled={true} // Disable the amount input field
                                            />
                                        </div>

                                        {/* Add more input fields for other payment details as needed */}

                                        {/* Button to submit the payment */}
                                        <div className="mt-8 flex justify-between">
                                            <div>
                                                {!isPaymentSuccessful ?
                                                    <button
                                                    onClick={() => {
                                                        message.warning('Tafadhali subiri....');
                                                        setLoading(true);
                                                        handleFlutterPayment({
                                                            callback: handlePaymentCallback,
                                                            onClose: () => {
                                                                console.log('Payment modal closed');
                                                                setLoading(false)
                                                            },
                                                        });
                                                    }}
                                                    className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
                                                >
                                                    Nunua
                                                </button>
                                                :
                                                    <button className="btn mt-2 btn-disabled btn-primary w-full">inawasilisha...</button>
                                                }
                                            </div>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="btn mt-2 bg-red-500  hover:bg-red-700 text-white "
                                            >
                                                Batilisha
                                            </button>
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
