/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const InputDropdown = ({ labelTitle, labelStyle, options, containerStyle, defaultValue, updateFormValue, updateType, required=false }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        updateFormValue({ updateType, value: selectedValue });
    };

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={`label-text text-black ${labelStyle}`}>{labelTitle}</span>
                {required && <span className="text-red-500 text-xs"> *inahitajika</span>}
            </label>
            <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="select select-bordered w-full bg-gray-100 outline-[rgb(0,0,0)] text-black"
            >
                {Array.isArray(options) ? (
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                ) : (
                    <option value="">No options available</option>
                )}
            </select>
        </div>
    );
};

export default InputDropdown;
