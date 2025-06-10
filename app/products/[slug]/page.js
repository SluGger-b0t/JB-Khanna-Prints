'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null)
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const resolvedParams = React.use(params)
  const { slug } = resolvedParams

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
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return

    console.log('Product being added to cart:', product)

    // Get existing cart items from localStorage
    const existingCart = localStorage.getItem('cart')
    const cartItems = existingCart ? JSON.parse(existingCart) : []

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    )

    if (existingItemIndex > -1) {
      // If product exists, increase quantity
      cartItems[existingItemIndex].quantity += 1
    } else {
      // If product doesn't exist, add it with quantity 1
      cartItems.push({
        ...product,
        quantity: 1,
        category: product.category || 'normal',
        image: product.image === '' ? null : product.image, // Ensure image is null if empty string
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems))

    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

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
    <div className="bg-white">
      {/* Product Details Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Image */}
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-lg overflow-hidden shadow-lg">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  priority
                />
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <div>
                <h1 className="cormorant-heading text-[#2f4f4f] text-3xl sm:text-4xl md:text-5xl mb-2">
                  {product.name}
                </h1>
                <p className="text-[#2f4f4f]/70 text-sm sm:text-base mb-4">
                  {product.category}
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-[#2f4f4f] mb-6">
                  ₹{product.price}
                </p>
              </div>

              {/* Product Description */}
              <div className="prose prose-sm max-w-none mx-auto md:mx-0">
                <p className="text-[#2f4f4f] text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Specifications */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2f4f4f] mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {product.dimensions && (
                    <div>
                      <p className="text-sm text-[#2f4f4f]/70">Dimensions</p>
                      <p className="text-[#2f4f4f] font-medium text-sm sm:text-base">
                        {product.dimensions}
                      </p>
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <p className="text-sm text-[#2f4f4f]/70">Material</p>
                      <p className="text-[#2f4f4f] font-medium text-sm sm:text-base">
                        {product.material}
                      </p>
                    </div>
                  )}
                  {product.technique && (
                    <div>
                      <p className="text-sm text-[#2f4f4f]/70">Technique</p>
                      <p className="text-[#2f4f4f] font-medium text-sm sm:text-base">
                        {product.technique}
                      </p>
                    </div>
                  )}
                  {product.year && (
                    <div>
                      <p className="text-sm text-[#2f4f4f]/70">Year</p>
                      <p className="text-[#2f4f4f] font-medium text-sm sm:text-base">
                        {product.year}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-[#f7e0ab] text-[#2f4f4f] rounded-full hover:bg-[#f7e0ab]/90 transition-all duration-300 text-base font-medium shadow-md"
                >
                  Add to Cart
                </button>
                <button className="flex-1 px-6 py-3 border border-[#2f4f4f] text-[#2f4f4f] rounded-full hover:bg-[#2f4f4f]/5 transition-all duration-300 text-base font-medium">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2f4f4f] mb-8 text-center">
            Product Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#f7e0ab]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#2f4f4f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#2f4f4f] mb-2">
                Authenticity Guaranteed
              </h3>
              <p className="text-[#2f4f4f]/70 text-sm">
                Each piece comes with a certificate of authenticity
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#f7e0ab]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#2f4f4f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#2f4f4f] mb-2">
                Premium Packaging
              </h3>
              <p className="text-[#2f4f4f]/70 text-sm">
                Luxurious packaging with protective materials
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#f7e0ab]/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#2f4f4f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#2f4f4f] mb-2">
                Limited Editions
              </h3>
              <p className="text-[#2f4f4f]/70 text-sm">
                Exclusive pieces with limited availability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#2f4f4f] mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {suggestedProducts.map((item) => (
                <Link
                  href={`/products/${item.product_id.current}`}
                  key={item._id}
                >
                  <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#f7e0ab] transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="relative aspect-square overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-[#2f4f4f] mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[#2f4f4f] text-sm mb-2">
                        ₹{item.price}
                      </p>
                      <button className="w-full px-4 py-2 bg-[#f7e0ab] text-[#2f4f4f] text-sm rounded-full hover:bg-[#f7e0ab]/90 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      

      <ToastContainer />
    </div>
  )
}

export default ProductPage
