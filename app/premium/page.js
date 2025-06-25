'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const PremiumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // First, let's check all products to see what categories exist
        const allProductsQuery = `*[_type == "product"] {
          _id,
          name,
          category,
          description,
          price,
          "image": image.asset->url,
          product_id
        }`

        const allProducts = await client.fetch(allProductsQuery)
        console.log('All products:', allProducts)

        // Let's check what categories exist in the products
        const categories = [...new Set(allProducts.map((p) => p.category))]
        console.log('Available categories:', categories)

        // Now fetch premium products - trying both exact match and case-insensitive
        const query = `*[_type == "product" && (category match "premium" || category match "Premium")] {
          _id,
          name,
          category,
          description,
          price,
          "image": image.asset->url,
          product_id
        }`

        const productsData = await client.fetch(query)
        console.log('Premium products:', productsData)

        setProducts(productsData)
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

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'religious', name: 'Religious Art' },
    { id: 'holographic', name: 'Holographic' },
    { id: 'gold-foil', name: 'Gold Foil' },
  ]

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory)

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

      {/* Categories */}
      <section className="py-12 bg-gray-100 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-[#f7e0ab] text-[#2f4f4f]'
                    : 'bg-[#2f4f4f]/10 text-[#2f4f4f] hover:bg-[#2f4f4f]/20'
                }
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
      <ToastContainer />
    </div>
  )
}

export default PremiumPage
