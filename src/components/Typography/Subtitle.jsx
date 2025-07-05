/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Subtitle = ({styleClass, children}) => {
  return (
    <div className={`text-xl font-semibold ${styleClass}`}>{children}</div>
  )
}

export default Subtitle