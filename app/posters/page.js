import { client } from '../../sanity/lib/client'
import PostersClient from './PostersClient'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

async function getProducts() {
  const products = await client.fetch(`
    *[_type == "product" && (collection match "posters" || collection match "Posters")] {
      _id,
      _createdAt,
      name,
      category,
      price,
      description,
      "image": image.asset,
      product_id,
      subcategory,
      collection
    }
  `)

  // Generate image URLs for each product
  const productsWithUrls = products.map((product) => ({
    ...product,
    image: urlFor(product.image).url(),
  }))

  // Group products by category
  const productsByCategory = productsWithUrls.reduce((acc, product) => {
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
  return <PostersClient products={products} />
}
