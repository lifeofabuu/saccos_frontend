/* eslint-disable no-unused-vars */
import { TrashIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React from 'react'

const LoanPayment = () => {
    return (
        <>
            {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Loan reference #</th>
                            <th>Applied On</th>
                            <th>Amount to pay(Tzs)</th>
                            <th>Total Amount Paid(Tzs)</th>
                            <th>Total Due Amount(Tzs)</th>
                            <th>Installments</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>s34-567</td>
                            <td>{moment(new Date()).format("DD MMM YY")}</td>
                            <td>700,000</td>
                            <td>300,000</td>
                            <td>200,000</td>
                            <td>3</td>
                            <td><button className="btn btn-square btn-ghost"><TrashIcon className="w-5" /></button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>s34-567</td>
                            <td>{moment(new Date()).format("DD MMM YY")}</td>
                            <td>500,000</td>
                            <td>300,000</td>
                            <td>200,000</td>
                            <td>3</td>
                            <td><button className="btn btn-square btn-ghost"><TrashIcon className="w-5" /></button></td>
                        </tr>
                    </tbody>
                </table >
            </div >
        </>
    )
}

export default LoanPayment