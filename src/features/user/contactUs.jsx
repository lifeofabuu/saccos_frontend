/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Adjust path if needed
import logo from '../../assets/logo.png'
import InputText from '../../components/Input/InputText'
import TextareaInput from '../../components/Input/TextareaInput'

const ContactUs = () => {
  // Navbar dropdown
  const [showDropdown, setShowDropdown] = useState(false)

  // Form fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  // Alert: { type: 'success' | 'error', text: string }
  const [alert, setAlert] = useState({ type: '', text: '' })

  // Update a single field
  const updateFormValue = ({ updateType, value }) => {
    setForm(prev => ({ ...prev, [updateType]: value }))
  }

  // Submit handler
  const handleSubmit = async e => {
    e.preventDefault()

    if (!form.name.trim()) {
      return setAlert({ type: 'error', text: 'Tafadhali andika jina lako kamili.' })
    }

    try {
      // POST to your backend endpoint
      await axios.post('/api/contact', form)

      // On success: show banner, clear fields
      setAlert({
        type: 'success',
        text: `Asante, ${form.name}, kwa kutuandikia!`,
      })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setAlert({
        type: 'error',
        text: 'Samahani, tatizo limejitokeza. Jaribu tena baadaye.',
      })
    }
  }

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      {/* Navbar/Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="SACCOS Logo" className="h-14 w-14 object-contain" />
            <h1 className="text-2xl font-bold text-gray-800">SACCOS LTD</h1>
          </div>
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Nyumbani</Link>
            <Link to="/aboutUs" className="hover:text-blue-600 transition">Kuhusu Sisi</Link>
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center hover:text-blue-600 transition focus:outline-none">
                Uanachama
                {showDropdown 
                  ? <ChevronUpIcon className="w-5 h-5 ml-1" />
                  : <ChevronDownIcon className="w-5 h-5 ml-1" />
                }
              </button>
              {showDropdown && (
                <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-56 z-30">
                  <Link
                    to="/membershipRequest"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                  >Omba Uanachama</Link>
                  <Link
                    to="/rulesAndRegulations"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                  >Masharti na Vigezo</Link>
                </div>
              )}
            </div>
            <Link to="/contactUs" className="text-blue-600 font-semibold">Wasiliana Nasi</Link>
            <Link
              to="/login"
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >Wanachama Kuingia</Link>
          </nav>
        </div>
      </header>

      {/* Hero / Page Title */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Wasiliana Nasi</h2>
          <p className="text-gray-700">Tunafurahia kusikia kutoka kwako—tuma ujumbe hapa chini.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 flex-grow">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Taarifa za Mawasiliano</h3>
            <div className="space-y-4 text-gray-700">
              {/* SVG icons omitted for brevity */}
              <p>Bibi Titi Mohamed, Morogoro Rd, Dar es Salaam</p>
              <p>+255 123 456 789</p>
              <p>info@saccos.co.tz</p>
              <p>P.O. Box 2958, Dar es Salaam</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Alert Banner */}
            {alert.text && (
              <div
                className={`mb-6 p-4 rounded ${
                  alert.type === 'success'
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'
                }`}
              >
                {alert.text}
                <button
                  onClick={() => setAlert({ type: '', text: '' })}
                  className="ml-4 font-bold hover:underline"
                >
                  X
                </button>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputText
                updateType="name"
                labelTitle="Jina Kamili"
                value={form.name}
                updateFormValue={updateFormValue}
                placeholder="Andika jina lako kamili"
              />
              <InputText
                updateType="email"
                type="email"
                labelTitle="Barua Pepe"
                value={form.email}
                updateFormValue={updateFormValue}
                placeholder="example@domain.com"
              />
              <InputText
                updateType="phone"
                labelTitle="Namba ya Simu"
                value={form.phone}
                updateFormValue={updateFormValue}
                placeholder="0*********"
              />
              <TextareaInput
                updateType="message"
                labelTitle="Ujumbe"
                value={form.message}
                updateFormValue={updateFormValue}
                placeholder="Andika ujumbe wako hapa"
              />
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Tuma Ujumbe
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Back to Home */}
      <div className="container mx-auto px-6 text-center py-4">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeftIcon className="w-5 h-5 mr-1" /> Nyumbani
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 border-t">
        &copy; {new Date().getFullYear()} SACCOS LTD. Haki zote zimehifadhiwa.
      </footer>
    </div>
  )
}

export default ContactUs
