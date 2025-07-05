/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { apis } from '../../auth/apis';

const THEME_BG = {
    MEETING: 'bg-blue-200 text-blue-800',
    EVENT: 'bg-green-200 text-green-800',
    MORE: 'bg-gray-200 text-gray-800'
};

const CalendarView = ({ addNewEvent, openDayDetail, handleUpdateEvent, handleDeleteEvent, userType }) => {
    const today = moment().startOf('day');
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month'));
    const [events, setEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(apis.eventListCreateRetrieveUpdateDeleteUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [firstDayOfMonth]);

    const allDaysInMonth = () => {
        let start = moment(firstDayOfMonth).startOf('week');
        let end = moment(moment(firstDayOfMonth).endOf('month')).endOf('week');
        var days = [];
        var day = start;
        while (day <= end) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days;
    };

    const getEventsForCurrentDate = (date) => {
        let filteredEvents = events.filter((e) => moment(date).isSame(moment(e.event_date), 'day'));
        if (filteredEvents.length > 2) {
            let originalLength = filteredEvents.length;
            filteredEvents = filteredEvents.slice(0, 2);
            filteredEvents.push({ title: `${originalLength - 2} more`, theme: "MORE" });
        }
        return filteredEvents;
    };

    const openAllEventsDetail = (date, theme) => {
        if (theme !== "MORE") return;
        let filteredEvents = events.filter((e) => moment(date).isSame(moment(e.event_date), 'day')).map((e) => ({ title: e.title, description: e.description, theme: e.theme }));
        openDayDetail({ filteredEvents, title: moment(date).format("D MMM YYYY") });
    };

    const isToday = (date) => moment(date).isSame(moment(), 'day');

    const isDifferentMonth = (date) => moment(date).month() !== moment(firstDayOfMonth).month();

    const getPrevMonth = () => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfPrevMonth);
        setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
    };

    const getCurrentMonth = () => {
        const firstDayOfCurrMonth = moment().startOf('month');
        setFirstDayOfMonth(firstDayOfCurrMonth);
        setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
    };

    const getNextMonth = () => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfNextMonth);
        setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="w-full bg-base-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="flex justify-normal gap-2 sm:gap-4">
                    <p className="font-semibold text-xl w-48">
                        {moment(firstDayOfMonth).format("MMMM yyyy").toString()}
                    </p>
                    <button className="btn btn-square btn-sm btn-ghost" onClick={getPrevMonth}>
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button className="btn btn-sm btn-ghost normal-case" onClick={getCurrentMonth}>
                        Mwezi Huu
                    </button>
                    <button className="btn btn-square btn-sm btn-ghost" onClick={getNextMonth}>
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
                {(userType === 6 || userType === 7) && (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={addNewEvent}
                    >
                        Chapisha Tangazo
                    </button>
                )}
            </div>
            <div className="my-4 divider" />
            <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
                {weekdays.map((day, key) => (
                    <div className="text-xs capitalize" key={key}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 mt-1 place-items-center">
                {allDaysInMonth().map((day, idx) => (
                    <div key={idx} className={colStartClasses[moment(day).day().toString()] + " border border-solid w-full h-28 relative"}>
                        <p
                            className={`inline-block items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${isToday(day) && " bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white"} ${isDifferentMonth(day) && " text-slate-400 dark:text-slate-600"}`}
                            onClick={() => addNewEvent(day)}
                        >
                            {moment(day).format("D")}
                        </p>
                        {getEventsForCurrentDate(day).map((e, k) => (
                            <div key={k} className="relative mb-2">
                                <p
                                    onClick={() => openAllEventsDetail(day, e.theme)}
                                    className={`text-xs px-2 mt-1 truncate ${THEME_BG[e.theme] || ""}`}
                                >
                                    {e.title}
                                </p>
                                <p className={`text-xs px-2 truncate ${THEME_BG[e.theme] || ""}`}>
                                    {e.description}
                                </p>
                                {/* {(userType === 6 || userType === 7) && e.theme !== "MORE" && (
                                    <div className="absolute bottom-0 right-0 flex space-x-1 bg-white rounded p-1 shadow-lg">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => handleUpdateEvent(e.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDeleteEvent(e.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )} */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
