/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import React from 'react'

const AmountStats = ({ }) => {
    return (
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Total Loan Due</div>
                <div className="stat-value">Tzs 256,000</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View History</button>
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Total Loan Paid</div>
                <div className="stat-value">Tzs 560,000</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View History</button>
                </div>
            </div>
        </div>
    )
}

export default AmountStats