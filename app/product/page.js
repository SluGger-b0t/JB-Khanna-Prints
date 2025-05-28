'use client'

import React, { useState } from 'react'
import './style.css'
import { useRouter } from 'next/navigation'

const About = () => {
  const [activeSection, setActiveSection] = useState('religious')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const router = useRouter()

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name)
      const newCart = existing
        ? prevCart.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }]

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
    setShowCart(true)
  }

  const handleQuantityChange = (productName, delta) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  return (
    <div className="bg-[url('/images/texture-background.jpg')] bg-repeat pt-20 font-quicksand">
      <section id="popular-books" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="cormorant-heading text-[#2f4f4f] heading-underline uppercase tracking-wider">
              Popular Products
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#2f4f4f]/80 mb-8 mt-8 w-full md:w-1/2 mx-auto">
              Introducing Our New Canvas Painting Collection! At JB Khanna
              Prints, we're excited to unveil our latest range of canvas
              paintings — a blend of tradition, elegance, and timeless beauty.
              Each piece is thoughtfully curated to add charm and character to
              any space.
            </p>
            <div className="flex justify-center mt-8">
              <a
                href="Canvaspainting.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-[#2f4f4f] text-white rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm sm:text-base lg:text-lg font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Brochure
              </a>
            </div>
          </div>

          <div className="tabs-container">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                className="tab-btn active px-4 py-2 rounded-lg bg-[#2f4f4f] text-white hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors curvy-subheading text-sm sm:text-base lg:text-lg"
                data-tab="gift-boxes"
              >
                Canvas Paintings
              </button>
            </div>

            <div className="tab-content">
              <div className="tab-pane active" id="gift-boxes">
                <div className="max-w-6xl mx-auto px-4">
                  {/* {/* Mobile Category Dropdown */}
                  <div className="lg:hidden mb-6">
                    <select
                      id="category-select"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7e0ab] text-[#2f4f4f]"
                      style={{ maxHeight: '300px', overflowY: 'auto' }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="religious">
                        2x4 Feet | Divine strokes for sacred spaces
                      </option>
                      <option value="abstract">2X4 Feet Power in Motion</option>
                      <option value="floral">2X4 Feet Floral Whispers</option>
                      <option value="wild">
                        2X4 Feet Wild Soul, Bold Strokes
                      </option>
                      <option value="modern">
                        2X4 Feet Bold strokes, Modern flair
                      </option>
                      <option value="nature">
                        2X3 Feet Nature captured in every stroke
                      </option>
                      <option value="sacred">
                        2X3 Feet Sacred strokes, soulful connections
                      </option>
                      <option value="buddha">
                        2X3 Feet Buddha Bloss Collection
                      </option>
                      <option value="horses">
                        2X3 Feet Unbridled Spirit: The Power and Grace of Horses
                      </option>
                      <option value="colors">
                        2X3 Feet Whispers of Colors
                      </option>
                      <option value="rhythms">
                        2X3 Feet Rhythms of color: Stories in every stroke
                      </option>
                      <option value="divine">
                        2X3 Feet Divine Expressions: A symphony of spirit and
                        color
                      </option>
                      <option value="elegant">
                        3X3 Feet Elegant paintings with a story
                      </option>
                      <option value="texture">
                        22X28 INCH Texture of Nature
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col lg:flex-row">
                    {/* Sidebar Navigation - Hidden on mobile */}
                    <div className="hidden lg:block w-64 flex-shrink-0 pr-4 border-r border-gray-200">
                      <nav className="sticky top-24">
                        <ul className="space-y-2">
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg bg-[#2f4f4f] text-white hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm lg:text-base"
                              data-section="religious"
                              onClick={() => setActiveSection('religious')}
                            >
                              2x4 Feet Divine strokes for sacred spaces
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="abstract"
                              onClick={() => setActiveSection('abstract')}
                            >
                              2X4 Feet <br />
                              Power in Motion
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="floral"
                              onClick={() => setActiveSection('floral')}
                            >
                              2X4 Feet <br />
                              Floral Whispers
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="wild"
                              onClick={() => setActiveSection('wild')}
                            >
                              2X4 Feet <br />
                              Wild Soul, Bold Strokes
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="modern"
                              onClick={() => setActiveSection('modern')}
                            >
                              2X4 Feet <br />
                              Bold strokes, Modern flair
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="nature"
                              onClick={() => setActiveSection('nature')}
                            >
                              2X3 Feet <br />
                              Nature captured in every stroke
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="sacred"
                              onClick={() => setActiveSection('sacred')}
                            >
                              2X3 Feet <br />
                              Sacred strokes, soulful connections
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="buddha"
                              onClick={() => setActiveSection('buddha')}
                            >
                              2X3 Feet <br />
                              Buddha Bloss Collection
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="horses"
                              onClick={() => setActiveSection('horses')}
                            >
                              2X3 Feet <br />
                              Unbridled Spirit: The Power and Grace of Horses
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="colors"
                              onClick={() => setActiveSection('colors')}
                            >
                              2X3 Feet <br />
                              Whispers of Colors
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="rhythms"
                              onClick={() => setActiveSection('rhythms')}
                            >
                              2X3 Feet <br />
                              Rhythms of color: Stories in every stroke
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="divine"
                              onClick={() => setActiveSection('divine')}
                            >
                              2X3 Feet <br />
                              Divine Expressions: A symphony of spirit and color
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="elegant"
                              onClick={() => setActiveSection('elegant')}
                            >
                              3X3 Feet <br />
                              Elegant paintings with a story
                            </button>
                          </li>
                          <li>
                            <button
                              className="section-btn w-full text-left px-4 py-2 rounded-lg text-[#2f4f4f] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                              data-section="texture"
                              onClick={() => setActiveSection('texture')}
                            >
                              22X28 INCH <br />
                              Texture of Nature
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>

                    {/* {/* Content Area */}
                    <div className="flex-grow lg:pl-8">
                      {/* {/* Religious Collection Section */}
                      {activeSection === 'religious' && (
                        <div
                          className="section-content active"
                          id="religious-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2x4 Feet <br />
                            Divine strokes for sacred spaces
                          </h2>
                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Card */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/Devine/1.png"
                                  alt="Ganesh flute hand painting"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Ganesh flute hand painting
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  When ganesha plays even nature listens
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Ganesh flute hand painting',
                                        price: '₹5,099',
                                        image: 'images/Devine/1.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/Devine/5.png"
                                  alt="Through Van Gogh's eyes"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Through Van Gogh's eyes
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  A night where stars breath, and silence sings
                                  in color
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: "Through Van Gogh's eyes",
                                        price: '₹5,099',
                                        image: 'images/Devine/5.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/Devine/8.png"
                                  alt="Monochrome moments"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Monochrome moments
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  In the world of black and white, even the
                                  smallest Color speaks loudest
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Monochrome moments',
                                        price: '₹5,099',
                                        image: 'images/Devine/8.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/Devine/2.png"
                                  alt="The serenity of Buddha"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  The serenity of Buddha
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Peace begins with a still mind
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'The serenity of Buddha',
                                        price: '₹5,099',
                                        image: 'images/Devine/2.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Abstract Art Section */}
                      {activeSection === 'abstract' && (
                        <div
                          className="section-content active"
                          id="abstract-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X4 Feet <br />
                            Power in Motion
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Abstract Art */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/motion/4.png"
                                  alt="Sunset Sprint"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Sunset Sprint
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Bathed in warm hues, these majestic horses
                                  ride the wind beneath a glowing sky
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Sunset Sprint',
                                        price: '₹5,099',
                                        image: 'images/motion/4.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/motion/5.png"
                                  alt="Desert Run"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Desert Run
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Speed meets spirit in this dynamic display of
                                  wild stallions racing across the sands
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Desert Run',
                                        price: '₹5,099',
                                        image: 'images/motion/5.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Floral Whispers Section */}
                      {activeSection === 'floral' && (
                        <div
                          className="section-content active"
                          id="floral-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X4 Feet <br />
                            Floral Whispers
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Floral Whispers */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/floral/3.png"
                                  alt="Petal Radiance"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Petal Radiance
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  A luminous lotus unfurls in hues of serenity
                                  and strength
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Petal Radiance',
                                        price: '₹5,099',
                                        image: 'images/floral/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/floral/6.png"
                                  alt="Golden Petals"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Golden Petals
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Modern minimalistic meets floral charm in this
                                  striking black and gold contrast
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Golden Petals',
                                        price: '₹5,099',
                                        image: 'images/floral/6.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Wild Soul, Bold Strokes Section */}
                      {activeSection === 'wild' && (
                        <div
                          className="section-content active"
                          id="wild-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X4 Feet <br />
                            Wild Soul, Bold Strokes
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Wild Soul */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/wild/2.png"
                                  alt="Gentle Giants"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Gentle Giants
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Lush greenery and calm waters blend to create
                                  a haven of tranquility
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Gentle Giants',
                                        price: '₹5,099',
                                        image: 'images/wild/2.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/wild/5.png"
                                  alt="Celestial Chase"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Celestial Chase
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Dynamic horses leap across a cosmic backdrop -
                                  energy in motion and untamed freedom
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Celestial Chase',
                                        price: '₹5,099',
                                        image: 'images/wild/5.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Modern Flair Section */}
                      {activeSection === 'modern' && (
                        <div
                          className="section-content active"
                          id="modern-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X4 Feet <br />
                            Bold strokes, Modern flair
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Modern Flair */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/modern/3.png"
                                  alt="Loops of Motion"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Loops of Motion
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Curved layers in monochrome with golden echoes
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Loops of Motion',
                                        price: '₹5,099',
                                        image: 'images/modern/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/modern/4.png"
                                  alt="Urban Grunge"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Urban Grunge
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Raw textures and attractive tones
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹5,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Urban Grunge',
                                        price: '₹5,099',
                                        image: 'images/modern/4.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Nature Section */}
                      {activeSection === 'nature' && (
                        <div
                          className="section-content active"
                          id="nature-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Nature captured in every stroke
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Nature */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/nature/5.png"
                                  alt="Sunset Valley"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Sunset Valley
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  A dreamy sunset cast warmth over a quiet,
                                  winding valley
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Sunset Valley',
                                        price: '₹4,099',
                                        image: 'images/nature/5.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/nature/6.png"
                                  alt="Urban Rain Vibes"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Urban Rain Vibes
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Raindrops and reflections bring life to a
                                  bustling city streetscape scene
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm md:text-base"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Urban Rain Vibes',
                                        price: '₹4,099',
                                        image: 'images/nature/6.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sacred Section */}
                      {activeSection === 'sacred' && (
                        <div
                          className="section-content active"
                          id="sacred-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Sacred strokes, soulful connections
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Sacred Art */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/sacred/4.png"
                                  alt="Lotus Blessing"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Lotus Blessing
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Tranquil charm of the divine giver
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Lotus Blessing',
                                        price: '₹4,099',
                                        image: 'images/sacred/4.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/sacred/5.png"
                                  alt="Radha Krishna Harmony"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Radha Krishna Harmony
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Eternal love in melodic union
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Radha Krishna Harmony',
                                        price: '₹4,099',
                                        image: 'images/sacred/5.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Buddha Collection Section */}
                      {activeSection === 'buddha' && (
                        <div
                          className="section-content active"
                          id="buddha-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Buddha Bloss Collection
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Buddha Collection */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/buddha/3.png"
                                  alt="Divine Grace"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Divine Grace
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  A celestial embrace of calm and divinity
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Divine Grace',
                                        price: '₹4,099',
                                        image: 'images/buddha/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/buddha/4.png"
                                  alt="Lotus Awakening"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Lotus Awakening
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Where peace blossoms in every breath
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Lotus Awakening',
                                        price: '₹4,099',
                                        image: 'images/buddha/4.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Horses Collection Section */}
                      {activeSection === 'horses' && (
                        <div
                          className="section-content active"
                          id="horses-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Unbridled Spirit: The Power and Grace of Horses
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Horse Collection */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/horses/3.png"
                                  alt="Dawn Riders"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Dawn Riders
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  The sun awakens to a charge of radiant energy
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Dawn Riders',
                                        price: '₹4,099',
                                        image: 'images/horses/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/horses/4.png"
                                  alt="Celestial Rush"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Celestial Rush
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Galloping between moonlight and reflection of
                                  dreams
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Celestial Rush',
                                        price: '₹4,099',
                                        image: 'images/horses/4.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Colors Collection Section */}
                      {activeSection === 'colors' && (
                        <div
                          className="section-content active"
                          id="colors-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Whispers of Colors
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Colors Collection */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/colors/1.png"
                                  alt="Flight through Color"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Flight through Color
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Where nature spread it's wings across bold
                                  geometry
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Flight through Color',
                                        price: '₹4,099',
                                        image: 'images/colors/1.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/colors/5.png"
                                  alt="Collision of Motion"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Collision of Motion
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Brush strokes crash and blend in dynamic
                                  expression
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Collision of Motion',
                                        price: '₹4,099',
                                        image: 'images/colors/5.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Rhythms of Color Section */}
                      {activeSection === 'rhythms' && (
                        <div
                          className="section-content active"
                          id="rhythms-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Rhythms of color: Stories in every stroke
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Rhythms Collection */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/rhythms/3.png"
                                  alt="Tribal Musicians - Melody of Roots"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Tribal Musicians - Melody of Roots
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Music, color and culture converge in soulful
                                  harmony
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Tribal Musicians - Melody of Roots',
                                        price: '₹4,099',
                                        image: 'images/rhythms/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Divine Expressions Section */}
                      {activeSection === 'divine' && (
                        <div
                          className="section-content active"
                          id="divine-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            2X3 Feet <br />
                            Divine Expressions: A symphony of spirit and color
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Divine Expressions Collection */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/divine/3.png"
                                  alt="Whisper of Enlightenment"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Whisper of Enlightenment
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  A soul in stillness, kissed by nature's grace
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Whisper of Enlightenment',
                                        price: '₹4,099',
                                        image: 'images/divine/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/divine/4.png"
                                  alt="Guardian of the Grove"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Guardian of the Grove
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Majestic and grounded, a silent sentinel of
                                  the wild
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹4,099
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Guardian of the Grove',
                                        price: '₹4,099',
                                        image: 'images/divine/4.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Elegant Paintings Section */}
                      {activeSection === 'elegant' && (
                        <div
                          className="section-content active"
                          id="elegant-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            3X3 Feet <br />
                            Elegant paintings with a story
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Elegant Collection */}

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/elegant/2.png"
                                  alt="Stripes of Contrast"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Stripes of Contrast
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  A playful blend of monochrome and gold - wild
                                  by design
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹10,532
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Stripes of Contrast',
                                        price: '₹10,532',
                                        image: 'images/elegant/2.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/elegant/3.png"
                                  alt="Echoes of Depth"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Echoes of Depth
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Textured layers whisper stories of time and
                                  emotion
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹10,532
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Echoes of Depth',
                                        price: '₹10,532',
                                        image: 'images/elegant/3.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Texture of Nature Section */}
                      {activeSection === 'texture' && (
                        <div
                          className="section-content active"
                          id="texture-section"
                        >
                          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                            22X28 Inch <br />
                            Texture of Nature
                          </h2>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                            {/* Product Cards for Texture Collection */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                              <div className="relative">
                                <img
                                  src="images/texture/1.png"
                                  alt="Elements Aligned"
                                  className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-[#f7e0ab] px-2 py-1 rounded-full text-[#2f4f4f] text-xs sm:text-sm">
                                    New
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#2f4f4f] mb-2 leading-tight">
                                  Elements Aligned
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
                                  Geometry meets energy in a symphony of
                                  textured tones
                                </p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#2f4f4f]">
                                    ₹2,350
                                  </span>
                                  <button
                                    className="mt-2 px-3 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-xs sm:text-sm"
                                    onClick={() =>
                                      handleAddToCart({
                                        name: 'Elements Aligned',
                                        price: '₹2,350',
                                        image: 'images/texture/1.png',
                                      })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCart && (
        <div
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white bg-opacity-20 shadow-lg p-6 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out"
          style={{ transform: showCart ? 'translateX(0)' : 'translateX(100%)' }}
        >
          <button
            className="absolute top-2 right-2 text-[#2f4f4f] hover:text-[#f7e0ab]"
            onClick={() => setShowCart(false)}
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-[#2f4f4f]">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-[#2f4f4f]">Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li
                  key={idx}
                  className="mb-4 flex items-center gap-4 border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div className="flex-1">
                    <div className="text-[#2f4f4f] font-semibold">
                      {item.name}
                    </div>
                    <div className="text-[#2f4f4f]">{item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(item.name, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.name, 1)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 text-right">
            <p className="text-[#2f4f4f] font-semibold">
              Total: ₹
              {cart.reduce(
                (sum, item) =>
                  sum +
                  parseInt(item.price.replace('₹', '').replace(',', '')) *
                    item.quantity,
                0
              )}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
              onClick={() => router.push('/checkout')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      <button
        className="fixed bottom-6 right-6 bg-[#2f4f4f] text-[#f7e0ab] rounded-full p-4 shadow-lg z-40"
        onClick={() => setShowCart(true)}
      >
        🛒 {cart.length}
      </button>
    </div>
  )
}

export default About
