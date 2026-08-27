import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import CatalogDetailClient from './CatalogDetailClient'

export const revalidate = 60

async function getCatalog(slug) {
  const query = `*[_type == "brochure" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "pdfUrl": pdf.asset->url,
    "pdfFilename": pdf.asset->originalFilename,
    "products": products[]-> {
      _id,
      _createdAt,
      name,
      category,
      description,
      price,
      product_id,
      "image": image.asset->url
    }
  }`
  return client.fetch(query, { slug })
}

export default async function CatalogPage({ params }) {
  const { slug } = await params
  const catalog = await getCatalog(slug)

  if (!catalog) {
    notFound()
  }

  return <CatalogDetailClient catalog={catalog} />
}
