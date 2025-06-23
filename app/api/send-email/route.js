import { sendOrderConfirmationEmail } from '@/lib/emailService'

export async function POST(req) {
  try {
    const order = await req.json()
    await sendOrderConfirmationEmail(order)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
