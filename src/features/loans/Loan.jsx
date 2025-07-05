/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import LoanPayment from './loanPayment'
import PendingLoans from './pendingLoans'
import LoanApplicationDialog from '../../components/DialogBox/LoanApplicationDialog'
import ApprovedLoans from './ApprovedLoans'


const TopSideButtons = () => {

    const [showModal, setShowModal] = useState(false);
    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => { setShowModal(true); }}>Omba Mkopo</button>
            {showModal && <LoanApplicationDialog setOpenModal={setShowModal} />}
        </div>
    )
}

const Loan = () => {
    const [activeTab, setActiveTab] = useState('pendingLoans'); // Initial state

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <TitleCard title="Mikopo" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                <div className="flex flex-row justify-between mb-4 border-b border-gray-200 pb-4">
                    <div
                        className={`text-sm font-medium cursor-pointer ${activeTab === 'pendingLoans' ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => handleTabClick('pendingLoans')}
                    >
                        Mikopo inayosubiri uthibitisho
                        {activeTab === 'pendingLoans' && <div className="h-0.5 bg-blue-500 mt-1"></div>}
                    </div>
                    <div
                        className={`text-sm font-medium cursor-pointer ${activeTab === 'approvedLoans' ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => handleTabClick('approvedLoans')}
                    >
                        Mikopo iliyoidhinishwa
                        {activeTab === 'approvedLoans' && <div className="h-0.5 bg-blue-500 mt-1"></div>}
                    </div>
                    {/* <div
                        className={`text-sm font-medium cursor-pointer ${activeTab === 'loanRepayment' ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => handleTabClick('loanRepayment')}
                    >
                        Lipa Mikopo 
                        {activeTab === 'loanRepayment' && <div className="h-0.5 bg-blue-500 mt-1"></div>}
                    </div> */}
                </div>
                {activeTab === 'pendingLoans' && <PendingLoans />}
                {activeTab === 'approvedLoans' && <ApprovedLoans />}
                {/* {activeTab === 'loanRepayment' && <LoanPayment />} */}
            </TitleCard >
        </>
    )
}

export default Loan