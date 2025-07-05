/* eslint-disable no-unused-vars */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart, registerables,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import TitleCard from '../../../components/Cards/TitleCard';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Share',
                data: labels.map(() => { return Math.random() * 1000 + 500 }),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Loan',
                data: labels.map(() => { return Math.random() * 1000 + 500 }),
                backgroundColor: 'rgba(53, 162, 235, 1)',
            },
        ],
    };

    return (
        <TitleCard title={"Share - Loan trend"} topMargin="mt-2">
            <Bar options={options} data={data} />
        </TitleCard>
    )
}

export default BarChart