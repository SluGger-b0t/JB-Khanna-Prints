import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import PageHero from '@/components/PageHero'

export const revalidate = 60

async function getCatalogs() {
  const query = `*[_type == "brochure"] | order(title asc) {
    _id,
    title,
    description,
    "slug": slug.current,
    "products": products[]-> {
      _id,
      name,
      "image": image.asset->url
    }
  }`
  return client.fetch(query)
}

export default async function CatalogsPage() {
  const catalogs = await getCatalogs()

  return (
    <div className="bg-white font-quicksand">
      <PageHero
        kicker="Catalogs & Guides"
        title="Catalogs"
        description="Preview and download our printable catalogs for a closer look at select collections — perfect for browsing offline or sharing with someone else."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {catalogs.length === 0 ? (
            <p className="text-center text-[#2f4f4f]/60">
              No catalogs are available yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {catalogs.map((catalog) => (
                <div
                  key={catalog._id}
                  className="bg-cream rounded-2xl border border-[#2f4f4f]/10 p-6 flex flex-col"
                >
                  <h3 className="font-cormorant text-xl font-semibold text-[#2f4f4f] mb-2">
                    {catalog.title}
                  </h3>
                  {catalog.description && (
                    <p className="text-sm text-[#2f4f4f]/70 mb-4 leading-relaxed">
                      {catalog.description}
                    </p>
                  )}

                  {catalog.products?.length > 0 && (
                    <div className="mb-5">
                      <div className="flex -space-x-3 mb-2">
                        {catalog.products.slice(0, 5).map((product) => (
                          <div
                            key={product._id}
                            className="w-12 h-12 rounded-full border-2 border-cream bg-white overflow-hidden shrink-0"
                            title={product.name}
                          >
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                        {catalog.products.length > 5 && (
                          <div className="w-12 h-12 rounded-full border-2 border-cream bg-[#2f4f4f] text-[#f7e0ab] text-xs flex items-center justify-center shrink-0">
                            +{catalog.products.length - 5}
                          </div>
                        )}
                      </div>
                      <p className="text-xs uppercase tracking-wide text-[#2f4f4f]/50">
                        {catalog.products.length} product
                        {catalog.products.length === 1 ? '' : 's'} inside
                      </p>
                    </div>
                  )}

                  <Link
                    href={`/catalogs/${catalog.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2f4f4f] text-white rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm font-medium"
                  >
                    View Catalog
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
