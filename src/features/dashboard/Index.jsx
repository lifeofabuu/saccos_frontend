/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import DashboardTopBar from './components/DashboardTopBar';
import { UserGroupIcon, CreditCardIcon, CircleStackIcon, UsersIcon } from '@heroicons/react/24/outline';
import DashboardStats from './components/DashboardStats';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
// import AmountStats from './components/AmountStats';
import PageStats from './components/PageStats';
import { apis } from '../../auth/apis';
import axios from 'axios';

const Index = () => {
    const [statsData, setStatsData] = useState([]);
    const [events, setEvents] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('refresh_token');

    useEffect(() => {
        const fetchData = async () => {
            let url;
            if (user.usertype === 'ADMIN') {
                url = apis.generalDashboardDataUrl;
            } else {
                url = `${apis.userDashboardDataUrl}/${user.id}/`;
            }

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                const data = response.data;
                console.log(response.data);

                const formattedStats = [
                    {
                        title: 'Wallet',
                        value: `TZS ${user.usertype === 'ADMIN' ? data.saccos_wallet_balance : data.user_wallet_balance}`,
                        icon: <UsersIcon className='w-8 h-8' />,
                        description: user.usertype === 'ADMIN' ? 'Sacco Wallet Balance' : 'Wallet Balance',
                    },
                    {
                        title: 'Hisa',
                        value: `TZS ${data.shares}`,
                        icon: <CreditCardIcon className='w-8 h-8' />,
                        description: 'Hisa jumla',
                    },
                    {
                        title: 'Wanachama',
                        value: data.total_users,
                        icon: <UserGroupIcon className='w-8 h-8' />,
                        description: '↗︎ Idadi ya Wanachama',
                    },
                    {
                        title: 'Mikopo',
                        value: data.loans,
                        icon: <CircleStackIcon className='w-8 h-8' />,
                        description: 'Jumla ya mkopo',
                    },
                ];

                setStatsData(formattedStats);
                setEvents(data.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user.usertype, token, user.id]);

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar />

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {statsData.map((d, k) => (
                    <DashboardStats key={k} {...d} colorIndex={k} />
                ))}
            </div>

            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>

            {/** ---------------------- Different stats content 2 ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                {/* <AmountStats /> */}
                <PageStats events={events} />
            </div>
        </>
    );
};

export default Index;
