'use client'
import React, { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      id="header-wrap"
      className="header-wrap fixed top-0 left-0 w-full bg-primary-light border-b border-[#f7e0ab]/10 shadow-sm z-50"
    >
      <header id="header" className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="main-logo flex flex-col items-center justify-center">
                <a href="/" className="block flex justify-center">
                  <img
                    src="/images/logotm.png"
                    alt="logo"
                    className="h-22 w-auto"
                  />
                </a>
              </div>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="/"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/catalogs"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Catalogs
                  </a>
                </li>
                <li>
                  <a
                    href="/career"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="#contact-us"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
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
                  className={`bar block w-6 h-0.5 my-1 transition-all duration-300 bg-[#f7e0ab] ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`bar block w-6 h-0.5 my-1 transition-all duration-300 bg-[#f7e0ab] ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`bar block w-6 h-0.5 my-1 transition-all duration-300 bg-[#f7e0ab] ${
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
                        className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about-us"
                        className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/catalogs"
                        className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Catalogs
                      </a>
                    </li>
                    <li>
                      <a
                        href="/career"
                        className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                        onClick={() => setMenuOpen(false)}
                      >
                        Career
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact-us"
                        className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
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
