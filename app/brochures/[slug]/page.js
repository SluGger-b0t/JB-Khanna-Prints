import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import BrochureDetailClient from './BrochureDetailClient'

export const revalidate = 60

async function getBrochure(slug) {
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

export default async function BrochurePage({ params }) {
  const { slug } = await params
  const brochure = await getBrochure(slug)

  if (!brochure) {
    notFound()
  }

  return <BrochureDetailClient brochure={brochure} />
}
