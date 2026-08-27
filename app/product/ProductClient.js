'use client'

import { useState, useEffect } from 'react'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import CartWidget from '@/components/CartWidget'
import WishlistWidget from '@/components/WishlistWidget'
import {
  getCart,
  setCart as saveCart,
  getWishlist,
  setWishlist as saveWishlist,
} from '@/lib/cart'

const ProductClient = ({ products }) => {
  const filteredProducts = Object.entries(products).reduce(
    (acc, [category, items]) => {
      if (category.trim().toLowerCase() !== 'premium') {
        acc[category] = items
      }
      return acc
    },
    {}
  )

  const [activeSection, setActiveSection] = useState(
    Object.keys(filteredProducts)[0] || ''
  )
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    setCart(getCart())
    setWishlist(getWishlist())
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { root: null, threshold: 0.01 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
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
        .map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
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
    <div className="bg-white">
      <PageHero
        kicker="The Collection"
        title="All Products"
        description="Our full range of canvas paintings and prints — a blend of tradition, elegance, and timeless beauty, thoughtfully curated for every space."
      />

      <CartWidget
        cart={cart}
        onQuantityChange={handleQuantityChange}
        footerVisible={footerVisible}
      />
      <WishlistWidget
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemove={handleWishlistToggle}
        footerVisible={footerVisible}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="block lg:hidden mb-10">
            <label htmlFor="category-select" className="sr-only">
              Select a category
            </label>
            <select
              id="category-select"
              className="w-full p-3 border border-[#2f4f4f]/20 rounded-full text-[#2f4f4f] bg-white"
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
            >
              {Object.keys(filteredProducts).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="hidden lg:block w-56 shrink-0">
              <nav className="sticky top-28 space-y-1">
                {Object.keys(filteredProducts).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveSection(category)}
                    className={`w-full text-left px-4 py-2 rounded-full text-sm transition-colors ${
                      activeSection === category
                        ? 'bg-[#2f4f4f] text-white'
                        : 'text-[#2f4f4f] hover:bg-[#2f4f4f]/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-grow">
              {Object.entries(filteredProducts).map(
                ([category, categoryProducts]) =>
                  activeSection === category && (
                    <div key={category}>
                      <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-[#2f4f4f] mb-8">
                        {category}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                        {categoryProducts.map((product) => (
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
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductClient
