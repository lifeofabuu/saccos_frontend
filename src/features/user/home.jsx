/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';
import img10 from '../../assets/img10.jpg';

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/src/assets/logo.png" alt="SACCOS Logo" className="h-16 w-16 object-contain" />
            <h1 className="text-2xl font-bold text-gray-800">SACCOS LTD</h1>
          </div>
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Nyumbani</Link>
            <Link to="/aboutUs" className="hover:text-blue-600">Kuhusu Sisi</Link>

            <div className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <button className="flex items-center hover:text-blue-600 focus:outline-none">
                Uanachama
                {showDropdown ? (
                  <ChevronUpIcon className="w-5 h-5 ml-1" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 ml-1" />
                )}
              </button>
              {showDropdown && (
                <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-56 z-10">
                  <Link to="/membershipRequest" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">
                    Omba Uanachama
                  </Link>
                  <Link to="/rulesAndRegulations" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">
                    Masharti na Vigezo
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contactUs" className="hover:text-blue-600">Wasiliana Nasi</Link>
            <Link to="/login" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Wanachama Kuingia
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-16">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Karibu SACCOS</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              SACCOS ni Chama cha Ushirika wa Akiba na Mikopo kinacholenga kuinua hali za maisha ya wanachama kupitia huduma bora za kifedha.
              Kimesajiliwa rasmi mwaka 1998 chini ya Sheria ya Ushirika ya 1991 kwa namba DSR 596.
            </p>
            <Link to="/ourServices" className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
              Huduma Zetu
            </Link>
          </div>

          {/* Image Carousel */}
          <div className="lg:w-1/2 w-full shadow-xl rounded-lg overflow-hidden">
            <ImageCarousel images={[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]} />
          </div>
        </section>

        {/* Mission & Vision Section (Optional Future Improvement) */}
        {/* You can add another row here for Mission & Vision if needed */}

      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-600 border-t">
        &copy; {new Date().getFullYear()} SACCOS LTD. Haki zote zimehifadhiwa.
      </footer>
    </div>
  );
};

export default Home;
