import axios from 'axios'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    const response = await axios.post(
      'https://api-seller.shipyaari.com/api/v1/seller/signIn',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return Response.json({ token: response.data.data[0].token })
  } catch (error) {
    return Response.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    )
  }
}
