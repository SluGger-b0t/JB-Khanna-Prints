'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './thank-you.module.css'

const ThankYouPage = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Order Placed Successfully!</h1>
        <p className={styles.message}>
          Thank you for your purchase. We have received your order and will
          process it shortly.
        </p>
        <div className={styles.details}>
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
          <p>You can track your order status in your account.</p>
        </div>
        <button
          onClick={() => router.push('/product')}
          className={styles.button}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default ThankYouPage
