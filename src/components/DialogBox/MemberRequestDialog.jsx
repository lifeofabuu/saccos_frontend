/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import ErrorText from '../Typography/ErrorText';
import axios from 'axios';
import { apis } from '../../auth/apis';
import { message } from 'antd';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const MemberRequestDialog = ({ setOpenModal, request }) => {
    let [isOpen, setIsOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState('sehemuA');
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false); // State variable for the inner payment dialog
    const [errorMessage, setErrorMessage] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [transactionData, setTransactionData] = useState([]);
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // State variable for submit button loading

    useEffect(() => {
        // Initialize available membership numbers from 1 to 500
        const initialNumbers = Array.from({ length: 500 }, (_, index) => (index + 1).toString());
        setAvailableNumbers(initialNumbers);
    }, []);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // Function to handle payment submission
    const handleClick = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true); // Start loading state

        try {
            // Send a POST request to your backend API endpoint to create the user
            const response = await axios.post(`${apis.adminVerifyMembershipRequestUrl}/${request.id}/`, { membershipNumber });
            if (response.status === 201) {
                // Handle successful user creation
                toast.success('Sajili mwanachama Kikamilifu', {
                    position: 'top-right',
                });
                console.log('User created successfully:', response.data);
                setErrorMessage('Success');
                setIsPaymentDialogOpen(true); // Open the inner payment dialog after successful payment submission

                // Remove the selected membership number from available numbers
                setAvailableNumbers(numbers => numbers.filter(num => num !== membershipNumber));
            } else {
                toast.error('Imefeli', {
                    position: 'top-right',
                });
                setErrorMessage('Failed!! Please try again');
                throw new Error('Not success');
            }
        } catch (error) {
            toast.error('There was an error!', {
                position: 'top-right',
            });
            console.error('There was an error!', error);
        } finally {
            setIsSubmitting(false); // Stop loading state
        }
    };

    useEffect(() => {
        const fetchTransaction = async () => {
            setErrorMessage('');
            try {
                const token = localStorage.getItem('refresh_token');
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const response = await axios.get(`${apis.getUserKiingilioTransaction}${request.id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log('success: ', response.data);
                    setTransactionData(response.data);
                } else {
                    console.log('Failed: ', response.data.error);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTransaction();
    }, [request.id]);

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setMembershipNumber(value);
    };

    // Function to close the inner payment dialog
    const closePaymentDialog = () => {
        setIsPaymentDialogOpen(false);
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full" onClick={() => setOpenModal(false)}></div>
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
                            <div className="flex items-center justify-center min-h-full p-8 text-center sm:p-6 lg:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-3xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:p-6 lg:p-10 absolute top-0 elevation-5 right-20">
                                        <Dialog.Title>
                                            <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                                                    Fomu ya Uthibitisho wa maombi ya Uanachama
                                                </h1>
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </Dialog.Title>
                                        <div className="border-b border-gray-200 flex">
                                            <div
                                                className={`py-4 px-2 sm:px-4 cursor-pointer hover:text-blue-500 focus:outline-none border-b-2 border-transparent ${selectedTab === 'sehemuA' && 'text-md sm:text-lg font-bold'
                                                    }`}
                                                onClick={() => setSelectedTab('sehemuA')}
                                            >
                                                SEHEMU A: TAARIFA ZA MWOMBAJI
                                            </div>
                                            <div
                                                className={`py-4 px-2 sm:px-4 cursor-pointer hover:text-blue-500 focus:outline-none border-b-2 border-transparent ${selectedTab === 'sehemuB' && 'text-md sm:text-lg font-bold'
                                                    }`}
                                                onClick={() => setSelectedTab('sehemuB')}
                                            >
                                                SEHEMU B: SAJILI MWANACHAMA
                                            </div>
                                        </div>
                                        {selectedTab === 'sehemuA' && (
                                            <div>
                                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black">
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm sm:text-md font-medium">
                                                            Jina la Mwombaji:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.name}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="slp" className="block text-sm sm:text-md font-medium">
                                                            S.L.P:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.slp}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="cheo" className="block text-sm sm:text-md font-medium">
                                                            Cheo:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.cheo}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="taasisi" className="block text-sm sm:text-md font-medium">
                                                            Taasisi/Wizara/Halmashauri:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.taasisi}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="idara" className="block text-sm sm:text-md font-medium">
                                                            Idara:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.idara}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="nida_namba" className="block text-sm sm:text-md font-medium">
                                                            Nida Namba:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.nida_namba}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="tarehe_ya_kuzaliwa" className="block text-sm sm:text-md font-medium">
                                                            Tarehe ya kuzaliwa:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.tarehe_ya_kuzaliwa}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="tarehe_ya_kuajiriwa" className="block text-sm sm:text-md font-medium">
                                                            Tarehe ya kuajiriwa:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.tarehe_ya_kuajiriwa}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="tarehe_ya_kustaafu" className="block text-sm sm:text-md font-medium">
                                                            Tarehe ya kustaafu:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.tarehe_ya_kustaafu}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="hadhi_ya_ndoa" className="block text-sm sm:text-md font-medium">
                                                            Hadhi ya ndoa:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.hadhi_ya_ndoa}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="contact" className="block text-sm sm:text-md font-medium">
                                                            Namba ya Simu:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.contact}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm sm:text-md font-medium">
                                                            Barua Pepe:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.email}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="location" className="block text-sm sm:text-md font-medium">
                                                            Nyumba anayoishi/Nyumba namba:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.location}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="mtaa" className="block text-sm sm:text-md font-medium">
                                                            Mtaa:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.mtaa}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="kata" className="block text-sm sm:text-md font-medium">
                                                            Kata:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.kata}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="wilaya" className="block text-sm sm:text-md font-medium">
                                                            Wilaya:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.wilaya}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="mkoa" className="block text-sm sm:text-md font-medium">
                                                            Mkoa:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.mkoa}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="mrithi" className="block text-sm sm:text-md font-medium">
                                                            Mrithi:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.mrithi}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="uhusiano" className="block text-sm sm:text-md font-medium">
                                                            Uhusiano:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{request.uhusiano}</p>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="requested_on" className="block text-sm sm:text-md font-medium">
                                                            Tarehe ya maombi:
                                                        </label>
                                                        <p className="mt-1 text-sm sm:text-md">{new Date(request.requested_on).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                {/* Start of transaction details */}
                                                {transactionData.map((transaction, index) => (
                                                    <div key={index} className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black">
                                                        <div>
                                                            <label htmlFor={`charged_amount_${index}`} className="block text-sm sm:text-md font-medium">
                                                                Ada ya kiingilio:
                                                            </label>
                                                            <p id={`charged_amount_${index}`} className="mt-1 text-sm sm:text-md">{transaction.charged_amount}</p>
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`created_at_${index}`} className="block text-sm sm:text-md font-medium">
                                                                Tarehe ya malipo:
                                                            </label>
                                                            <p id={`created_at_${index}`} className="mt-1 text-sm sm:text-md">{new Date(transaction.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`status_${index}`} className="block text-sm sm:text-md font-medium">
                                                                Status:
                                                            </label>
                                                            <p id={`status_${index}`} className="mt-1 text-sm sm:text-md">
                                                                {transaction.status === 'successful' ? 'Paid' : 'Not Paid'};
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* End of transaction details */}
                                            </div>
                                        )}

                                        {selectedTab === 'sehemuB' && (
                                            <form onSubmit={handleClick}>
                                                <div className="grid grid-cols-1 gap-4 mt-4">
                                                    <div className="flex flex-col">
                                                        <label htmlFor="membershipNumber" className="block text-sm sm:text-md font-medium">
                                                            Namba ya Uanachama:
                                                        </label>
                                                        <select
                                                            id="membershipNumber"
                                                            name="membershipNumber"
                                                            value={membershipNumber}
                                                            onChange={(e) => updateFormValue({ updateType: 'membershipNumber', value: e.target.value })}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                                        >
                                                            <option disabled selected value="">
                                                                Chagua Namba ya Uanachama
                                                            </option>
                                                            {availableNumbers.map((num) => (
                                                                <option key={num} value={num}>
                                                                    {num}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button
                                                            type="button"
                                                            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                            onClick={closeModal}
                                                        >
                                                            Funga
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={!membershipNumber}
                                                            className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting && 'cursor-not-allowed'
                                                                }`}
                                                        >
                                                            {isSubmitting ? (
                                                                <svg
                                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"
                                                                    ></path>
                                                                </svg>
                                                            ) : (
                                                                'Sajili'
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
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
};

export default MemberRequestDialog;

