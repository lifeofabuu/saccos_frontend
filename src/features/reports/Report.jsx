/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import { apis } from '../../auth/apis';
import 'antd/dist/reset.css';

const Report = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        if (!selectedDate) {
            message.error('Please select a month and year.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${apis.generateReportUrl}/${user.id}/`, {
                month: selectedDate.month() + 1,
                year: selectedDate.year(),
            }, {
                responseType: 'blob',
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            }
        );
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `Monthly_Report_${selectedDate.format('MM_YYYY')}.pdf`);
            message.success('Report generated successfully.');
        } catch (error) {
            console.error('Error generating report:', error);
            message.error('Failed to generate report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Generate Monthly Report</h2>
            <div className="flex justify-center items-center space-x-4">
                <DatePicker 
                    onChange={(date) => setSelectedDate(date)}
                    picker="month"
                    className="w-48"
                />
                <button 
                    className={`btn btn-primary ${loading ? 'loading' : ''}`} 
                    onClick={generateReport}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Report'}
                </button>
            </div>
        </div>
    );
};

export default Report;
