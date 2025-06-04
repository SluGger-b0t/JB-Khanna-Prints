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
      "imageUrl": image.asset->url,
      product_id
    }
  `)

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
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
