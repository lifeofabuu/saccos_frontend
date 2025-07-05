/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SaavingsDialog from '../../components/DialogBox/SaavingsDialog';
import moment from 'moment';
import { TrashIcon } from '@heroicons/react/24/outline';
import TitleCard from '../../components/Cards/TitleCard';
import axios from 'axios';
import { apis } from '../../auth/apis';

const TopSideButtons = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="inline-block float-right">
      <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => { setShowModal(true); }}>Weka akiba</button>
      {showModal && <SaavingsDialog setOpenModal={setShowModal} />}
    </div>
  )
}

const UserSavings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('refresh_token');

  const [savings, setSavings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchUserSavings = async () => {
      try {
        const response = await axios.get(apis.savingsUrl, {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });

        if (response.data.success) {
          const { savings: savingsData, total_amount: total } = response.data;
          console.log("Success");
          setSavings(savingsData);
          setTotalAmount(total);
        } else {
          console.log("Failed to fetch shares")
        }
      } catch (error) {
        console.error("Error fetching shares data:", error);
      }
    };

    // Set up interval to fetch shares periodically
    const interval = setInterval(() => {
      fetchUserSavings();
    }, 10000); // Fetch every 10 seconds 

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [token]);

  return (
    <>
      <TitleCard title="Akiba na Amana" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

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
              {savings.map((saving, index) => (
                <tr key={saving.id}>
                  <td>{index + 1}</td>
                  <td>{saving.amount}</td>
                  <td>{moment(saving.date).format("DD MMM YY")}</td>
                  <td>
                    <div className={`badge ${saving.transaction.status === 'successful' ? 'badge-accent' : saving.transaction.status === 'failed' ? 'badge-secondary' : 'badge-primary'}`}>
                      {saving.transaction.status}
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium">Jumla ya Akiba: {totalAmount} TZS</h2>
        </div>
      </TitleCard>
    </>
  )
}

export default UserSavings