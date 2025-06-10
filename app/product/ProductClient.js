'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './style.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'

const ProductClient = ({ products }) => {
  const [activeSection, setActiveSection] = useState(
    Object.keys(products)[0] || 'religious'
  )
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name)
      const newCart = existing
        ? prevCart.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prevCart,
            { ...product, quantity: 1, image: product.image || null },
          ]

      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
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

      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Separate premium and normal items for display in cart preview
  const premiumItems = cart.filter(
    (item) => item.category && item.category.toLowerCase().trim() === 'premium'
  )
  const normalItems = cart.filter(
    (item) => !item.category || item.category.toLowerCase().trim() !== 'premium'
  )

  const CartItemPreview = ({ item }) => (
    <div
      key={item._id}
      className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg"
    >
      <div className="relative w-16 h-16 flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain rounded-md"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-[#2f4f4f]">{item.name}</h3>
        <p className="text-sm text-[#2f4f4f]/70">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.name, -1)}
          className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
        >
          -
        </button>
        <span className="text-[#2f4f4f]">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.name, 1)}
          className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
        >
          +
        </button>
      </div>
    </div>
  )

  const renderProductCard = (product) => (
    <div
      key={product._id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
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
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm lg:text-base text-[#2f4f4f]/70 mb-3 leading-relaxed">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[#2f4f4f]">
            ₹{product.price}
          </span>
          <div className="flex space-x-2">
            <Link href={`/products/${product.product_id.current}`}>
              <button className="px-4 py-2 bg-[#2f4f4f]/10 text-[#2f4f4f] text-sm rounded-lg hover:bg-[#2f4f4f]/20 transition-all duration-300">
                View Details
              </button>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-4 py-2 bg-[#2f4f4f] text-white rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-[url('/images/texture-background.jpg')] bg-repeat pt-20 font-quicksand">
      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-8 right-8 bg-[#2f4f4f] text-white p-4 rounded-full shadow-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors z-40"
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </div>
      </button>

      {/* Cart Preview */}
      {showCart && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#2f4f4f]">
                Your Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-[#2f4f4f] hover:text-[#f7e0ab]"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-[#2f4f4f]/70">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {premiumItems.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-[#2f4f4f] mb-2">
                        Premium Collection
                      </h3>
                      {premiumItems.map((item) => (
                        <CartItemPreview key={item._id} item={item} />
                      ))}
                    </div>
                  )}
                  {normalItems.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold text-[#2f4f4f] mb-2">
                        Regular Collection
                      </h3>
                      {normalItems.map((item) => (
                        <CartItemPreview key={item._id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-[#2f4f4f]">
                  Total:
                </span>
                <span className="text-lg font-semibold text-[#2f4f4f]">
                  ₹{calculateTotal()}
                </span>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-3 bg-[#2f4f4f] text-white rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

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
          </div>

          {/* Mobile Category Dropdown */}
          <div className="block lg:hidden mb-8">
            <label htmlFor="category-select" className="sr-only">
              Select a category
            </label>
            <select
              id="category-select"
              className="w-full p-3 border border-gray-300 rounded-lg text-[#2f4f4f] bg-white"
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
            >
              {Object.keys(products).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation - Hidden on mobile */}
            <div className="hidden lg:block w-64 flex-shrink-0 pr-4 border-r border-gray-200">
              <nav className="sticky top-24">
                <ul className="space-y-2">
                  {Object.keys(products).map((category) => (
                    <li key={category}>
                      <button
                        className={`section-btn w-full text-left px-4 py-2 rounded-lg ${
                          activeSection === category
                            ? 'bg-[#2f4f4f] text-white'
                            : 'text-[#2f4f4f]'
                        } hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm lg:text-base`}
                        onClick={() => setActiveSection(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex-grow lg:pl-8">
              {/* Section content */}
              {Object.entries(products).map(([category, categoryProducts]) => (
                <div
                  key={category}
                  className={`section-content ${activeSection === category ? 'active' : 'hidden'}`}
                  id={`${category}-section`}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-cormorant-garamond font-semibold text-[#2f4f4f] mb-4 lg:mb-6 leading-tight">
                    {category}
                  </h2>
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {categoryProducts.map(renderProductCard)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductClient
