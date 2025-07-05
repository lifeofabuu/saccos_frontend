/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import moment from 'moment'
import { TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { apis } from '../../auth/apis'

const SharesOfMembers = () => {
  const [shares, setShares] = useState([]);
  const [totalShares, setTotalShares] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('refresh_token')

    const fetchAllShares = async () => {
      const response = await axios.get(apis.allSharesUrl, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      if (response.data.success) {
        setShares(response.data.shares);
        setTotalShares(response.data.total_shares);
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    };
    fetchAllShares();
  }, []);

  return (
    <>
      <TitleCard title="Hisa" topMargin="mt-2">

        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Jina</th>
                <th>Namba ya uanachama</th>
                <th>Kiasi jumla cha hisa(TZS)</th>
                <th>Tarhe ya mwisho ya malipo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {shares.map((share, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{share.name}</td>
                  <td>{share.membership_number}</td>
                  <td>{share.total_amount}</td>
                  <td>{moment(share.last_paid).format("DD MMM YY")}</td>
                  <td><div className="badge badge-primary">{share.status}</div></td>
                 
                </tr>
              ))}
              <tr className=''>
                <td colSpan="3" className="text-right font-bold">Jumla kuu:</td>
                <td className="font-bold">{totalShares}</td>
                <td colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  )
}

export default SharesOfMembers