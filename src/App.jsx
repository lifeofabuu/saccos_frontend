/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import RequireAuth from './auth/RequireAuth'
import AboutUs from './pages/AboutUs'
import Layout from './containers/Layout'
import ContactUs from './pages/ContactUs'
import HomePage from './pages/HomePage'
import RulesAndRegulations from './pages/RulesAndRegulations'
import MembershipRequest from './pages/MembershipRequest'
import OurServices from './pages/OurServices'
import { UserProvider } from './providers/UserContext'

function App() {

  // Check for login and initialize axios
  const token = localStorage.getItem("refresh_token");

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/rulesAndRegulations' element={<RulesAndRegulations />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path='/ourServices' element={<OurServices />} />
            <Route path='/membershipRequest' element={<MembershipRequest />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route element={<RequireAuth />}>
              <Route path="/app/*" element={<Layout />} />
              <Route path="*" element="/app/dashboard" />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
