/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, redirect } from 'react-router-dom'
import { useUser } from '../providers/UserContext'

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { user } = useUser();
    const userRole = user?.userType;

    return (
        <Route
            {...rest}
            render={props => 
                allowedRoles.includes(userRole) ? (
                    <Component {...props} />
                ) : (
                    <redirect to="/app/404" />
                )
            }
        />
    );
};

export default ProtectedRoute