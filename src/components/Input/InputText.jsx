/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const InputText = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, required = false, disabled = false }) => {

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({ updateType, value: val })
    }

    return (
        <div className={`form-control w-full ${containerStyle} text-black`}>
            <label className="label">
                <span className={"label-text text-black"}>{labelTitle}</span>
                {required && <span className="text-red-500 text-xs"> *inahitajika</span>}
            </label>
            <input
                type={type || "text"}
                value={value}
                placeholder={placeholder || ""}
                disabled={disabled}
                onChange={(e) => updateInputValue(e.target.value)}
                className={`input input-bordered w-full ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100'} outline-[rgb(0,0,0)] text-black`} 
            />
        </div>
    )
}

export default InputText