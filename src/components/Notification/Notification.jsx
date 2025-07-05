/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { notification } from 'antd';

const Notification = ({ message, duration = 5 }) => {
  useEffect(() => {
    if (message) {
      notification.success({
        message,
        duration,
        style: {
          fontSize: '18px', // Customize font size
          textAlign: 'center', // Center the message
          top: '20px', // Position from top
          right: '20px', // Position from right
        },
      });
    }
  }, [message, duration]);

  return null;
};

export default Notification;
