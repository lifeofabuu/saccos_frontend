/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { EyeIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { apis } from '../../auth/apis';
import moment from 'moment';
import AdminVerifyLoansDialog from '../../components/DialogBox/AdminVerifyLoansDialog';

const TopSideButtons = ({ loan, user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700"
        onClick={() => setShowModal(true)}
      >
        <EyeIcon className="w-5 h-5 mr-1" />
        <span>View</span>
      </div>
      {showModal && <AdminVerifyLoansDialog setOpenModal={setShowModal} loan={loan} user={user} />}
    </div>
  );
};

const VerifyLoans = () => {
  const token = localStorage.getItem('refresh_token');
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [loansResponse, usersResponse] = await Promise.all([
          axios.get(apis.allPendingLoansUrl, {
            headers: {
              'Authorization': `Token ${token}`
            }
          }),
          axios.get(`${apis.getUsers}/all/`, {
            headers: {
              'Authorization': `Token ${token}`
            }
          })
        ]);

        if (loansResponse.data.success && usersResponse.status === 200) {
          setLoans(loansResponse.data.data);
          setUsers(usersResponse.data);
        } else {
          console.log('Error');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchAllData();
  }, [token]);

  const getRoleComponent = (status) => {
    if (status) {
      return <div className="badge badge-primary"></div>;
    } else {
      return <div className="badge badge-secondary"></div>;
    }
  };

  const getUserDetails = (userId) => {
    const user = users.find(user => user.id === userId);
    return user || {};
  };

  return (
    <>
      <TitleCard title="Mikopo inayosubiri Uidhinishaji" topMargin="mt-2">
        <div className='overflow-x-auto w-full'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Jina</th>
                <th>Namba ya simu</th>
                <th>Namba ya Uanachama</th>
                <th>Aina ya Mkopo</th>
                <th>kiasi cha mkopo</th>
                <th>Wadhamini</th>
                <th>tarehe ya maombi</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {loans.map((loan, index) => {
                const user = getUserDetails(loan.user);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.membership_number}</td>
                    <td>{loan.loanType}</td>
                    <td>{loan.loanRequestAmount}</td>
                    <td>{loan.referee}</td>
                    <td>{moment(loan.loanRequestDate).format("DD MMM YYYY")}</td>
                    <td>{getRoleComponent(loan.loanStatus)}</td>
                    <td><TopSideButtons loan={loan} user={user} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  )
}

export default VerifyLoans