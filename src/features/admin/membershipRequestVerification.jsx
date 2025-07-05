/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { EyeIcon } from '@heroicons/react/24/outline'
import MemberRequestDialog from '../../components/DialogBox/MemberRequestDialog'
import axios from 'axios'
import { baseURL } from '../../auth/baseUrl'
import { apis } from '../../auth/apis'

const TopSideButtons = ({request}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <div className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => { setShowModal(true); }}>
                <EyeIcon className="w-5 h-5 mr-1" />
                <span>View</span>
            </div>
            {showModal && <MemberRequestDialog setOpenModal={setShowModal} request={request} />}
        </div>
    )
}

const RequestsVerification = () => {
    const [newRequests, setNewRequests] = useState([]);

    useEffect(() => {
        async function fetchMembershipRequest() {
            try {
                // Retrieve the token from localStorage (assuming it's stored there after login)
                const token = localStorage.getItem("refresh_token");

                if (!token) {
                    // Handle case where token is missing
                    console.log('Authentication token not found');
                    throw new Error('Authentication token not found');
                }

                const response = await axios.get(apis.membershipRequestList, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                console.log(response.data)

                // Format the requested_on field to return only the date part
                const formattedRequests = response.data.map(request => ({
                    ...request,
                    requested_on: new Date(request.requested_on).toLocaleDateString(),
                }));

                // Sort the requests by the most recent requested_on date in descending order
                const sortedRequests = formattedRequests.sort((a, b) => new Date(b.requested_on) - new Date(a.requested_on));

                setNewRequests(sortedRequests);
            } catch (error) {
                console.error('Error fetching membership requests:', error);
            }
        }

        // Fetch requests initially
        fetchMembershipRequest();

        // Set up polling to fetch requests every 10 seconds
        const intervalId = setInterval(fetchMembershipRequest, 10000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);

    }, []);

    const getRoleComponent = (status) => {
        if (status) {
            return <div className="badge badge-primary">success</div>;
        } else {
            return <div className="badge badge-secondary">new</div>;
        }
    };

    return (
        <>
            <TitleCard title="Maombi ya Uanachama" topMargin="mt-2">
                <div className='overflow-x-auto w-full'>
                    {newRequests.length > 0 ? (
                        <table className='table w-full'>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Jina</th>
                                    <th>Barua Pepe</th>
                                    <th>Namba ya simu</th>
                                    <th>tarehe ya maombi</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {newRequests.map((request, index) => (
                                    <tr key={request.id}>
                                        <td>{index + 1}</td>
                                        <td>{request.name}</td>
                                        <td>{request.email}</td>
                                        <td>{request.contact}</td>
                                        <td>{request.requested_on}</td>
                                        <td>{getRoleComponent(request.status)}</td>
                                        <td><TopSideButtons request={request} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-4">No new requests</div>
                    )}
                </div>
            </TitleCard>
        </>
    )
}

export default RequestsVerification
