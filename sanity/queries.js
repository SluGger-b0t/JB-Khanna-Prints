export const premiumProductsQuery = `*[_type == "premiumProduct"] {
  _id,
  name,
  category,
  description,
  price,
  "image": image.asset->url,
  features,
  slug
}`

export const categoriesQuery = `*[_type == "category"] {
  _id,
  name,
  "id": slug.current
}`
