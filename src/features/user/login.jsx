/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import InputText from '../../components/Input/InputText';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/Typography/ErrorText';
import axios from 'axios';
import { useUser } from '../../providers/UserContext';
import { apis } from '../../auth/apis';
import { ClipLoader } from 'react-spinners';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
    const INITIAL_LOGIN_OBJ = {
        password: "",
        email: ""
    }

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (loginObj.email.trim() === "") return setErrorMessage("Email is required!");
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required!");

        try {
            setLoading(true);
            const response = await axios.post(apis.login, loginObj);
            if (response.data.success) {
                const { token, user } = response.data;
                // Store the token in local storage
                localStorage.setItem("refresh_token", token);
                localStorage.setItem("user", JSON.stringify(user));
                setUser({ id: user.id, ...user });
                toast.success(response.data.msg, {
                    position: "top-right",
                });

                // Delay the navigation to allow the toast to be visible
                setTimeout(() => {
                    navigate('/app/dashboard');
                }, 1000); // 1 second delay
            } else {
                toast.error(response.data.msg, {
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error('Invalid Credentials', {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-blue-100 flex items-center relative">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <ClipLoader color="#ffffff" loading={loading} size={50} />
                </div>
            )}
            <div className="card mx-auto w-full max-w-md shadow-xl">
                <div className="grid bg-white elevation-5 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Wanachama kuingia</h2>
                        <form onSubmit={submitForm} method='POST'>
                            <div className="mb-4">
                                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Barua pepe / Email" updateFormValue={updateFormValue} />
                                <div className="relative mt-4">
                                    <InputText 
                                        defaultValue={loginObj.password} 
                                        type={showPassword ? "text" : "password"} 
                                        updateType="password" 
                                        containerStyle="mt-4" 
                                        labelTitle="Password" 
                                        updateFormValue={updateFormValue} 
                                    />
                                    <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-sm leading-5 cursor-pointer">
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                                    </span>
                                </div>
                            </div>

                            <div className='text-right text-primary'>
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Sahau nywila?</span>
                                </Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className="btn mt-2 w-full btn-primary">Ingia</button>
                            <ToastContainer transition={Bounce} />

                            <div className='text-center mt-4'>
                                Wewe si mwanachama bado?
                                <Link to="/membershipRequest">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Jisajili hapa</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
