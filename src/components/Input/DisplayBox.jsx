/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const DisplayBox = ({ labelTitle, value }) => {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-black">{labelTitle}</span>
            </label>
            <div className="bg-gray-100 p-2 border border-gray-300 rounded text-black">
                {value}
            </div>
        </div>
    );
};

export default DisplayBox