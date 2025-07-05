/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CalendarView from '../../components/CalendarView/CalendarView';
import axios from 'axios';
import { apis } from '../../auth/apis';
import AddEventModal from '../../components/DialogBox/AddEventModal';
import { message } from 'antd';

const Event = () => {
    const [userType, setUserType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserType(user.userType);
        }
    }, []);

    const handleAddEvent = () => {
        setIsModalOpen(true);
    };

    const handleSaveEvent = async (eventData) => {
        try {
            const response = await axios.post(apis.eventListCreateRetrieveUpdateDeleteUrl, eventData, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.status === 201) {
                message.success('Tukio limeogezwa kikamilifu')
                setIsModalOpen(false);
            } else {
                message.error('Tukio haliwezi kubadilishwa. Tafadhali jaribu tena')
                console.log('Error: ',response.error)
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error saving event:', error);
            message.error('Imeshindikana kuogeza tukio')
            setIsModalOpen(true);
        }
    };

    const handleUpdateEvent = (eventId) => {
        // Implement update event logic
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await axios.delete(`${apis.eventListCreateRetrieveUpdateDeleteUrl}/${eventId}/`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.status === 200) {
                console.log('Success')
                message.success('Umefuta tukio kikamilifu')
            } else {
                message.error('Imeshindikana')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <CalendarView
                addNewEvent={handleAddEvent}
                handleUpdateEvent={handleUpdateEvent}
                handleDeleteEvent={handleDeleteEvent}
                userType={userType}
            />
            {isModalOpen && (
                <AddEventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveEvent}
                />
            )}
        </div>
    );
};

export default Event;
