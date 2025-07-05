/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import InputText from '../Input/InputText';
import InputDropdown from '../Input/InputDropdown';
import TextareaInput from '../Input/TextareaInput';
import { loanAmounts, loanConditions, loanManipulationConstants, loanType } from '../../constants/Constant';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';
import { message } from 'antd';
import axios from 'axios';
import { apis } from '../../auth/apis';
import DisplayBox from '../Input/DisplayBox';

const LoanApplicationDialog = ({ setOpenModal }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('refresh_token');

    let [isOpen, setIsOpen] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedLoanType, setSelectedLoanType] = useState(null);
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false); // State variable for the inner payment dialog
    const [eligibilityError, setEligibilityError] = useState('');
    const [loading, setLoading] = useState(false);
    const [amountError, setAmountError] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedReferee, setSelectedReferee] = useState(null);
    const [selectedRepayType, setSelectedRepayType] = useState(null);
    const [loanAmount, setLoanAmount] = useState('');
    const [loanDuration, setLoanDuration] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanDescription, setLoanDescription] = useState("");

    // fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apis.getUsers}/all/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                const fetchedUsers = response.data;
                const filteredUsers = fetchedUsers.filter(userr => userr.name !== user.name);
                setUsers(filteredUsers);
            } catch (error) {
                console.log('Error: ', error);
            }
        };
        fetchUsers();
    }, [token, user.name]);

    function closeModal() {
        setIsOpen(false);
    }

    const updateFormValue = ({ updateType, value }) => {
        switch (updateType) {
            case 'loanType':
                setSelectedLoanType(value);
                break;
            case 'loanAmount':
                setLoanAmount(value);
                break;
            case 'loanDuration':
                setLoanDuration(value);
                break;
            case 'loanDescription':
                setLoanDescription(value);
                break;
            case 'referee':
                setSelectedReferee(value);
                break;
            case 'loanRepayType':
                setSelectedRepayType(value);
                break;
            default:
                break;
        }
    };

    //Function for checking loan eligibility
    const checkEligibility = async () => {
        setLoading(true);

        // Skip eligibility check if loan type is "kujikimu"
        if (selectedLoanType === 'Kujikimu') {
            toast.success(`Hongera, Umekidhi vigezo vya kupata mkopo wa ${selectedLoanType}`, {
                position: "top-right",
            });
            setCurrentStep(2);
            setLoading(false);
            return;
        }

        toast.info('Tafadhali Subiri....', {
            position: "top-right",
        });

        try {
            const response = await axios.post(apis.checkLoanEligibilityUrl, user, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(`Hongera, Umekidhi vigezo vya kupata mkopo wa ${selectedLoanType}`, {
                    position: "top-right",
                });
                console.log('Success');
                setCurrentStep(2);
                setLoading(false);
            } else {
                toast.error(`Hujakidhi vigezo vya kupata mkopo wa ${selectedLoanType}`, {
                    position: "top-right",
                });
                console.log('Failed: ', response.error);
                setCurrentStep(1);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error: ', error);
            toast.error('An Error Occured', {
                position: "top-right",
            });
            setLoading(false);
        }
    };

    // Function to format amount with commas for display
    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Validate the loan amount against the placeholder range
    const validateAmount = (amount) => {
        if (!selectedLoanType || !loanAmounts[selectedLoanType]) {
            return true; // If no loan type selected or loan type not found in loanAmounts, assume validation passed
        }

        const { min, max } = loanAmounts[selectedLoanType];
        const enteredAmount = parseFloat(amount.replace(/,/g, ''));

        if (isNaN(enteredAmount) || enteredAmount < min || enteredAmount > max) {
            setAmountError('Amount entered is outside the loan amount range');
            return false;
        } else {
            setAmountError('');
            return true;
        }
    };

    // Handling referee selection
    const handleRefereeSelection = (event) => {
        const value = event.target.value;
        updateFormValue({ updateType: 'referee', value });
        setSelectedReferee(value);
    };

    //Handling repay type selection
    const handleLoanRepayTypeSelection = (event) => {
        const value = event.target.value;
        updateFormValue({ updateType: 'repayType', value });
        setSelectedRepayType(value);
    };

    // function to calculate loan to be paid each month
    const calculateMonthlyLoanPayment = () => {
        if (!selectedLoanType) {
            console.log('Please select a loan type.');
            return;
        }

        const { gharama, riba, adhabu } = loanManipulationConstants[selectedLoanType];
        const principal = parseFloat(loanAmount.replace(/,/g, ''));
        const months = parseInt(loanDuration);

        if (!isNaN(principal) && !isNaN(months) && months > 0) {
            const initialLoanFee = principal * gharama;
            const totalLoanAmount = principal + initialLoanFee;
            const monthlyInterestRate = riba;
            const denominator = Math.pow(1 + monthlyInterestRate, months) - 1;
            const monthlyPayment = (totalLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / denominator;
            setMonthlyPayment(monthlyPayment.toFixed(2)); // Round to two decimal places
            console.log(monthlyPayment);
        } else {
            setMonthlyPayment(null);
            console.log('Invalid loan amount or duration.');
        }
    };

    // function to submit loan applicastion
    const submitForm = async () => {
        setLoading(true);

        const data = {
            user: user,
            loanType: selectedLoanType,
            loanRequestAmount: loanAmount,
            loanDescription: loanDescription,
            referee: selectedReferee,
            loanRepayDuration: loanDuration,
            loanRepayPerMonth: monthlyPayment,
            loanRepayType: selectedRepayType,
        };

        console.log(data)

        try {
            const response = await axios.post(apis.loanApplicationUrl, data, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (response.data.success) {
                console.log('Success: ', response.data);
                toast.success('Maombi ya mkopo yamewasilishwa kikamilifu', {
                    position: "top-right",
                });
                closeModal();
            } else if (response.data.message === 'Max-limit') {
                toast.error('Umefikia kiasi cha kuomba mkopo cha juu zaidi', {
                    position: "top-right",
                });
                closeModal();
            } else {
                console.log('Error Occured: ', response.error);
                toast.error('An error occured', {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log('Error occured: ', error);
            toast.error('Error occured', {
                position: 'top-right'
            })
        } finally {
            setLoading(false);
        }
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
                                    <Dialog.Panel className="w-full max-w-3xl p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl absolute top-5 elevation-5 right-20">
                                        <Dialog.Title>
                                            <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Fomu ya Maombi ya Mkopo</h1>
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

                                        {currentStep === 1 && (
                                            <div>
                                                <InputDropdown
                                                    labelTitle="Aina Ya Mkopo"
                                                    options={loanType}
                                                    defaultValue=""
                                                    updateFormValue={updateFormValue}
                                                    updateType="loanType"
                                                />
                                                {selectedLoanType && (
                                                    <ol className="list-decimal mt-4 ml-6">
                                                        {loanConditions[selectedLoanType].map((condition, index) => (
                                                            <li key={index}>{condition}</li>
                                                        ))}
                                                    </ol>
                                                )}

                                                {eligibilityError && (
                                                    <div className="text-red-500 mt-4">
                                                        {eligibilityError}
                                                    </div>
                                                )}

                                                {loading ? (
                                                    <div className="mt-8 flex justify-center">
                                                        <div className="loader">Inahakiki...</div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-8 flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={checkEligibility}
                                                            className="btn px-6 btn-sm normal-case btn-primary"
                                                        >
                                                            Endelea
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <form>
                                                {/* Input fields for payment details */}
                                                <div className="mt-4 grid grid-cols-2 gap-4">
                                                    <InputText
                                                        labelTitle="Jina la Mkopaji"
                                                        defaultValue={user.name}
                                                        placeholder={user.name}
                                                        disabled
                                                    />

                                                    <InputText
                                                        labelTitle="Namba ya simu"
                                                        defaultValue={user.phone_number}
                                                        placeholder={user.phone_number}
                                                        disabled
                                                    />

                                                    <InputText
                                                        labelTitle="Namba ya uanachama"
                                                        defaultValue={user.membership_number}
                                                        placeholder={user.membership_number}
                                                        disabled
                                                    />

                                                    <InputText
                                                        labelTitle="Aina ya Mkopo"
                                                        defaultValue={selectedLoanType}
                                                        updateType="loanType"
                                                        updateFormValue={updateFormValue}
                                                        disabled
                                                    />

                                                    <InputText
                                                        labelTitle={`Kiasi Cha Mkopo (Tzs) - ${selectedLoanType ? formatAmount(loanAmounts[selectedLoanType].min) + ' - ' + formatAmount(loanAmounts[selectedLoanType].max) : ''}`}
                                                        defaultValue={loanAmount}
                                                        updateType='loanAmount'
                                                        updateFormValue={updateFormValue}
                                                        placeholder={`${selectedLoanType ? formatAmount(loanAmounts[selectedLoanType].min) + ' - ' + formatAmount(loanAmounts[selectedLoanType].max) : ''}`}
                                                        validate={validateAmount}
                                                    />

                                                    <InputText
                                                        labelTitle="Mkopo utarejeshwa kwa muda wa miezi"
                                                        defaultValue={loanDuration}
                                                        updateType='loanDuration'
                                                        placeholder="jumla ya miezi ya kulipa hadi kumaliza mkopo"
                                                        updateFormValue={updateFormValue}
                                                    />

                                                    <div className="form-control w-full">
                                                        <label htmlFor="loanRepayType" className="label">
                                                            <span className="label-text text-black">Aina ya urejeshaji mkopo</span>
                                                        </label>
                                                        <select
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                            onChange={handleLoanRepayTypeSelection}
                                                            value={selectedRepayType}
                                                        >
                                                            <option value="">__chagua__</option>
                                                            <option value='makato ya mshahara'>Makato ya mshahara</option>
                                                            <option value='malipo binafsi'>Malipo ya binafsi</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-control w-full">
                                                        <label htmlFor="referee" className="label">
                                                            <span className="label-text text-black">Chagua Wadhamini</span>
                                                        </label>
                                                        <select
                                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                            onChange={handleRefereeSelection}
                                                            value={selectedReferee}
                                                        >
                                                            <option value="">__chagua-mdhamini__</option>
                                                            {users.map(user => (
                                                                <option key={user.id} value={user.name}>{user.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>


                                                    <TextareaInput
                                                        labelTitle="Maelezo ya Mkopo"
                                                        defaultValue={loanDescription}
                                                        updateType='loanDescription'
                                                        placeholder="sababu za kuchukua mkopo huu"
                                                        updateFormValue={updateFormValue}
                                                    />

                                                    <div className='pl-8 pt-12'>
                                                        <button
                                                            type="button"
                                                            onClick={calculateMonthlyLoanPayment}
                                                            className="btn px-6 btn-md normal-case btn-primary"
                                                        >
                                                            Calculate
                                                        </button>
                                                    </div>

                                                    <DisplayBox
                                                        labelTitle="Malipo kwa mwezi"
                                                        value={monthlyPayment !== null ? `Malipo kwa kila mwezi: Tzs ${monthlyPayment}` : 'no calculation'}
                                                    />
                                                </div>
                                                {/* Button to submit the payment */}
                                                <div className="mt-8 flex justify-between">
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={submitForm}
                                                            className="btn px-6 btn-md normal-case btn-primary"
                                                        >
                                                            Omba mkopo
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="btn px-6 btn-md normal-case bg-red-500 hover:bg-red-700"
                                                    >
                                                        Sitisha
                                                    </button>
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

export default LoanApplicationDialog;
