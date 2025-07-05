/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { apis } from '../../auth/apis';

const loansTz1 = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(apis.getInstitutionLoansUrl, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                    }
                });
                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        fetchLoans();
    }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">MIKOPO YA MWAJIRI (Makato ya Mshahara)</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">S/N</th>
                            <th className="px-4 py-2">Kiasi cha Mkopo</th>
                            <th className="px-4 py-2">Tarehe ya Maombi</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Kiasi cha malipo kwa mwezi</th>
                            <th className="px-4 py-2">Kiasi kilichobakia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan, index) => (
                            <tr key={loan.id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{loan.loanRequestAmount}</td>
                                <td className="border px-4 py-2">{new Date(loan.loanRequestDate).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{loan.loanStatus}</td>
                                <td className="border px-4 py-2">{loan.loanRepayPerMonth}</td>
                                <td className="border px-4 py-2">{loan.amount_remaining}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default loansTz1;