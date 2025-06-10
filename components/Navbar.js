'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)

  return (
    <div
      id="header-wrap"
      className="header-wrap w-full bg-[#426969] shadow-md z-50"
    >
      <header id="header" className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="main-logo flex flex-col items-center justify-center">
                <Link href="/" className="flex justify-center flex-col">
                  <Image
                    src="/images/main-logo (2).png"
                    alt="JB Khanna Prints Logo"
                    priority
                    width={60}
                    height={60}
                    className='justify-center items-center'
                  />
                  <Image
                    src="/images/second-logo.png"
                    alt="JB Khanna Prints Logo"
                    priority
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href="/"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about-us"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    About Us
                  </Link>
                </li>
                <li className="relative group">
                  <Link
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
                  </Link>
                  {productsDropdownOpen && (
                    <div
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <Link
                        href="/products/premium"
                        className="block px-4 py-2 text-sm text-[#2f4f4f] hover:bg-gray-100"
                      >
                        Premium Collection
                      </Link>
                      <Link
                        href="/products/new-arrivals"
                        className="block px-4 py-2 text-sm text-[#2f4f4f] hover:bg-gray-100"
                      >
                        New Arrivals
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    href="/career"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-black text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-[#f7e0ab] focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      menuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#2f4f4f]/90 z-40 flex justify-center items-center">
            <div className="text-center">
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/"
                    className="text-[#f7e0ab] text-2xl font-bold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about-us"
                    className="text-[#f7e0ab] text-2xl font-bold"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li className="relative">
                  <button
                    className="flex items-center justify-between w-full text-[#f7e0ab] text-2xl font-bold focus:outline-none"
                    onClick={() =>
                      setProductsDropdownOpen(!productsDropdownOpen)
                    }
                  >
                    Products
                    <svg
                      className={`w-6 h-6 ml-2 transition-transform ${
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
                    <div className="mt-4 space-y-4">
                      <Link
                        href="/products/premium"
                        className="block text-[#f7e0ab]/80 text-xl"
                        onClick={() => setMenuOpen(false)}
                      >
                        Premium Collection
                      </Link>
                      <Link
                        href="/products/new-arrivals"
                        className="block text-[#f7e0ab]/80 text-xl"
                        onClick={() => setMenuOpen(false)}
                      >
                        New Arrivals
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    href="/career"
                    className="text-[#f7e0ab] text-2xl font-bold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#f7e0ab] text-2xl font-bold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default Navbar
