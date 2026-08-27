'use client'

import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { isNewProduct } from '@/lib/cart'

// A print's image sits inside a thin "mat" border, echoing the framed
// product itself rather than a generic e-commerce thumbnail.
const ProductCard = ({ product, isWishlisted, onToggleWishlist, onAddToCart }) => {
  const detailHref = `/products/${
    product.product_id?.current || product.product_id || product._id
  }`

  return (
    <div className="group bg-white rounded-2xl border border-[#2f4f4f]/10 overflow-hidden transition-all duration-300 hover:border-[#f7e0ab] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2f4f4f]/5">
      <div className="relative bg-cream p-4">
        <div className="relative aspect-square border border-[#2f4f4f]/10 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-3"
          />
        </div>

        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-6 left-6 z-10 bg-white/90 rounded-full p-2 shadow-sm hover:bg-[#f7e0ab] transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? (
            <FaHeart className="text-[#e63946] w-4 h-4" />
          ) : (
            <FaRegHeart className="text-[#2f4f4f] w-4 h-4" />
          )}
        </button>

        {isNewProduct(product._createdAt) && (
          <span className="absolute top-6 right-6 bg-[#2f4f4f] px-3 py-1 rounded-full text-[#f7e0ab] text-xs tracking-wide">
            New
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-cormorant font-semibold text-lg sm:text-xl text-[#2f4f4f] mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-[#2f4f4f]/60 mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-[#2f4f4f]">
            ₹{product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-[#2f4f4f] text-white text-sm rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
          >
            Add to Cart
          </button>
        </div>
        <Link
          href={detailHref}
          className="block w-full py-2 border border-[#2f4f4f]/20 text-[#2f4f4f] text-center rounded-full hover:border-[#2f4f4f] transition-colors text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
