 import nodemailer from 'nodemailer'
 import { NextResponse } from 'next/server'

 // Create a transporter using SMTP (should ideally be initialized once outside the handler)
 const transporter = nodemailer.createTransport({
   host: process.env.SMTP_HOST,
   port: process.env.SMTP_PORT,
   secure: true,
   auth: {
     user: process.env.SMTP_USER,
     pass: process.env.SMTP_PASSWORD,
   },
 })

 export async function POST(request) {
   try {
     const order = await request.json()

     // Send order confirmation email
     const mailOptions = {
       from: process.env.SMTP_FROM_EMAIL,
       to: order.email,
       subject: `Order Confirmation - Order #${order.id.slice(0, 8)}`,
       html: `
        <h1>Thank you for your order!</h1>
        <p>Dear ${order.customer_name},</p>
        <p>We have received your order and it is being processed. Here are your order details:</p>

        <h2>Order Summary</h2>
        <p>Order ID: #${order.id.slice(0, 8)}</p>
        <p>Order Date: ${new Date(order.created_at).toLocaleDateString()}</p>
        <p>Total Amount: ₹${order.total}</p>

        <h2>Order Items</h2>
        ${order.items
          .map(
            (item) => `
          <div>
            <p>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price}</p>
          </div>
        `
          )
          .join('')}

        <h2>Shipping Details</h2>
        <p>Address: ${order.shipping_address}</p>

        <p>Thank you for shopping with us!</p>
      `,
     }

     await transporter.sendMail(mailOptions)

     return NextResponse.json(
       { message: 'Email sent successfully' },
       { status: 200 }
     )
   } catch (error) {
     console.error('Error sending order confirmation email via API:', error)
     return NextResponse.json(
       { message: 'Failed to send email', error: error.message },
       { status: 500 }
     )
   }
 }
