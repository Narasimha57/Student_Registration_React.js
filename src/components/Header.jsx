import React from 'react'

const Header = () => {
  return (
    <div>
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-center items-center bg-blue-600 h-16">
            {/*
             */}
            <h1 className="text-xl font-bold text-white text-left sm:text-center lg:text-3xl md:text-2xl">
              Student Registration System
            </h1>
          </div>
        </div>
      </header>
    </div>

  )
}

export default Header