/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import axios from 'axios'
import moment from 'moment';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { apis } from '../../auth/apis';
import { message, Tooltip } from 'antd';
import AssignRoleModal from '../../components/DialogBox/AsignRoleModal';
import StopMembershipDialog from '../../components/DialogBox/StopMembershipDialog';
import ReturnMembershipDialog from '../../components/DialogBox/ReturnMembershipDialog';
import DeleteUserDialog from '../../components/DialogBox/DeleteUserDialog';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isEndMembershipModalVisible, setIsEndMembershipModalVisible] = useState(false);
    const [isReturnMembershipModalVisible, setIsReturnMembershipModalVisible] = useState(false);
    const [isDeleteUserDialogVisible, setIsDeleteUserDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Function to fetch user data
    const fetchUsers = async () => {
        const token = localStorage.getItem('refresh_token')
        try {
            const response = await axios.get(`${apis.getUsers}/all/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` // 
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const searchUsers = async () => {
        try {
            const response = await axios.get(`${apis.searchUserUrl}/?query=${searchQuery}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.data.success) {
                setSearchResults(response.data.users);
                toast.success(response.data.msg, {
                    position: "top-right",
                });
            } else {
                toast.error(response.data.msg, {
                    position: 'top-right'
                })
            }
        } catch (error) {
            console.error('Error searching users:', error);
            toast.error('Error searching users', {
                position: "top-right",
            });
        }
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle search button click
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            searchUsers();
        } else {
            fetchUsers(); // If search query is empty, fetch all users
        }
    };

    // Function to clear search results
    const clearSearchResults = () => {
        setSearchQuery('');
        setSearchResults([]);
        fetchUsers(); // Fetch all users again
    };

    const deleteUser = async (user) => {
        const token = localStorage.getItem('refresh_token');

        try {
            await axios.delete(`${apis.deleteUserUrl}/${user.id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            message.success('Mwanachama ameondolewa kikamilifu');
            // Remove the user from the state after successful deletion
            setUsers(users.filter(u => u.id !== user.id));
            setIsDeleteUserDialogVisible(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Imeshindikana kuondoa mwanachama')
        } finally {
            setLoading(false);
        }
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


    const showModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.userType);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const token = localStorage.getItem('refresh_token');

        try {
            await axios.put(`${apis.updateUserRoleUrl}/${selectedUser.id}/`, {
                userType: selectedRole
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            message.success('Wadhifa wa mwanachama umeboreshwa');
            setUsers(users.map(user => user.id === selectedUser.id ? { ...user, userType: selectedRole } : user));
        } catch (error) {
            console.error('Error updating user role:', error);
            message.error('Imeshindikana kuboresha wadhifa wa mwanachama');
        }

        setIsModalVisible(false);
        setSelectedUser(null);
        setSelectedRole(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
        setSelectedRole(null);
    };

    // Function to show EndMembershipModal
    const showEndMembershipModal = (user) => {
        setSelectedUser(user);
        setIsEndMembershipModalVisible(true);
    };

    const showReturnMembershipModal = (user) => {
        setSelectedUser(user);
        setIsReturnMembershipModalVisible(true);
    }

    const showDeleteUserDialog = (user) => {
        setSelectedUser(user);
        setIsDeleteUserDialogVisible(true);
    };

    const handleDeleteUserDialogCancel = () => {
        setIsDeleteUserDialogVisible(false);
        setSelectedUser(null);
    };

    // sort by most recent creted_at date
    const sortedUsers = users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <>
            <TitleCard title="Dhibiti Wanachama" topMargin="mt-2">

                {/* Search bar */}
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tafuta mwanachama kwa kutumia namba ya usajili..."
                        className="border border-gray-300 rounded-l px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                        <ToastContainer transition={Bounce} />
                    </button>
                    {searchQuery !== '' && (
                        <button
                            onClick={clearSearchResults}
                            className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Team Member list in table format */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Jina</th>
                                <th>Barua pepe</th>
                                <th>Mawasiliano</th>
                                <th>Namba ya uanachama</th>
                                <th>Tarehe ya kujiunga</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResults.length > 0 ? searchResults : sortedUsers).map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                    <td>{user.membership_number}</td>
                                    <td>{moment(user.created_at).format('YYYY-MM-DD')}</td>
                                    <td>{getRoleComponent(user.userType)}</td>
                                    <td>
                                        <div className="flex space-x-2">
                                            {/* Edit icon with Tooltip */}
                                            <Tooltip
                                                title={(
                                                    <div style={{ cursor: 'pointer', padding: '5px', backgroundColor: 'white', color: 'black' }}>
                                                        <div
                                                            onClick={() => showModal(user)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                padding: '5px',
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                marginBottom: '5px'
                                                            }}
                                                            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                                            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                                                        >
                                                            Weka Wadhifa
                                                        </div>
                                                        <div
                                                            onClick={() => showEndMembershipModal(user)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                padding: '5px',
                                                                backgroundColor: 'white',
                                                                color: 'black'
                                                            }}
                                                            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                                            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                                                        >
                                                            Sitisha Uanachama
                                                        </div>
                                                        <div
                                                            onClick={() => showReturnMembershipModal(user)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                padding: '5px',
                                                                backgroundColor: 'white',
                                                                color: 'black'
                                                            }}
                                                            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                                            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                                                        >
                                                            Rudisha Uanachama
                                                        </div>
                                                    </div>
                                                )}
                                                overlayStyle={{ backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
                                            >
                                                <button>
                                                    <PencilIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer" aria-hidden="true" />
                                                </button>
                                            </Tooltip>

                                            {/* Delete icon */}
                                            <button onClick={() => showDeleteUserDialog(user)}>
                                                <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard >

            {/* AssignRoleModal */}
            <AssignRoleModal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                user={selectedUser}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
            />

            {/* StopMembershipDialog */}
            <StopMembershipDialog
                visible={isEndMembershipModalVisible}
                onOk={() => setIsEndMembershipModalVisible(false)} // Handle OK action here if needed
                onCancel={() => setIsEndMembershipModalVisible(false)} // Handle Cancel action here if needed
                user={selectedUser}
            />

            {/* ReturnMembershipDialog */}
            <ReturnMembershipDialog
                visible={isReturnMembershipModalVisible}
                onOk={() => setIsReturnMembershipModalVisible(false)} // Handle OK action here if needed
                onCancel={() => setIsReturnMembershipModalVisible(false)} // Handle Cancel action here if needed
                user={selectedUser}
            />

            {/* DeleteUserDialog */}
            <DeleteUserDialog
                visible={isDeleteUserDialogVisible}
                onOk={() => deleteUser(selectedUser)} // Ensure the correct user is passed here
                onCancel={handleDeleteUserDialogCancel}
                user={selectedUser}
                loading={loading}
            />
        </>
    )
}

export default UserManagement