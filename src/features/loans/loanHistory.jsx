/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TrashIcon } from '@heroicons/react/24/outline';
import { apis } from '../../auth/apis';
import axios from 'axios';

const LoanHistory = () => {
    const [loanHistory, setLoanHistory] = useState([]);

    useEffect(() => {
        const fetchLoanHistoryData = async () => {
            try {
                const response = await axios.get(apis.getLoanHistoryUrl, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                    }
                });
                if (response.status === 200) {
                    setLoanHistory(response.data);
                }
            } catch (error) {
                console.error('Error fetching loan history data:', error);
            }
        };
        fetchLoanHistoryData();
    }, []);

    return (
        <div className="card bg-white shadow-md rounded-lg p-6 text-black">
            <h2 className="text-2xl font-bold mb-4">Historia ya Mikopo</h2>
            <div className="h-0.5 bg-gray-200 m-2"></div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Aina ya mkopo</th>
                            <th>Kiasi cha mkopo(TZS)</th>
                            <th>Tarehe ya maombi</th>
                            <th>Tarehe ya mwisho ya malipo</th>
                            <th>Muda wa malipo</th>
                            <th>Kiasi kilichorejeshwa</th>
                            <th>Kiasi Kilichobakia</th>
                            <th>Referee</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanHistory.map((loan, index) => (
                            <tr key={loan.id}>
                                <td>{index + 1}</td>
                                <td>{loan.loanType}</td>
                                <td>{loan.loanRequestAmount}</td>
                                <td>{moment(loan.loanRequestDate).format("DD MMM YY")}</td>
                                <td>{loan.loanPaymentDeadline ? moment(loan.loanPaymentDeadline).format("DD MMM YY") : 'N/A'}</td>
                                <td>{loan.loanRepayDuration} months</td>
                                <td>{loan.amount_already_paid}</td>
                                <td>{loan.amount_remaining}</td>
                                <td>{loan.referee}</td>
                                <td>{loan.loanStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoanHistory;
