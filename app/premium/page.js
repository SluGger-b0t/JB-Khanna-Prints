'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import PageHero from '@/components/PageHero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductCard from '@/components/ProductCard'
import CartWidget from '@/components/CartWidget'
import WishlistWidget from '@/components/WishlistWidget'
import FeaturesSection from '@/components/FeaturesSection'
import {
  getCart,
  setCart as saveCart,
  getWishlist,
  setWishlist as saveWishlist,
} from '@/lib/cart'

const PremiumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && (collection match "premium" || collection match "Premium")] {
          _id,
          _createdAt,
          name,
          category,
          subcategory,
          description,
          price,
          "image": image.asset->url,
          product_id
        }`
        const productsData = await client.fetch(query)
        setProducts(productsData)

        const categorySet = new Set()
        const subcatMap = {}
        productsData.forEach((p) => {
          if (p.category) {
            categorySet.add(p.category)
            if (!subcatMap[p.category]) subcatMap[p.category] = new Set()
            if (p.subcategory) subcatMap[p.category].add(p.subcategory)
          }
        })
        setCategories(['all', ...Array.from(categorySet)])
        const subcatObj = {}
        Object.keys(subcatMap).forEach((cat) => {
          subcatObj[cat] = Array.from(subcatMap[cat])
        })
        setSubcategoriesByCategory(subcatObj)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
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
        : [
            ...prevCart,
            { ...product, quantity: 1, category: product.category || 'normal' },
          ]
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

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true
    if (selectedSubcategory === 'all') return product.category === selectedCategory
    return (
      product.category === selectedCategory &&
      product.subcategory === selectedSubcategory
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-[#2f4f4f] text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <PageHero
        kicker="For the Connoisseur"
        title="Premium Collection"
        description="Discover our exclusive range of premium prints, featuring handcrafted masterpieces and limited edition artworks that embody the perfect blend of tradition and innovation."
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
        footerVisible={false}
      />
      <WishlistWidget
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemove={handleWishlistToggle}
        footerVisible={false}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
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
      </section>

      <FeaturesSection />

      <section className="py-16 md:py-20 bg-cream text-center">
        <div className="container mx-auto px-4">
          <h2 className="cormorant-heading text-[#2f4f4f] mb-6">
            Experience Premium Artistry
          </h2>
          <p className="text-[#2f4f4f]/70 max-w-2xl mx-auto mb-8">
            Join our exclusive community of art enthusiasts and be the first to
            know about new premium collections and special offers.
          </p>
          <a
            href="/#contact-us"
            className="inline-block px-8 py-3 bg-[#2f4f4f] text-[#f7e0ab] rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-all duration-300 text-base font-medium"
          >
            Contact Us for Custom Orders
          </a>
        </div>
      </section>
    </div>
  )
}

export default PremiumPage
