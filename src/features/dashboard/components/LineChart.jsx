/* eslint-disable no-unused-vars */
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart, registerables,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import TitleCard from '../../../components/Cards/TitleCard';

Chart.register(...registerables,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const LineChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'MP',
                data: labels.map(() => { return Math.random() * 100 + 500 }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <TitleCard title={"Montly Payments (in TZS)"}>
            <Line data={data} options={options} />
        </TitleCard>
    )
}

export default LineChart