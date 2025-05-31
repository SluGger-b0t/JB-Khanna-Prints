"use client"
import React, { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      id="header-wrap"
      className="header-wrap fixed top-0 left-0 w-full bg-[#2f4f4f] shadow-md z-50"
    >
      <header id="header" className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="main-logo flex items-center">
                <a href="/" className="block">
                  <img
                    src="images/main-logo (2).png"
                    alt="logo"
                    className="h-12 w-auto"
                  />
                </a>
                <a href="/" className="block">
                  <img
                    src="images/second-logo.png"
                    alt="logo"
                    className="h-6 w-auto"
                  />
                </a>
              </div>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="/"
                    className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/product"
                    className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/career"
                    className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="#subscribe"
                    className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <div
                className="hamburger cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span
                  className={`bar block w-6 h-0.5 my-1 transition-all duration-300 bg-black ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`bar block w-6 h-0.5 my-1 transition-all duration-300 bg-black ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`bar block w-6 h-0.5 my-1 transition-all duration-300 bg-black ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
              {/* Mobile nav links */}
              {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#2f4f4f] shadow-md z-50 animate-fade-in">
                  <ul className="flex flex-col space-y-4 py-4 px-6">
                    <li>
                      <a
                        href="/"
                        className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about-us"
                        className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/product"
                        className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="/career"
                        className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Career
                      </a>
                    </li>
                    <li>
                      <a
                        href="#subscribe"
                        className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
