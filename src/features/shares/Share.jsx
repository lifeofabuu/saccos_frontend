/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { TrashIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import Modal from '../../components/DialogBox/Modal'
import axios from 'axios'
import { apis } from '../../auth/apis'

const TopSideButtons = ({ totalAmount }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="inline-block float-right">
            {totalAmount >= 1000000 ? (
                <div className="text-red-500">Umefika kikomo cha malipo ya Hisa</div>
            ) : (
                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => { setShowModal(true); }}>Nunua Hisa</button>
            )}
            {showModal && <Modal setOpenModal={setShowModal} />}
        </div>
    )
}

const Share = () => {
    const [shares, setShares] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchUserShares = async () => {
            const token = localStorage.getItem('refresh_token')
            try {
                const response = await axios.get(apis.sharesUrl, {
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });
                if(response.data.success) {
                    const { shares: sharesData, total_amount: total } = response.data;
                    setShares(sharesData);
                    setTotalAmount(total);
                } else {
                    console.log("Failed to fetch shares")
                }
            } catch (error) {
                console.error("Error fetching shares data:", error);
            }
        };
        fetchUserShares();

        // Set up interval to fetch shares periodically
        const interval = setInterval(() => {
            fetchUserShares();
        }, 10000); // Fetch every 10 seconds 

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>

            <TitleCard title="Hisa zangu" topMargin="mt-2" TopSideButtons={<TopSideButtons totalAmount={totalAmount} />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Kiasi(TZS)</th>
                                <th>Tarehe ya malipo</th>
                                <th>Hali</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shares.map((share, index) => (
                                <tr key={share.id}>
                                    <td>{index + 1}</td>
                                    <td>{share.amount}</td>
                                    <td>{moment(share.date).format("DD MMM YY")}</td>
                                    <td>
                                        <div className={`badge ${share.transaction.status === 'successful' ? 'badge-accent' : share.transaction.status === 'failed' ? 'badge-secondary' : 'badge-primary'}`}>
                                            {share.transaction.status}
                                        </div>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-medium">Jumla ya Hisa: {totalAmount} TZS</h2>
                </div>
            </TitleCard>
        </>
    )
}

export default Share