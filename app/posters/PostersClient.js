'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './style.css'
import ReactDOM from 'react-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

// Portal component for dropdown
function DropdownPortal({ children, position, onClose }) {
  const portalRef = useRef(null)
  useEffect(() => {
    function handleClick(event) {
      if (portalRef.current && !portalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])
  if (!position) return null
  return ReactDOM.createPortal(
    <div
      ref={portalRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: 192, // w-48
        zIndex: 9999,
      }}
      className="bg-white border border-[#2f4f4f]/20 rounded shadow-lg"
    >
      {children}
    </div>,
    document.body
  )
}

const PostersClient = ({ products }) => {
  // Filter products to only include those with collection 'posters'
  const filteredByCollection = {}
  Object.entries(products).forEach(([category, items]) => {
    const filteredItems = items.filter(
      (item) =>
        item.collection && item.collection.trim().toLowerCase() === 'posters'
    )
    if (filteredItems.length > 0) {
      filteredByCollection[category] = filteredItems
    }
  })

  // Build categories and subcategories from filteredByCollection
  const categoriesSet = new Set()
  const subcatMap = {}
  Object.entries(filteredByCollection).forEach(([category, items]) => {
    categoriesSet.add(category)
    items.forEach((item) => {
      if (item.subcategory) {
        if (!subcatMap[category]) subcatMap[category] = new Set()
        subcatMap[category].add(item.subcategory)
      }
    })
  })
  const categories = Array.from(categoriesSet)
  const subcategoriesByCategory = {}
  Object.keys(subcatMap).forEach((cat) => {
    subcategoriesByCategory[cat] = Array.from(subcatMap[cat])
  })

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const categoryButtonRefs = useRef({})

  const [activeSection, setActiveSection] = useState(
    Object.keys(products)[0] || 'religious'
  )
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [toast, setToast] = useState(null)
  const router = useRouter()
  const cartButtonRef = useRef(null)
  const [footerVisible, setFooterVisible] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [showWishlist, setShowWishlist] = useState(false)

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0.01,
      }
    )
    observer.observe(footer)
    return () => observer.disconnect()
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
        : [...prevCart, { ...product, quantity: 1 }]

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

  const handleWishlistToggle = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id)
      let newWishlist
      if (exists) {
        newWishlist = prev.filter((item) => item._id !== product._id)
      } else {
        newWishlist = [...prev, product]
      }
      localStorage.setItem('wishlist', JSON.stringify(newWishlist))
      return newWishlist
    })
  }

  const isWishlisted = (product) =>
    wishlist.some((item) => item._id === product._id)

  const renderProductCard = (product) => (
    <div
      key={product._id}
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 lg:h-64 object-contain"
        />
        <button
          onClick={() => handleWishlistToggle(product)}
          className="absolute top-2 left-2 z-10 bg-white/80 rounded-full p-2 hover:bg-[#f7e0ab] transition-colors"
          aria-label={
            isWishlisted(product) ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          {isWishlisted(product) ? (
            <FaHeart className="text-[#e63946] w-5 h-5" />
          ) : (
            <FaRegHeart className="text-[#2f4f4f] w-5 h-5" />
          )}
        </button>
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-[#2f4f4f]">
            ₹{product.price}
          </span>
          <button
            onClick={() => handleAddToCart(product)}
            className="px-4 py-2 bg-[#2f4f4f] text-white rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
          >
            Add to Cart
          </button>
        </div>
        <Link
          href={`/products/${
            product.product_id?.current || product.product_id || product._id
          }`}
          className="block w-full mt-2 px-4 py-2 bg-[#f7e0ab] text-[#2f4f4f] text-center rounded-lg hover:bg-[#2f4f4f] hover:text-[#f7e0ab] transition-colors text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  )

  // Show toast for 2 seconds
  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  // Modified cart button click handler
  const handleCartButtonClick = () => {
    if (cart.length === 0) {
      showToast('Cart is empty')
    } else {
      setShowCart(true)
    }
  }

  // Only keep this filteredProducts declaration after filtering by collection and category/subcategory
  const filteredProducts = {}
  categories.forEach((category) => {
    if (selectedCategory === category) {
      if (selectedSubcategory === 'all') {
        filteredProducts[category] = filteredByCollection[category]
      } else {
        filteredProducts[category] = filteredByCollection[category].filter(
          (item) => item.subcategory === selectedSubcategory
        )
      }
    }
  })

  return (
    <div className="bg-[url('/images/texture-background.jpg')] bg-repeat pt-20 font-quicksand">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#2f4f4f] text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}
      {/* Floating Cart Button */}
      <button
        ref={cartButtonRef}
        onClick={handleCartButtonClick}
        className={`fixed right-8 bg-[#2f4f4f] text-white p-4 rounded-full shadow-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors z-40 ${
          footerVisible ? 'bottom-32' : 'bottom-8'
        }`}
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

      {/* Floating Wishlist Button */}
      <button
        onClick={() => setShowWishlist(true)}
        className={`fixed right-8 bg-white text-[#e63946] p-4 rounded-full shadow-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors z-40 ${footerVisible ? 'bottom-48' : 'bottom-24'}`}
        style={{ border: '2px solid #e63946' }}
        aria-label="View wishlist"
      >
        <FaHeart className="w-6 h-6" />
        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
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
                <div className="space-y-6">
                  {/* Group cart items by collection */}
                  {Object.entries(
                    cart.reduce((acc, item) => {
                      const collection = item.collection || 'Other'
                      if (!acc[collection]) acc[collection] = []
                      acc[collection].push(item)
                      return acc
                    }, {})
                  ).map(([collection, items]) => (
                    <div key={collection}>
                      <h3 className="text-lg font-semibold text-[#2f4f4f] mb-4">
                        {collection}
                      </h3>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-contain"
                            />
                            <div className="flex-grow">
                              <h3 className="text-sm font-medium text-[#2f4f4f]">
                                {item.name}
                              </h3>
                              <p className="text-sm text-[#2f4f4f]/70">
                                ₹{item.price}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.name, -1)
                                }
                                className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
                              >
                                -
                              </button>
                              <span className="text-[#2f4f4f]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.name, 1)
                                }
                                className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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

      {/* Wishlist Side Panel */}
      {showWishlist && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#2f4f4f]">
                Your Wishlist
              </h2>
              <button
                onClick={() => setShowWishlist(false)}
                className="text-[#2f4f4f] hover:text-[#f7e0ab]"
              >
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {wishlist.length === 0 ? (
                <p className="text-center text-[#2f4f4f]/70">
                  No items in wishlist
                </p>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg"
                    >
                      <Link
                        href={`/products/${item.product_id?.current || item.product_id || item._id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain cursor-pointer"
                        />
                      </Link>
                      <div className="flex-grow">
                        <Link
                          href={`/products/${item.product_id?.current || item.product_id || item._id}`}
                          className="text-sm font-medium text-[#2f4f4f] hover:underline cursor-pointer block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-[#2f4f4f]/70">
                          ₹{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f] mr-2"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleWishlistToggle(item)}
                        className="px-2 py-1 bg-[#e63946] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
                      >
                        <FaHeart className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section id="popular-books" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="cormorant-heading text-[#2f4f4f] heading-underline uppercase tracking-wider">
              Posters
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#2f4f4f]/80 mb-8 mt-8 w-full md:w-1/2 mx-auto">
              Introducing Our New Posters Collection! At JB Khanna Prints, we're
              excited to unveil our latest range of posters — a blend of
              tradition, elegance, and timeless beauty. Each piece is
              thoughtfully curated to add charm and character to any space.
            </p>
          </div>

          {/* Category and Subcategory Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <div key={category} className="relative">
                <button
                  ref={(el) => (categoryButtonRefs.current[category] = el)}
                  onClick={(e) => {
                    setSelectedCategory(category)
                    setSelectedSubcategory('all')
                    if (expandedCategory === category) {
                      setExpandedCategory(null)
                      setDropdownPosition(null)
                    } else {
                      setExpandedCategory(category)
                      // Calculate position for portal dropdown
                      const rect = e.target.getBoundingClientRect()
                      setDropdownPosition({
                        top: rect.bottom + window.scrollY + 8, // 8px margin
                        left: rect.left + rect.width / 2 - 96 + window.scrollX, // center align, 96 = w-48/2
                      })
                    }
                  }}
                  className={`px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-[#f7e0ab] text-[#2f4f4f]'
                      : 'bg-[#2f4f4f]/10 text-[#2f4f4f] hover:bg-[#2f4f4f]/20'
                  }`}
                >
                  {category}
                </button>
                {/* Subcategory dropdown as a portal */}
                {expandedCategory === category &&
                  subcategoriesByCategory[category] &&
                  subcategoriesByCategory[category].length > 0 && (
                    <DropdownPortal
                      position={dropdownPosition}
                      onClose={() => {
                        setExpandedCategory(null)
                        setDropdownPosition(null)
                      }}
                    >
                      <ul className="py-2">
                        <li>
                          <button
                            className={`block w-full text-left px-4 py-2 hover:bg-[#f7e0ab]/40 ${selectedSubcategory === 'all' ? 'font-semibold text-[#2f4f4f]' : 'text-[#2f4f4f]/80'}`}
                            onClick={() => {
                              setSelectedSubcategory('all')
                              setExpandedCategory(null)
                              setDropdownPosition(null)
                            }}
                          >
                            All Subcategories
                          </button>
                        </li>
                        {subcategoriesByCategory[category].map((subcat) => (
                          <li key={subcat}>
                            <button
                              className={`block w-full text-left px-4 py-2 hover:bg-[#f7e0ab]/40 ${selectedSubcategory === subcat ? 'font-semibold text-[#2f4f4f]' : 'text-[#2f4f4f]/80'}`}
                              onClick={() => {
                                setSelectedSubcategory(subcat)
                                setExpandedCategory(null)
                                setDropdownPosition(null)
                              }}
                            >
                              {subcat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </DropdownPortal>
                  )}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation - Hidden on mobile */}
            {/* <div className="hidden lg:block w-64 flex-shrink-0 pr-4 border-r border-gray-200">
              <nav className="sticky top-24">
                <ul className="space-y-2">
                  {Object.keys(filteredProducts).map((category) => (
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
            </div> */}

            <div className="flex-grow lg:pl-8">
              {/* Section content */}
              {Object.entries(filteredProducts).map(
                ([category, categoryProducts]) => (
                  <div
                    key={category}
                    className={`section-content ${
                      activeSection === category ? 'active' : 'hidden'
                    }`}
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
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PostersClient
