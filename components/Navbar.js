'use client'
import React, { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)

  return (
    <div
      id="header-wrap"
      className="header-wrap fixed top-0 left-0 w-full bg-[#426969] shadow-md z-50"
    >
      <header id="header" className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="main-logo flex flex-col items-center justify-center">
                <a href="/" className="block flex justify-center">
                  <img
                    src="images/main-logo (2).png"
                    alt="logo"
                    className="h-12 w-auto"
                  />
                </a>
                <a href="/" className="block flex justify-center mt-2">
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
                <li className="relative group">
                  <a
                    href="/product"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading flex items-center"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    Products
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                  <div
                    className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 transition-all duration-300 ${
                      productsDropdownOpen
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                    }`}
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <a
                      href="/product/category1"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#426969] hover:text-white"
                    >
                      Posters
                    </a>
                    <a
                      href="/product/category2"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#426969] hover:text-white"
                    >
                      Gift Items 
                    </a>
                    <a
                      href="/product/category3"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#426969] hover:text-white"
                    >
                      JBK Premium 
                    </a>
                  </div>
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
                    href="#subscribe"
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
                      <div className="relative">
                        <button
                          className="flex items-center justify-between w-full hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                          onClick={() =>
                            setProductsDropdownOpen(!productsDropdownOpen)
                          }
                        >
                          Products
                          <svg
                            className={`w-4 h-4 ml-1 transition-transform ${
                              productsDropdownOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {productsDropdownOpen && (
                          <div className="mt-2 ml-4 space-y-2">
                            <a
                              href="/product"
                              className="block hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                              onClick={() => setMenuOpen(false)}
                            >
                              Posters
                            </a>
                            <a
                              href="/product"
                              className="block hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                              onClick={() => setMenuOpen(false)}
                            >
                              Gift Items 
                            </a>
                            <a
                              href="/product"
                              className="block hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                              onClick={() => setMenuOpen(false)}
                            >
                              JBK premium 
                            </a>
                          </div>
                        )}
                      </div>
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
                        href="#subscribe"
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
