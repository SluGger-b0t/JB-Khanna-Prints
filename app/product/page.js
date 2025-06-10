import { client } from '../../sanity/lib/client'
import ProductClient from './ProductClient'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

async function getProducts() {
  const products = await client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      category,
      price,
      description,
      "image": image.asset->url,
      product_id
    }
  `)

  console.log('Fetched products from Sanity:', products)

  // Filter out premium products for this page
  const nonPremiumProducts = products.filter((product) => {
    const category = product.category
      ? product.category.toLowerCase().trim()
      : ''
    return category !== 'premium'
  })

  // Group non-premium products by category
  const productsByCategory = nonPremiumProducts.reduce((acc, product) => {
    const category = product.category || 'uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {})

  return productsByCategory
}

export default async function Page() {
  const products = await getProducts()
  return <ProductClient products={products} />
}
