import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-black/60 backdrop-blur-md text-white fixed top-0 left-0 w-full shadow-md z-50 p-2 flex justify-between items-center ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          <a href="/" className="text-white text-3xl font-bold hover:text-gray-300 font-boldonse">
            Intellix
          </a>
          <div className="flex space-x-6 items-center">
            <a href="/features" className="hover:text-gray-300">
              Features
            </a>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
            <a
              href="/chat"
              className="bg-gradient-to-tr from-[#232424] to-black/90 hover:scale-105 transition-all duration-200 shadow-md text-white rounded-3xl px-4 py-2 flex items-center"
            >
              Launch App
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar