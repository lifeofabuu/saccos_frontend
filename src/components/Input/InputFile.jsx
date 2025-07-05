/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const InputFile = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, updateFormValue, updateType, required = false }) => {
    const [value, setValue] = useState(defaultValue);
    
    const updateInputValue = (file) => {
        setValue(file.target.files[0])
        updateFormValue({ updateType, value: file });
    };

    return (
        <div className={`form-control w-full ${containerStyle} bg-white`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input
                type={type || "file"}
                value={value}
                onChange={(e) => updateInputValue(e.target.value)}
                className="input w-full text-black bg-white"
            />
            {required && <span className="text-red-500 text-xs"> *inahitajika</span>}
        </div>
    )
}

export default InputFile