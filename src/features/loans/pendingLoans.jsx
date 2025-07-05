/* eslint-disable no-unused-vars */
import { TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { apis } from '../../auth/apis';

const PendingLoans = () => {
    const token = localStorage.getItem('refresh_token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [pendingLoans, setPendingLoans] = useState([]);

    useEffect(() => {
        const fetchPendingLoans = async () => {
            try {
                const response = await axios.get(apis.userPendingLoansUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                if(response.data.success) {
                    setPendingLoans(response.data.data);
                } else {
                    console.log('An error Occured');
                }
            } catch (error) {
                console.log("Error Occured: ", error)
            } 
        };
        fetchPendingLoans();
    }, [token, user]);

    const getDummyStatus = (status) => {
        // if (index % 5 === 0) return <div className="badge">Not Interested</div>
        if (status  === "PENDING") return <div className="badge badge-primary"></div>
        // else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        // else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        // else return <div className="badge badge-ghost">Open</div>
    }

    return (
        <>
            {pendingLoans.length === 0 && (
                <p>Hakuna mikopo inayosubiri uidhinishaji.</p>
            )}

            {pendingLoans.length > 0 && (
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
                                <th>Lipa Kupitia</th>
                                <th>Wadhamini</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {pendingLoans.map((pendingLoan, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{pendingLoan.loanRequestAmount}</td>
                                    <td>{pendingLoan.loanType}</td>
                                    <td>{moment(pendingLoan.loanRequestDate).format("DD MMM YYYY")}</td>
                                    <td>{pendingLoan.loanRepayDuration}</td>
                                    <td>{pendingLoan.loanRepayPerMonth}</td>
                                    <td>{moment(pendingLoan.loanPaymentDeadline).format("DD MMM YYYY")}</td>
                                    <td>{pendingLoan.loanRepaymentPlan}</td>
                                    <td>{pendingLoan.referee}</td>
                                    <td>{getDummyStatus(pendingLoan.loanStatus)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default PendingLoans