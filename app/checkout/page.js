'use client'
import React, { useState, useEffect } from 'react'
import styles from './checkout.module.css'
import { useRouter } from 'next/navigation'

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('virtual')
  const router = useRouter()

  useEffect(() => {
    // Get cart items from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)
      // Calculate total
      const calculatedTotal = parsedCart.reduce(
        (sum, item) =>
          sum +
          parseInt(item.price.replace('₹', '').replace(',', '')) *
            item.quantity,
        0
      )
      setTotal(calculatedTotal)
    }
  }, [])

  const handleMakePayment = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleConfirmPay = () => {
    setShowModal(false)
    // Add payment logic here
    alert(
      `Payment method: ${
        selectedPayment === 'virtual' ? 'Virtual Payment' : 'Cash on Delivery'
      }`
    )
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
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  placeholder="Enter your delivery address"
                  required
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
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{item.price}</p>
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
