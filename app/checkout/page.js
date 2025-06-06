'use client'
import React, { useState, useEffect } from 'react'
import styles from './checkout.module.css'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient' // Import supabase client

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
    city: '',
    state: '',
    pincode: '',
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
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)
      // Calculate total directly from the numeric price values
      const total = parsedCart.reduce(
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

      // Calculate order values
      const shipping = 100
      const tax = total * 0.18
      const totalAmount = total + shipping + tax

      // Create order object
      const order = {
        user_id: session.user.id,
        customer_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shipping_address: formData.address,
        items: cartItems,
        subtotal: total,
        shipping: shipping,
        tax: tax,
        total: totalAmount,
        payment_method: selectedPayment,
        status: 'pending',
      }

      // Insert into Supabase
      const { data: insertedOrder, error } = await supabase
        .from('orders')
        .insert(order)
        .select()

      if (error) throw error

      // Send order confirmation email via API route
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(insertedOrder[0]),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error(
            'Failed to send order confirmation email:',
            errorData.message
          )
          // Optionally handle different error statuses
        }
      } catch (emailError) {
        console.error('Error calling email API route:', emailError)
        // Continue with the order process even if email API call fails
      }

      // Clear cart and redirect
      localStorage.removeItem('cart')
      router.push('/thank-you')
    } catch (error) {
      console.error('Order submission failed:', error)
      alert('Order failed: ' + error.message)
    } finally {
      setIsProcessing(false)
      setShowModal(false)
    }
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
                    src={item.imageUrl}
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
                <div className={styles.paymentIcon}>🏦</div>
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
                <div className={styles.paymentIcon}>🚚</div>
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
