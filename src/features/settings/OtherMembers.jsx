/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import moment from 'moment';
import axios from 'axios'
import { baseURL } from '../../auth/baseUrl';
import { apis } from '../../auth/apis';

const OtherMembers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('refresh_token');

    useEffect(() => {
        // Fetch all users
        axios.get(`${apis.getUsers}/all/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    const formatContact = (contact) => {
        if (contact.startsWith('255')) {
            return '0' + contact.slice(3);
        }
        return contact;
    };

    const getRoleComponent = (userType) => {
        const badgeClass = "badge px-2 py-1 rounded overflow-hidden max-w-xl";

        switch (userType) {
            case 1: // ADMIN
                return <div className={`${badgeClass} bg-gray-200 text-gray-800`}>Admin</div>;
            case 2: // USER
                return <div className={`${badgeClass} bg-blue-200 text-blue-800`}>Mwanachama</div>;
            case 3: // PENDING
                return <div className={`${badgeClass} bg-blue-200 text-blue-800`}>Pending</div>;
            case 4: // SACCOS ACCOUNTANT
                return <div className={`${badgeClass} bg-gray-200 text-gray-800`}>SACCOS Accountant</div>;
            case 5: //  Accountant
                return <div className={`${badgeClass} bg-blue-200 text-blue-800`}>Mhasibu</div>;
            case 6: // CHAIRPERSON
                return <div className={`${badgeClass} bg-gray-200 text-gray-800`}>Mwenyekiti</div>
            case 7: // SECRETARY
                return <div className={`${badgeClass} bg-gray-200 text-gray-800`}>Katibu</div>
            default:
                return <div className={`${badgeClass} bg-gray-300 text-gray-800`}>Unknown</div>;
        }
    };

    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <>
            <TitleCard title="WANACHAMA WA  SACCOS LTD" topMargin="mt-2">

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Jina</th>
                                <th>Barua pepe</th>
                                <th>Mawasiliano</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{formatContact(user.contact)}</td>
                                    <td>{getRoleComponent(user.userType)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}

export default OtherMembers