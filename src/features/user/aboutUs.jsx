/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Import your logo image correctly
import logo from '../../assets/logo.png';

const About = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      {/* Navbar/Header (identical to Home.jsx) */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="SACCOS Logo" className="h-14 w-14 object-contain" />
            <h1 className="text-2xl font-bold text-gray-800">SACCOS LTD</h1>
          </div>
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Nyumbani</Link>
            <Link to="/aboutUs" className="text-blue-600 font-semibold">Kuhusu Sisi</Link>
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

      {/* Page Hero */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Kuhusu SACCOS</h2>
          <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
            Tunajivunia kuwa taasisi ya kifedha inayomilikiwa na wanachama wetu, ikitoa akiba,
            mikopo, na ushauri kwa riba nafuu – yote kwa lengo la kuinua hali za kiuchumi kwa ushirikiano.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Historia Yetu</h3>
        <p className="text-gray-700 leading-relaxed">
          SACCOS ilianzishwa rasmi mwaka 1998 chini ya Sheria ya Ushirika ya 1991 na
          imesajiliwa kwa nambari <strong>DSR 596</strong>. Tangu wakati huo tumekuwa tukiwasaidia
          wanachama wetu kupata huduma za kifedha kwa njia rahisi na ya kuaminika.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-6 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold text-blue-600 mb-2">Dira Yetu</h4>
            <p className="text-gray-700 leading-relaxed">
              Kuwa taasisi inayoongoza kitaifa kwa uwazi, maadili, na maendeleo endelevu
              ya kifedha kwa wanachama wetu.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold text-blue-600 mb-2">Dhima Yetu</h4>
            <p className="text-gray-700 leading-relaxed">
              Kutoa huduma bora za akiba, mikopo, na ushauri wa kifedha ili kukuza ustawi
              wa jamii ya wanachama.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-12 text-center">
        <Link
          to="/membershipRequest"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Jiunge Nasi Leo
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 border-t">
        &copy; {new Date().getFullYear()} SACCOS LTD. Haki zote zimehifadhiwa.
      </footer>
    </div>
  );
};

export default About;
