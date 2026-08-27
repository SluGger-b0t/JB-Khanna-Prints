'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import CartWidget from '@/components/CartWidget'
import WishlistWidget from '@/components/WishlistWidget'
import {
  getCart,
  setCart as saveCart,
  getWishlist,
  setWishlist as saveWishlist,
} from '@/lib/cart'

const BrochureDetailClient = ({ brochure }) => {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setCart(getCart())
    setWishlist(getWishlist())
  }, [])

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id)
      const newCart = existing
        ? prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }]
      saveCart(newCart)
      return newCart
    })
  }

  const handleQuantityChange = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) => (item._id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
      saveCart(newCart)
      return newCart
    })
  }

  const handleWishlistToggle = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id)
      const newWishlist = exists
        ? prev.filter((item) => item._id !== product._id)
        : [...prev, product]
      saveWishlist(newWishlist)
      return newWishlist
    })
  }

  const isWishlisted = (product) =>
    wishlist.some((item) => item._id === product._id)

  return (
    <div className="bg-white font-quicksand">
      <CartWidget
        cart={cart}
        onQuantityChange={handleQuantityChange}
        footerVisible={false}
      />
      <WishlistWidget
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemove={handleWishlistToggle}
        footerVisible={false}
      />

      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/brochures"
            className="inline-flex items-center gap-1 text-sm text-[#2f4f4f]/60 hover:text-[#2f4f4f] mb-6"
          >
            ← All Brochures
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              <div className="border border-[#2f4f4f]/10 rounded-2xl overflow-hidden bg-cream">
                <iframe
                  src={`${brochure.pdfUrl}#toolbar=1&navpanes=0`}
                  title={brochure.title}
                  className="w-full h-[70vh] min-h-[500px] bg-white"
                />
              </div>
            </div>

            <div>
              <h1 className="font-cormorant text-3xl font-semibold text-[#2f4f4f] mb-3">
                {brochure.title}
              </h1>
              {brochure.description && (
                <p className="text-[#2f4f4f]/70 text-sm leading-relaxed mb-6">
                  {brochure.description}
                </p>
              )}

              <a
                href={brochure.pdfUrl}
                download={brochure.pdfFilename || true}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#2f4f4f] text-white rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                  />
                </svg>
                Download PDF
              </a>

              {brochure.products?.length > 0 && (
                <p className="text-xs uppercase tracking-wide text-[#2f4f4f]/50 mt-8 mb-2">
                  {brochure.products.length} product
                  {brochure.products.length === 1 ? '' : 's'} in this brochure
                </p>
              )}
            </div>
          </div>

          {brochure.products?.length > 0 && (
            <div className="mt-16">
              <h2 className="font-cormorant text-2xl font-semibold text-[#2f4f4f] mb-8">
                Products in This Brochure
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {brochure.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isWishlisted={isWishlisted(product)}
                    onToggleWishlist={handleWishlistToggle}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default BrochureDetailClient
