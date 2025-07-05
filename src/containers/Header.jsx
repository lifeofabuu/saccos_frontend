/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { themeChange } from 'theme-change'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logoz.jpg';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
  const [user, setUser] = useState(null);
  // const location = useLocation()
  // const pathname = location.pathname
  const navigate = useNavigate();

  useEffect(() => {
    themeChange(false)
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setCurrentTheme("light")
      } else {
        setCurrentTheme("dark")
      }
    }
  }, [currentTheme])

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function logoutUser() {
    localStorage.clear();
    navigate('/login');
    toast.success('Logout Successfully', {
      position: "top-right",
    });
  }

  const getRoleComponent = (userType) => {

    switch (userType) {
        case 1: // ADMIN
            return <div>Admin</div>;
        case 2: // USER
            return <div>Mwanachama</div>;
        case 3: // PENDING
            return <div>Pending</div>;
        case 4: // SACCOS ACCOUNTANT
            return <div>SACCOS</div>;
        case 5: // DIT Accountant
            return <div>Mhasibu</div>;
        case 6: // CHAIRPERSON
            return <div>Mwenyekiti</div>
        case 7: // SECRETARY
            return <div>Katibu</div>
        default:
            return <div>Unknown</div>;
    }
};

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        <div className="flex-1">
          <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          {/* <h1 className="text-2xl font-semibold ml-2">
            {pathname.split('app/').pop().charAt(0).toUpperCase() + pathname.split('app/').pop().slice(1)}
          </h1> */}
        </div>

        <div className="flex-none ">
          <select className="select select-sm mr-4" data-choose-theme>
            <option disabled selected>Theme</option>
            <option value="light">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          {user ? (
            <>
              <select className='select select-sm mr-2'>
                <option disabled selected>{user.name}</option>
                <option disabled>{user.membership_number}</option>
                <option disabled>{getRoleComponent(user.userType)}</option>
              </select>
              <div className="dropdown dropdown-end ml-4">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.profile || logo} alt="profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="justify-between">
                    <Link to={'/app/profile'}>
                      Profile Settings
                    </Link>
                  </li>
                  <div className="divider mt-0 mb-0"></div>
                  <li>
                    <a onClick={logoutUser}>Logout</a>
                    <ToastContainer transition={Bounce} />
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
