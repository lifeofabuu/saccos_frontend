/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

// CORRECTED import paths, going two levels up into src/
import logo from '../../assets/logo.png'
import InputText from '../../components/Input/InputText'
import TextareaInput from '../../components/Input/TextareaInput'

const OurServices = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const services = [
    {
      title: 'Akiba ya Kawaida (Deposits)',
      items: [
        'Mwanachama kuweka akiba mara kwa mara',
        'Kutoa pesa wakati wowote anapohitaji',
        'Weka akiba kusaidia mahitaji yako ya kila siku',
      ]
    },
    {
      title: 'Akiba ya Lazima (Mandatory Savings)',
      items: [
        'Kila mwezi mwanachama lazima kuweka TSH 10,000',
        'Haichukuliwi hadi mwanachama ajiokoe',
        'Haina ada yoyote',
        'Husaidia kudhamini mikopo',
        'Inapata riba kila mwaka',
        'Inapunguza ucheleweshaji wa mikopo',
      ]
    },
    {
      title: 'Akiba ya Malengo (Specialized Savings)',
      items: [
        'Weka akiba kwa kipindi maalumu kulingana na malengo',
        'Mwanachama anapanga malengo na kuweka kiasi maalumu kila mwezi',
        'Riba inalipwa mwishoni mwa mkataba',
      ]
    },
    {
      title: 'Hisa (Shares)',
      items: [
        'Hisa ni mtaji wa mwanachama kwenye SACCOS',
        'Mwanachama hulipa hisa kianzio TSH 30,000',
        'Anaweza kuongeza hisa kupata gawio bora kila mwaka',
      ]
    },
    {
      title: 'Mikopo (Loans)',
      items: [
        'Mikopo inapatikana baada ya miezi 2 ya uanachama',
        'Mikopo hutolewa kwa awamu kulingana na historia ya malipo',
        'Inahitaji akiba ya 25% na hisa zilizoimara',
      ]
    }
  ]

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
            <Link to="/contactUs" className="hover:text-blue-600 transition">Wasiliana Nasi</Link>
            <Link
              to="/login"
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >Wanachama Kuingia</Link>
          </nav>
        </div>
      </header>

      {/* Hero / Page Title */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Huduma Zetu</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Tunatoa huduma mbalimbali za kifedha ili kusaidia wanachama wetu kufanikiwa kiuchumi.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="container mx-auto px-6 py-12 flex-grow">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div key={svc.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">{svc.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {svc.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeftIcon className="w-5 h-5 mr-1" /> Nyumbani
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 border-t">
        &copy; {new Date().getFullYear()} SACCOS LTD. Haki zote zimehifadhiwa.
      </footer>
    </div>
  )
}

export default OurServices
