/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu'
import routes from '../routes/SideBar'
import logo from '../assets/logo.png'
// import { useUser } from '../providers/UserContext'

const LeftSidebar = () => {
    // const { user } = useUser(); // Destructure user from the context
    // console.log('User from context:', user); // Debug log for user
    
    const localStorageUser = localStorage.getItem('user'); // Retrieve the user from localStorage
    const parsedUser = localStorageUser ? JSON.parse(localStorageUser) : null; // Parse the JSON string

    const userRole = parsedUser?.userType; // Access userType from the parsed user object
    const location = useLocation();

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }
    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
                <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/app/dashboard'}>
                        <img className="mask mask-squircle w-10" src={logo} alt="logo" />
                        SACCOS
                    </Link>
                </li>
                {
                    routes.map((route, k) => {
                        // Check if the user role is allowed to access the route
                        if (route.allowedRoles && !route.allowedRoles.includes(userRole)) {
                            return null; // If not allowed, return null to skip rendering this route
                        }
                        return (
                            <li className="" key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu {...route} userRole={userRole} /> :
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold bg-base-200 ' : 'font-normal'}`} >
                                            {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                                                    aria-hidden="true"></span>) : null
                                            }
                                        </NavLink>)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default LeftSidebar