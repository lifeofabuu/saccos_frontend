/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard';
import axios from 'axios';
import { apis } from '../../auth/apis';
import { TrashIcon } from '@heroicons/react/24/outline';

const AllSavings = () => {
    const [savings, setSavings] = useState([]);
    const [totalSavings, setTotalSavings] = useState(0);
  
    useEffect(() => {
      const token = localStorage.getItem('refresh_token')
  
      const fetchAllShares = async () => {
        const response = await axios.get(apis.allSavingsUrl, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
  
        if (response.data.success) {
          setSavings(response.data.savings);
          setTotalSavings(response.data.total_savings);
          console.log(response.data);
        } else {
          console.log(response.data.message);
        }
      };
      fetchAllShares();
    }, []);
  
    return (
      <>
        <TitleCard title="Akiba na Amana" topMargin="mt-2">
  
          {/* Leads List in table format loaded from slice after api call */}
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Jina</th>
                  <th>Namba ya uanachama</th>
                  <th>Kiasi jumla cha Akiba(TZS)</th>
                  <th>Tarhe ya mwisho ya malipo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {savings.map((saving, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{saving.name}</td>
                    <td>{saving.membership_number}</td>
                    <td>{saving.total_amount}</td>
                    <td>{moment(saving.last_paid).format("DD MMM YY")}</td>
                    <td><div className="badge badge-primary">{saving.status}</div></td>
                  </tr>
                ))}
                <tr className=''>
                  <td colSpan="3" className="text-right font-bold">Jumla kuu:</td>
                  <td className="font-bold">{totalSavings}</td>
                  <td colSpan="3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </TitleCard>
      </>
    )
}

export default AllSavings