// app/thank-you/ThankYouClient.js
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './thank-you.module.css';

const ThankYouClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailStatus = searchParams.get('emailStatus');

  let message = '';
  let subMessage = '';

  if (emailStatus === 'error') {
    message = 'Order Placed, But Confirmation Email Failed';
    subMessage =
      'There was an issue sending the confirmation email. Your order has been placed successfully and will be processed shortly.';
  } else if (emailStatus === 'success') {
    message = 'Order Placed Successfully!';
    subMessage =
      'A confirmation email has been sent to your registered email address.';
  } else {
    message = 'Order Placed Successfully!';
    subMessage = 'We have received your order and will process it shortly.';
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>{message}</h1>
        <p className={styles.message}>{subMessage}</p>

        <div className={styles.details}>
          {emailStatus === 'error' ? (
            <p>
              If you need help or would like us to resend the email, please{' '}
              <a href="/contact">contact support</a>.
            </p>
          ) : (
            <>
              <p>
                A confirmation email has been sent to your registered email
                address.
              </p>
              <p>You can track your order status in your account.</p>
            </>
          )}
        </div>

        <button
          onClick={() => router.push('/product')}
          className={styles.button}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouClient;
