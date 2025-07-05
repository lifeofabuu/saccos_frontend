/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

// CORRECTED import paths, going two levels up into src/
import logo from '../../assets/logo.png'
import InputText from '../../components/Input/InputText'
import TextareaInput from '../../components/Input/TextareaInput'

const RulesAndRegulations = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const sections = [
    {
      title: 'Uhalali wa Uanachama (Membership Eligibility)',
      content: `Mwanachama lazima awe na umri wa zaidi ya miaka 18, awe mkazi halisi wa eneo la SACCO yetu, 
                na awe na cheti cha kuzaliwa au pasipoti halali.`
    },
    {
      title: 'Haki na Wajibu wa Mwanachama (Rights & Obligations)',
      content: `Wanachama wana haki ya kuweka akiba, kuomba mikopo, na kuhudhuria mikutano. 
                Wao ni wajibu wa kuheshimu masharti ya sakafu na kulipa michango bila kuchelewesha.`
    },
    {
      title: 'Sera za Mikopo (Loan Policies)',
      content: `Mikopo inatolewa baada ya miezi 2 ya uanachama, inategemea historia yako ya malipo, 
                riba ni 15% kwa mwaka, na repement inafanyika kwa awamu za kila mwezi.`
    },
    {
      title: 'Kanuni za Maadili (Code of Conduct)',
      content: `Wanachama, wafanyakazi, na viongozi wanatarajiwa kufanya kazi kwa uadilifu, uwazi, 
                na kuheshimu siri za mfanyakazi mwingine. Acheni rushwa na tabia mbaya.`
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

      {/* Hero / Title */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Masharti na Vigezo</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Soma sheria, sera na miongozo yetu ili kuhakikisha uanachama na huduma zetu zinaeleweka na kuheshimiwa.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-6 py-12 flex-grow space-y-12">
        {sections.map(({ title, content }, idx) => (
          <section key={idx} className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{content}</p>
          </section>
        ))}

        {/* Back to Home */}
        <div className="text-center mt-8">
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

export default RulesAndRegulations
