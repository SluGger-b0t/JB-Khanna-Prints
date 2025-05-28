import React from 'react'

const Navbar = () => {
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
                <a href="index.html" className="block">
                  <img
                    src="images/main-logo (2).png"
                    alt="logo"
                    className="h-12 w-auto"
                  />
                </a>
                <a href="index.html" className="block">
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
                    href="#header-wrap"
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
                    href="products.html"
                    className="text-black hover:text-[#f7e0ab] transition-colors font-medium curvy-subheading"
                  >
                    Products
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

            <div className="hamburger md:hidden cursor-pointer">
              <span className="bar block w-6 h-0.5 bg-[#2f4f4f] my-1"></span>
              <span className="bar block w-6 h-0.5 bg-[#2f4f4f] my-1"></span>
              <span className="bar block w-6 h-0.5 bg-[#2f4f4f] my-1"></span>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
