'use client'
import React, { useState, useEffect } from 'react'
import styles from './checkout.module.css'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient' // Import supabase client
import { getCart, clearCart } from '@/lib/cart'

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('virtual')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    deliveryPincode: '',
  })
  const router = useRouter()

  useEffect(() => {
    // Initialize anonymous session
    const initializeSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) console.error('Anonymous sign-in failed:', error)
      }
    }

    initializeSession()

    // Get cart items
    const savedCart = getCart()
    if (savedCart.length > 0) {
      // Ensure each item has the correct image URL
      const processedCart = savedCart.map((item) => ({
        ...item,
        image: item.image || item.imageUrl, // Handle both image and imageUrl properties
      }))
      setCartItems(processedCart)
      // Calculate total directly from the numeric price values
      const total = processedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      setTotal(total)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMakePayment = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleConfirmPay = async () => {
    setIsProcessing(true)

    try {
      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Session not available')
      }
      const userId = session?.user?.id
      if (!userId) throw new Error('User ID not found')

      // Calculate order values
      const shipping = 100
      const tax = total * 0.18
      const totalAmount = total + shipping + tax

      // Create order object
      const order = {
        customer_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shipping_address: formData.address,
        user_id: userId,
        total: total + 100 + total * 0.18,
        payment_method: selectedPayment,
        status: 'pending',
        items: cartItems.map((item) => ({
          name: item.name,
          category: item.category || 'General',
          product_id: item.product_id || '',
          description: item.description || '',
          price: item.price,
          quantity: item.quantity,
          image: item.image || '',
        })),
        shipping: 100,
        tax: total * 0.18,
        subtotal: total,
      }

      // Insert into Supabase
      const { data: insertedOrder, error } = await supabase
        .from('orders')
        .insert(order)
        .select()

      if (error) {
        console.error('Supabase insert error:', error)
        throw error
      }

      // Send confirmation email
      let emailStatus = 'success'
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        })
      } catch (e) {
        emailStatus = 'error'
      }

      // Clear cart and redirect
      clearCart()
      router.push(`/thank-you?emailStatus=${emailStatus}`)
    } catch (error) {
      console.error('Order submission failed:', error)
      alert('Order failed: ' + error.message)
    } finally {
      setIsProcessing(false)
      setShowModal(false)
    }
  }

  // Add handler for box info fields per cart item
  const handleBoxInfoChange = (index, field, value) => {
    setCartItems((prev) => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        [field]: value,
      }
      return updated
    })
  }

  return (
    <div className={styles.checkoutContainer}>
      <button
        className={styles.goBackButton}
        onClick={() => router.push('/product')}
      >
        ← Go Back
      </button>
      <div className={styles.checkoutWrapper}>
        {/* Left Section - Personal Details */}
        <div className={styles.leftSection}>
          <h1 className={styles.title}>Checkout</h1>

          {/* Personal Details Form */}
          <div className={styles.formSection}>
            <h2>Personal Details</h2>
            <form className={styles.form} onSubmit={handleMakePayment}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your delivery address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="deliveryPincode">Delivery Pincode</label>
                <input
                  type="text"
                  id="deliveryPincode"
                  name="deliveryPincode"
                  placeholder="Enter delivery pincode"
                  required
                  value={formData.deliveryPincode}
                  onChange={handleInputChange}
                />
              </div>
              {/* Per-product box info */}
              <button type="submit" className={styles.makePaymentButton}>
                Make Payment
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className={styles.rightSection}>
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>

            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>₹{item.price}</p>
                    <p className={styles.itemQuantity}>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className={styles.summaryItem}>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Shipping</span>
              <span>₹100</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Tax</span>
              <span>₹{(total * 0.18).toFixed(2)}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{(total + 100 + total * 0.18).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.paymentModal}>
            <h2 className={styles.modalTitle}>Payment Method</h2>
            <p className={styles.modalSubtitle}>
              Select your payment method before proceeding
            </p>
            <div className={styles.paymentOptionsModal}>
              <div
                className={`${styles.paymentOptionModal} ${
                  selectedPayment === 'virtual' ? styles.selectedPayment : ''
                }`}
                onClick={() => setSelectedPayment('virtual')}
              >
                <div className={styles.paymentIcon}>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 21h18M4 21V9l8-5 8 5v12M9 21v-6h6v6"
                    />
                  </svg>
                </div>
                <div>
                  <div className={styles.paymentLabel}>Virtual Payment</div>
                  <div className={styles.paymentDesc}>
                    Net Banking Debit/Credit UPI Net Banking
                  </div>
                </div>
              </div>
              <div
                className={`${styles.paymentOptionModal} ${
                  selectedPayment === 'cod' ? styles.selectedPayment : ''
                }`}
                onClick={() => setSelectedPayment('cod')}
              >
                <div className={styles.paymentIcon}>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 16V6a1 1 0 011-1h9v11m-10 0h10m-10 0a2 2 0 104 0m6 0a2 2 0 104 0m-4 0h4m0 0h2v-4l-3-4h-3v8z"
                    />
                  </svg>
                </div>
                <div>
                  <div className={styles.paymentLabel}>Cash on Delivery</div>
                  <div className={styles.paymentDesc}>
                    Pay once your order arrives at your doorstep
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmPay}
              >
                Confirm & Pay
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
