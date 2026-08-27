'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { Toaster, toast } from 'react-hot-toast'
import FeaturesSection from '@/components/FeaturesSection'
import ProductCard from '@/components/ProductCard'
import {
  addToCart,
  getWishlist,
  setWishlist as saveWishlist,
} from '@/lib/cart'

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null)
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const { slug } = React.use(params)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productQuery = `*[_type == "product" && product_id.current == "${slug}"][0] {
          _id,
          name,
          category,
          description,
          price,
          "image": image.asset->url,
          product_id,
          dimensions,
          material,
          technique,
          year
        }`
        const fetchedProduct = await client.fetch(productQuery)
        setProduct(fetchedProduct)

        if (fetchedProduct?.category) {
          const suggestedQuery = `*[_type == "product" && category == "${fetchedProduct.category}" && _id != "${fetchedProduct._id}"] {
            _id,
            _createdAt,
            name,
            category,
            description,
            price,
            "image": image.asset->url,
            product_id
          }[0...4]`
          const fetchedSuggested = await client.fetch(suggestedQuery)
          setSuggestedProducts(fetchedSuggested)
        }
      } catch (error) {
        console.error('Error fetching product details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProductDetails()
    }
    setWishlist(getWishlist())
  }, [slug])

  const handleAddToCart = (item) => {
    addToCart(item)
    toast.success(`${item.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
    })
  }

  const handleWishlistToggle = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w._id === item._id)
      const newWishlist = exists
        ? prev.filter((w) => w._id !== item._id)
        : [...prev, item]
      saveWishlist(newWishlist)
      return newWishlist
    })
  }

  const isWishlisted = (item) => wishlist.some((w) => w._id === item._id)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#2f4f4f] text-lg">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#2f4f4f] text-lg">Product not found.</div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white">
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative w-full max-w-md mx-auto aspect-square bg-cream border border-[#2f4f4f]/10 p-6">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    priority
                  />
                )}
              </div>

              <div className="space-y-6 text-center md:text-left">
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#2f4f4f]/50 mb-2">
                    {product.category}
                  </p>
                  <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2f4f4f] mb-4">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-semibold text-[#2f4f4f]">
                    ₹{product.price}
                  </p>
                </div>

                <p className="text-[#2f4f4f]/70 leading-relaxed">
                  {product.description}
                </p>

                <div className="border-t border-[#2f4f4f]/10 pt-6">
                  <h3 className="text-sm uppercase tracking-wider text-[#2f4f4f]/50 mb-4">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    {product.dimensions && (
                      <div>
                        <p className="text-xs text-[#2f4f4f]/50">Dimensions</p>
                        <p className="text-[#2f4f4f] font-medium text-sm">
                          {product.dimensions}
                        </p>
                      </div>
                    )}
                    {product.material && (
                      <div>
                        <p className="text-xs text-[#2f4f4f]/50">Material</p>
                        <p className="text-[#2f4f4f] font-medium text-sm">
                          {product.material}
                        </p>
                      </div>
                    )}
                    {product.technique && (
                      <div>
                        <p className="text-xs text-[#2f4f4f]/50">Technique</p>
                        <p className="text-[#2f4f4f] font-medium text-sm">
                          {product.technique}
                        </p>
                      </div>
                    )}
                    {product.year && (
                      <div>
                        <p className="text-xs text-[#2f4f4f]/50">Year</p>
                        <p className="text-[#2f4f4f] font-medium text-sm">
                          {product.year}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2 justify-center md:justify-start">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-8 py-3 bg-[#2f4f4f] text-white rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-all duration-300 text-base font-medium"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`px-6 py-3 rounded-full border transition-all duration-300 text-sm font-medium ${
                      isWishlisted(product)
                        ? 'border-[#e63946] text-[#e63946]'
                        : 'border-[#2f4f4f]/20 text-[#2f4f4f] hover:border-[#2f4f4f]'
                    }`}
                  >
                    {isWishlisted(product) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        {suggestedProducts.length > 0 && (
          <section className="py-16 md:py-20 px-4 bg-white">
            <div className="container mx-auto">
              <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-[#2f4f4f] mb-10 text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {suggestedProducts.map((item) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    isWishlisted={isWishlisted(item)}
                    onToggleWishlist={handleWishlistToggle}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <Toaster position="bottom-right" />
    </>
  )
}

export default ProductPage
