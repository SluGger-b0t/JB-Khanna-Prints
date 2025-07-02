'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { Toaster, toast } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
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

const PremiumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [categories, setCategories] = useState([])
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({})
  const router = useRouter()
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const categoryButtonRefs = useRef({})
  const [wishlist, setWishlist] = useState([])
  const [showWishlist, setShowWishlist] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all premium products with category and subcategory
        const query = `*[_type == "product" && (collection match "premium" || collection match "Premium")] {
          _id,
          name,
          category,
          subcategory,
          description,
          price,
          "image": image.asset->url,
          product_id
        }`
        const productsData = await client.fetch(query)
        setProducts(productsData)

        // Build categories and subcategories
        const categorySet = new Set()
        const subcatMap = {}
        productsData.forEach((p) => {
          if (p.category) {
            categorySet.add(p.category)
            if (!subcatMap[p.category]) subcatMap[p.category] = new Set()
            if (p.subcategory) subcatMap[p.category].add(p.subcategory)
          }
        })
        const categoriesArr = ['all', ...Array.from(categorySet)]
        setCategories(categoriesArr)
        // Convert subcatMap values to arrays
        const subcatObj = {}
        Object.keys(subcatMap).forEach((cat) => {
          subcatObj[cat] = Array.from(subcatMap[cat])
        })
        setSubcategoriesByCategory(subcatObj)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    // Load wishlist from localStorage on mount
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id)
      const newCart = existing
        ? prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prevCart,
            { ...product, quantity: 1, category: product.category || 'normal' },
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

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + delta } : item
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
          onClick={() => handleQuantityChange(item._id, -1)}
          className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
        >
          -
        </button>
        <span className="text-[#2f4f4f]">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item._id, 1)}
          className="px-2 py-1 bg-[#2f4f4f] text-white rounded hover:bg-[#f7e0ab] hover:text-[#2f4f4f]"
        >
          +
        </button>
      </div>
    </div>
  )

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

  // Filter products by category and subcategory
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true
    if (selectedSubcategory === 'all')
      return product.category === selectedCategory
    return (
      product.category === selectedCategory &&
      product.subcategory === selectedSubcategory
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/images/texture-background.jpg')] bg-repeat flex items-center justify-center">
        <div className="text-[#f7e0ab] text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
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
                      <h3 className="text-md font-semibold text-[#2f4f4f] mb-2">
                        {collection}
                      </h3>
                      {items.map((item) => (
                        <CartItemPreview key={item._id} item={item} />
                      ))}
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
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowCart(false)
                  router.push('/checkout')
                }}
                className="w-full py-3 bg-[#2f4f4f] text-white rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Wishlist Button */}
      <button
        onClick={() => setShowWishlist(true)}
        className={`fixed right-8 bg-white text-[#e63946] p-4 rounded-full shadow-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors z-40 bottom-24`}
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

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2f4f4f] to-[#426969] opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/images/texture-background.jpg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="cormorant-heading text-[#f7e0ab] text-5xl md:text-6xl mb-6">
            Premium Collection
          </h1>
          <p className="text-[#f7e0abcc] text-lg md:text-xl max-w-2xl mx-auto">
            Discover our exclusive range of premium prints, featuring
            handcrafted masterpieces and limited edition artworks that embody
            the perfect blend of tradition and innovation.
          </p>
        </div>
      </section>

      {/* Categories and Subcategories */}
      <section className="py-12 bg-gray-100 backdrop-blur-sm z-30">
        <div className="container mx-auto px-4 overflow-visible relative">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
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
                  {category === 'all' ? 'All Categories' : category}
                </button>
                {/* Subcategory dropdown as a portal */}
                {category !== 'all' &&
                  expandedCategory === category &&
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible relative z-0">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden relative z-[1]"
              >
                <div className="relative z-[1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 lg:h-64 object-contain"
                  />
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-2 left-2 z-10 bg-white/80 rounded-full p-2 hover:bg-[#f7e0ab] transition-colors"
                    aria-label={
                      isWishlisted(product)
                        ? 'Remove from wishlist'
                        : 'Add to wishlist'
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
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-[#2f4f4f]">
                      ₹{product.price}
                    </span>
                    <div className="flex space-x-2">
                      <Link href={`/products/${product.product_id.current}`}>
                        <button className="px-4 py-1 bg-[#2f4f4f]/10 text-[#2f4f4f] text-sm rounded-full hover:bg-[#2f4f4f]/20 transition-all duration-300">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-1 bg-[#f7e0ab] text-[#2f4f4f] text-sm rounded-full hover:bg-[#f7e0ab]/90 transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#f7e0ab]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2f4f4f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f4f4f] mb-2">
                Authenticity Guaranteed
              </h3>
              <p className="text-[#2f4f4f]">
                Each piece comes with a certificate of authenticity
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#f7e0ab]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2f4f4f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f4f4f] mb-2">
                Premium Packaging
              </h3>
              <p className="text-[#2f4f4f]">
                Luxurious packaging with protective materials
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-[#f7e0ab]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2f4f4f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f4f4f] mb-2">
                Limited Editions
              </h3>
              <p className="text-[#2f4f4f]">
                Exclusive pieces with limited availability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="cormorant-heading text-[#2f4f4f] text-3xl md:text-4xl mb-6">
            Experience Premium Artistry
          </h2>
          <p className="text-[#2f4f4f] max-w-2xl mx-auto mb-8">
            Join our exclusive community of art enthusiasts and be the first to
            know about new premium collections and special offers.
          </p>
          <button className="px-8 py-3 bg-[#f7e0ab] text-[#2f4f4f] rounded-full hover:bg-[#f7e0ab]/90 transition-all duration-300 text-lg font-medium">
            Contact Us for Custom Orders
          </button>
        </div>
      </section>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default PremiumPage
