/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
  const token = localStorage.getItem("refresh_token");

  return (
    token?
    <Outlet/>
    :
    <Navigate to="/app/dashboard"/>
  )
}

export default RequireAuth