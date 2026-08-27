'use client'

import { useState, useEffect } from 'react'
import PageHero from '@/components/PageHero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductCard from '@/components/ProductCard'
import CartWidget from '@/components/CartWidget'
import WishlistWidget from '@/components/WishlistWidget'
import {
  getCart,
  setCart as saveCart,
  getWishlist,
  setWishlist as saveWishlist,
} from '@/lib/cart'

const GiftItemsClient = ({ products }) => {
  const filteredByCollection = {}
  Object.entries(products).forEach(([category, items]) => {
    const filteredItems = items.filter(
      (item) =>
        item.collection &&
        item.collection.toLowerCase().replace(/\s+/g, ' ').trim().includes('gift items')
    )
    if (filteredItems.length > 0) {
      filteredByCollection[category] = filteredItems
    }
  })

  const categoriesSet = new Set()
  const subcatMap = {}
  Object.entries(filteredByCollection).forEach(([category, items]) => {
    categoriesSet.add(category)
    items.forEach((item) => {
      if (item.subcategory) {
        if (!subcatMap[category]) subcatMap[category] = new Set()
        subcatMap[category].add(item.subcategory)
      }
    })
  })
  const categories = Array.from(categoriesSet)
  const subcategoriesByCategory = {}
  Object.keys(subcatMap).forEach((cat) => {
    subcategoriesByCategory[cat] = Array.from(subcatMap[cat])
  })

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
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

  const filteredProducts = {}
  categories.forEach((category) => {
    if (selectedCategory === category) {
      filteredProducts[category] =
        selectedSubcategory === 'all'
          ? filteredByCollection[category]
          : filteredByCollection[category].filter(
              (item) => item.subcategory === selectedSubcategory
            )
    }
  })

  return (
    <div className="bg-white font-quicksand">
      <PageHero
        kicker="The Collection"
        title="Gift Items"
        description="Thoughtful, beautifully finished gifts — a blend of tradition, elegance, and timeless beauty, curated to add charm to every occasion."
      >
        <CategoryFilter
          categories={categories}
          subcategoriesByCategory={subcategoriesByCategory}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setSelectedSubcategory('all')
          }}
          onSelectSubcategory={setSelectedSubcategory}
        />
      </PageHero>

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
          {Object.entries(filteredProducts).map(([category, categoryProducts]) => (
            <div key={category} className="mb-14 last:mb-0">
              <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-[#2f4f4f] mb-8">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          ))}
        </div>
      </section>
    </div>
  )
}

export default GiftItemsClient
