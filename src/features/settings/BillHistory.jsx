/* eslint-disable no-unused-vars */
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import axios from 'axios';
import { apis } from '../../auth/apis';



const BillHistory = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('refresh_token');

    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchTransactionsHistory = async () => {
            try {
                const response = await axios.get(apis.transactionsHistoryUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                if (response.data.success) {
                    console.log('Success: ', response.data.transactions);
                    const transactions = response.data.transactions;
                    const formattedTransactions = transactions.map(transaction => ({
                        invoiceNo: `#${transaction.tx_ref}`,
                        amount: transaction.amount,
                        description: transaction.description,
                        status: transaction.status,
                        generatedOn: moment(transaction.created_at).format("DD MMM YYYY"),
                    }));
                    setBills(formattedTransactions);
                } else {
                    console.log("Error: ", response.data.message);
                }
            } catch (error) {
                console.error('There was an error fetching the transactions!', error);
            }
        };
        fetchTransactionsHistory();
    }, [token]);

    const getPaymentStatus = (status) => {
        if (status === 'successful') return <div className="badge badge-success">imefanikiwa</div>
        else return <div className="badge badge-ghost">{status}</div>
    }

    return (
        <>
            <TitleCard title="Historia ya Miamala" topMargin="mt-2">
                {/* Invoice list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Invoice No</th>
                                <th>Tarehe ya muamala</th>
                                <th>Maelezo</th>
                                <th>Kiasi</th>
                                <th>Hali</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bills.map((bill, index) => (
                                    <tr key={index}>
                                        <td>{bill.invoiceNo}</td>
                                        <td>{bill.generatedOn}</td>
                                        <td>{bill.description}</td>
                                        <td>{bill.amount}</td>
                                        <td>{getPaymentStatus(bill.status)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}

export default BillHistory