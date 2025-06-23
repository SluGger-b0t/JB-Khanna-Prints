import axios from 'axios'

function mapOrderToShipyaari(order) {
  return {
    pickupDetails: {
      addressType: 'warehouse',
      fullAddress:
        order.pickupAddress || '201  Goregaon West, Mumbai, Maharashtra 400062',
      pincode: order.pickupPincode || 110010,
      startTime: '08',
      endTime: '09',
      latitude: order.pickupLat || '17.567',
      longitude: order.pickupLng || '19.454',
      contact: {
        name: order.pickupContactName || 'atul',
        mobileNo: order.pickupContactMobile || 1234567890,
        alternateMobileNo: order.pickupContactAltMobile || 1234567890,
      },
    },
    deliveryDetails: {
      addressType: 'warehouse',
      fullAddress: order.address,
      pincode: order.pincode || 400064,
      startTime: '10',
      endTime: '11',
      latitude: order.deliveryLat || '19.0697',
      longitude: order.deliveryLng || '16.1234',
      contact: {
        name: order.customer_name,
        mobileNo: order.phone,
        alternateMobileNo: order.phone,
      },
      gstNumber: order.gstNumber || '27AALCA5307N1ZC',
    },
    boxInfo: [
      {
        name: 'box_1',
        type: 'parcel',
        weightUnit: 'Kg',
        deadWeight: order.weight || 2,
        length: order.length || 1,
        breadth: order.breadth || 1,
        height: order.height || 1,
        qty: 1,
        discount: 0,
        measureUnit: 'cm',
        products: order.items.map((item) => ({
          name: item.name,
          category: item.category || 'General',
          sku: item.sku || '',
          hsnCode: item.hsnCode || '',
          qty: item.quantity,
          unitPrice: item.price,
          discount: 0,
          unitTax: 0,
          sellingPrice: item.price,
          totalDiscount: 0,
          totalPrice: item.price * item.quantity,
          weightUnit: 'kg',
          deadWeight: 1,
          length: 1,
          breadth: 1,
          height: 1,
          measureUnit: 'cm',
          images: [],
        })),
        codInfo: {
          isCod: order.payment_method === 'cod',
          collectableAmount: order.payment_method === 'cod' ? order.total : 0,
          invoiceValue: order.total,
        },
        podInfo: {
          isPod: false,
        },
        insurance: false,
      },
    ],
    orderType: 'B2C',
    transit: 'FORWARD',
    courierPartner: '',
    courierPartnerServices: '',
    serviceMode: 'AIR',
    giftCharges: 0,
    shippingCharges: 0,
    transactionCharges: 0,
    advanceAmountPaid: 0,
    servicePriority: 'cheapest',
    source: '',
    qcType: 'DoorStep',
    returnReason: '',
    orderFutureDate: '',
    pickupDate: '',
    gstNumber: order.gstNumber || '27AALCA5307N1ZC',
    childGstNumber: order.childGstNumber || '27AALCA5307N1ZC',
    parentId: 1,
    childId: 2,
    orderId: order.order_id,
    eWayBillNo: '',
    brandName: order.brandName || 'Google',
    brandLogo:
      order.brandLogo ||
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/250px-Google_2015_logo.svg.png',
  }
}

export async function POST(req) {
  try {
    const url = new URL(req.url, 'http://localhost')
    const isDraft = url.searchParams.get('draft') === '1'
    const order = await req.json()
    const shipyaariOrder = mapOrderToShipyaari(order)
    const endpoint = isDraft
      ? 'https://api-seller.shipyaari.com/api/v1/order/placeDraftOrderApi'
      : 'https://api-seller.shipyaari.com/api/v1/order/placeOrderApiV3'
    const response = await axios.post(endpoint, shipyaariOrder, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SHIPYAARI_API_TOKEN}`,
      },
    })
    return Response.json(response.data)
  } catch (error) {
    console.error('Shipyaari API error:', error.response?.data || error.message)
    return Response.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    )
  }
}
