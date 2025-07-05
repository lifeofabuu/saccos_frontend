/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import { BoltIcon, HeartIcon } from '@heroicons/react/24/outline'
import React from 'react'

const PageStats = ({ events }) => {
    return (
        <div className="stats bg-base-100 shadow elevation-5">

            {/* <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <HeartIcon className='w-8 h-8' />
                </div>
                <div className="stat-title">Vikao</div>
                <div className="stat-value">{events}</div>
                <div className="stat-desc">21% more than last month</div>
            </div> */}

            <div className="stat">
                <div className="stat-figure invisible md:visible">
                    <BoltIcon className='w-8 h-8' />
                </div>
                <div className="stat-title">Matukio yanayokuja</div>
                <div className="stat-value">{events}</div>
                {/* <div className="stat-desc">14% more than last month</div> */}
            </div>
        </div>
    )
}

export default PageStats
