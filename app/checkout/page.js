'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css'

const CheckoutPage = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  })

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }

    loadCartItems()
  }, [])

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    )
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
  }

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id)
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    toast.info('Item removed from cart', { position: 'bottom-right' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTotal = () => {
    const premiumSubtotal = calculateSubtotal(premiumItems)
    const normalSubtotal = calculateSubtotal(normalItems)
    const subtotal = premiumSubtotal + normalSubtotal
    const tax = subtotal * 0.05 // Example tax
    return subtotal + tax
  }

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!', { position: 'bottom-right' })
      return
    }
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zip
    ) {
      toast.error('Please fill in all shipping details.', {
        position: 'bottom-right',
      })
      return
    }

    // Here you would typically send the order to your backend
    console.log('Order Placed:', { cartItems, formData })

    // Clear cart after successful order
    localStorage.removeItem('cart')
    setCartItems([])
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
    })

    toast.success('Order placed successfully!', { position: 'bottom-right' })
    // router.push('/order-confirmation') // Redirect to a confirmation page
  }

  // Separate premium and normal items
  const premiumItems = cartItems.filter((item) => item.category === 'premium ')
  const normalItems = cartItems.filter((item) => item.category !== 'premium ')

  const CartItem = ({ item }) => (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain rounded-md"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-[#2f4f4f]">{item.name}</h3>
          <p className="text-[#2f4f4fcc]">₹{item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
          className="px-3 py-1 bg-[#f7e0ab] text-[#2f4f4f] rounded-md hover:bg-[#f7e0ab]/90 transition-colors"
        >
          -
        </button>
        <span className="text-[#2f4f4f]">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
          className="px-3 py-1 bg-[#f7e0ab] text-[#2f4f4f] rounded-md hover:bg-[#f7e0ab]/90 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => handleRemoveItem(item._id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-white font-quicksand min-h-screen pt-8 sm:pt-12 md:pt-16">
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100 px-4">
        <div className="container mx-auto">
          <h1 className="cormorant-heading text-[#2f4f4f] text-3xl sm:text-4xl md:text-5xl text-center mb-8 md:mb-12 heading-underline">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2f4f4f] mb-6">
                Your Cart
              </h2>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#2f4f4fcc] text-base sm:text-lg mb-4">
                    Your cart is empty.
                  </p>
                  <button
                    onClick={() => router.push('/premium')}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-[#f7e0ab] text-[#2f4f4f] rounded-full hover:bg-[#f7e0ab]/90 transition-colors text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Premium Products Section */}
                  {premiumItems.length > 0 && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#2f4f4f] mb-4">
                        Premium Collection
                      </h3>
                      <div className="space-y-4">
                        {premiumItems.map((item) => (
                          <CartItem key={item._id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Normal Products Section */}
                  {normalItems.length > 0 && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#2f4f4f] mb-4">
                        Regular Collection
                      </h3>
                      <div className="space-y-4">
                        {normalItems.map((item) => (
                          <CartItem key={item._id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2f4f4f] mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 text-[#2f4f4fcc] text-sm sm:text-base">
                {premiumItems.length > 0 && (
                  <div className="flex justify-between">
                    <span>Premium Items Subtotal:</span>
                    <span>₹{calculateSubtotal(premiumItems).toFixed(2)}</span>
                  </div>
                )}
                {normalItems.length > 0 && (
                  <div className="flex justify-between">
                    <span>Regular Items Subtotal:</span>
                    <span>₹{calculateSubtotal(normalItems).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>
                    ₹
                    {(calculateTotal() - calculateSubtotal(cartItems)).toFixed(
                      2
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg sm:text-xl font-bold text-[#2f4f4f] pt-4 border-t border-gray-200">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Information */}
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2f4f4f] mt-8 mb-6">
                Shipping Information
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm sm:text-base font-medium text-[#2f4f4f]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f7e0ab] focus:border-[#f7e0ab] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base font-medium text-[#2f4f4f]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f7e0ab] focus:border-[#f7e0ab] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm sm:text-base font-medium text-[#2f4f4f]"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f7e0ab] focus:border-[#f7e0ab] text-sm sm:text-base"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm sm:text-base font-medium text-[#2f4f4f]"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f7e0ab] focus:border-[#f7e0ab] text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm sm:text-base font-medium text-[#2f4f4f]"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f7e0ab] focus:border-[#f7e0ab] text-sm sm:text-base"
                    />
                  </div>
                </div>
              </form>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full px-6 py-2 sm:px-8 sm:py-3 bg-[#f7e0ab] text-[#2f4f4f] rounded-full hover:bg-[#f7e0ab]/90 transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  )
}

export default CheckoutPage
