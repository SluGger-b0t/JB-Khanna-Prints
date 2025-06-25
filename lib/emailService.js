import nodemailer from 'nodemailer'

// For Gmail: Use an App Password (not your regular password) if 2FA is enabled.
// See: https://support.google.com/accounts/answer/185833?hl=en
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.gmail.com
  port: process.env.SMTP_PORT, // 465
  secure: true, // true for port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER, // your@gmail.com
    pass: process.env.SMTP_PASSWORD, // Gmail App Password
  },
})

// Send order confirmation email
export const sendOrderConfirmationEmail = async (order) => {
  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: order.email,
    subject: `Order Confirmation - Order #${order.id?.slice(0, 8)}`,
    html: `
      <div style="font-family: 'Quicksand', Arial, sans-serif; background: #f7e0ab; padding: 32px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 16px rgba(47,79,79,0.08); overflow: hidden;">
          <div style="background: #2f4f4f; padding: 24px 0; text-align: center;">
            <img src='https://jbkhannaprints.in/images/main-logo%20(2).png' alt='JB Khanna Prints' style='height: 60px; margin-bottom: 8px;' />
            <h1 style="color: #f7e0ab; font-family: 'Cormorant Garamond', serif; font-size: 2rem; margin: 0;">Thank you for your order!</h1>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 1.1rem; color: #2f4f4f;">Dear <b>${order.customer_name}</b>,</p>
            <p style="color: #2f4f4f;">We have received your order and it is being processed. Here are your order details:</p>
            <div style="margin: 24px 0;">
              <h2 style="color: #2f4f4f; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; margin-bottom: 8px;">Order Summary</h2>
              <p style="margin: 0; color: #2f4f4f;">Order ID: <b>#${order.id?.slice(0, 8)}</b></p>
              <p style="margin: 0; color: #2f4f4f;">Order Date: <b>${order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}</b></p>
              <p style="margin: 0; color: #2f4f4f;">Total Amount: <b>₹${order.total}</b></p>
            </div>
            <div style="margin: 24px 0;">
              <h2 style="color: #2f4f4f; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; margin-bottom: 8px;">Order Items</h2>
              <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background: #f7e0ab; color: #2f4f4f;">
                    <th style="padding: 10px; text-align: left; font-size: 1rem;">Image</th>
                    <th style="padding: 10px; text-align: left; font-size: 1rem;">Product</th>
                    <th style="padding: 10px; text-align: left; font-size: 1rem;">Quantity</th>
                    <th style="padding: 10px; text-align: left; font-size: 1rem;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items
                    ?.map(
                      (item) => `
                        <tr style="border-bottom: 1px solid #eee;">
                          <td style="padding: 10px;"><img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; object-fit: contain; border-radius: 6px; border: 1px solid #eee; background: #fff;" /></td>
                          <td style="padding: 10px; color: #2f4f4f; font-weight: 600;">${item.name}</td>
                          <td style="padding: 10px; color: #2f4f4f;">${item.quantity}</td>
                          <td style="padding: 10px; color: #2f4f4f;">₹${item.price}</td>
                        </tr>
                      `
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
            <div style="margin: 24px 0;">
              <h2 style="color: #2f4f4f; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; margin-bottom: 8px;">Shipping Details</h2>
              <p style="color: #2f4f4f;">${order.shipping_address}</p>
            </div>
            <p style="color: #2f4f4f; margin-top: 32px;">Thank you for shopping with us!<br/> <b>JB Khanna Prints Team</b></p>
          </div>
          <div style="background: #2f4f4f; color: #f7e0ab; text-align: center; padding: 16px; font-size: 0.95rem;">
            &copy; ${new Date().getFullYear()} JB Khanna Prints. All rights reserved.
          </div>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    throw error
  }
}
