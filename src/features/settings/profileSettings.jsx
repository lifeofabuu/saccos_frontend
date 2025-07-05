/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import InputText from '../../components/Input/InputText';
import InputFile from '../../components/Input/InputFile';
import ErrorText from '../../components/Typography/ErrorText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apis } from '../../auth/apis';
import { message } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader spinner
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const ProfileSetting = ({ userId }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem('refresh_token');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        email: user.email || '',
        phone_number: user.phone_number || '',
        profile: user.profile || null,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const updateFormValue = ({ updateType, value }) => {
        setProfileData({ ...profileData, [updateType]: value });
    };

    const updatePasswordValue = ({ updateType, value }) => {
        setPasswordData({ ...passwordData, [updateType]: value });
    };

    const handleFileChange = (updateType, file) => {
        setProfileData({ ...profileData, [updateType]: file });
    };

    // Function to reset form inputs
    const resetForm = () => {
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });
    };

    const resetProfileForm = () => {
        setProfileData({
            email: user.email,
            phone_number: user.phone_number,
            profile: user.profile,
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const formData = new FormData();
        formData.append('email', profileData.email);
        formData.append('phone_number', profileData.phone_number);
        if (profileData.profile) {
            formData.append('profile', profileData.profile);
        }

        try {
            const response = await axios.put(apis.updateProfile, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`
                },
            });
            if (response.data.success) {
                const updatedUser = { ...user, email: profileData.email, phone_number: profileData.phone_number, profile: profileData.profile };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                toast.success('Wasifu umesasishwa kikamilifu',{
                    position: 'top-right',
                });
                resetProfileForm();
                navigate('/login');
            } else {
                toast.error('Imeshindikana kusasisha wasifu', {
                    position: 'top-right',
                });
                resetProfileForm();
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occured', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.put(`${apis.changePassword}/${user.id}/`, passwordData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            if (response.status === 200) {
                toast.success('Success', {
                    position: 'top-right',
                });
                resetForm();
                navigate('/login');
            } else {
                toast.error('Failed!! Please try again', {
                    position: 'top-right',
                });
                resetForm();
            }
        } catch (error) {
            toast.error('An error occurred', {
                position: 'top-right',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <ClipLoader color="#ffffff" size={50} />
                </div>
            )}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <form onSubmit={handleProfileSubmit}>
                    <TitleCard title="Sasisha Wasifu" topMargin="mt-2">
                        <div className="grid grid-cols-1 gap-6">
                            <InputText labelTitle="Baua pepe" placeholder='****@***.com' updateType="email" defaultValue={profileData.email} updateFormValue={updateFormValue} required />
                            <InputText labelTitle="Namba ya simu" placeholder='0*********' updateType="phone_number" defaultValue={profileData.phone_number} updateFormValue={updateFormValue} required />
                        </div>
                        <div className="divider"></div>
                        <div className="grid grid-cols-1 gap-6">
                            <InputFile labelTitle="Picha" updateType="profile" defaultValue={profileData.profile} updateFormValue={handleFileChange} />
                        </div>
                        <div className="mt-4 relative">
                            <ErrorText styleClass={`mt-8 ${errorMessage === "Success" ? "text-green-500" : "text-red-500"}`}>{errorMessage}</ErrorText>
                            <button type='submit' className="btn mt-2 w-full btn-primary text-md">Sasisha Wasifu</button>
                            <ToastContainer transition={Bounce} />
                        </div>
                    </TitleCard>
                </form>
                <form onSubmit={handlePasswordSubmit}>
                    <TitleCard title="Badili Nywila" topMargin="mt-2">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="relative mt-4">
                                <InputText type={showPassword ? "text" : "password"} labelTitle="Nywila ya zamani" placeholder='andika nywila yako ya zamani' updateType="currentPassword" defaultValue={passwordData.currentPassword} updateFormValue={updatePasswordValue} required />
                                <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-sm leading-5 cursor-pointer">
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                                    </span>
                            </div>
                            
                            <div className="relative mt-4">
                                <InputText type={showPassword ? "text" : "password"} labelTitle="Nywila Mpya" placeholder='andika nywila mpya' updateType="newPassword" defaultValue={passwordData.newPassword} updateFormValue={updatePasswordValue} required />
                                <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-sm leading-5 cursor-pointer">
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                                    </span>
                            </div>
                            
                            <div className="relative mt-4">
                                <InputText type={showPassword ? "text" : "password"} labelTitle="Thibitisha nywila mpya" placeholder='thibitisha kwa kurudia nywila mpya' updateType="confirmNewPassword" defaultValue={passwordData.confirmNewPassword} updateFormValue={updatePasswordValue} required />
                                <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-sm leading-5 cursor-pointer">
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                                    </span>
                            </div>
                            
                        </div>
                        <div className="mt-4 relative">
                            <ErrorText styleClass={`mt-8 ${errorMessage === "Success" ? "text-green-500" : "text-red-500"}`}>{errorMessage}</ErrorText>
                            <button type='submit' className="btn mt-2 w-full btn-primary text-md">Badili nywila</button>
                            <ToastContainer transition={Bounce} />
                        </div>
                    </TitleCard>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetting;
