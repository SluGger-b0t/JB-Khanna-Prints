'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'

const WishlistWidget = ({ wishlist, onAddToCart, onRemove, footerVisible }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="View wishlist"
        className={`fixed right-8 bg-white text-[#e63946] p-4 rounded-full shadow-lg border-2 border-[#e63946] hover:bg-[#f7e0ab] hover:text-[#2f4f4f] hover:border-[#f7e0ab] transition-colors z-40 ${
          footerVisible ? 'bottom-48' : 'bottom-24'
        }`}
      >
        <div className="relative">
          <FaHeart className="w-6 h-6" />
          {wishlist.length > 0 && (
            <span className="absolute -top-3 -right-3 bg-[#e63946] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[#2f4f4f]/20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 w-full md:w-[26rem] h-full bg-cream shadow-2xl flex flex-col">
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#2f4f4f]/10">
              <h2 className="font-cormorant text-2xl font-semibold text-[#2f4f4f]">
                Your Wishlist
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[#2f4f4f]/60 hover:text-[#2f4f4f] text-xl leading-none"
                aria-label="Close wishlist"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4">
              {wishlist.length === 0 ? (
                <p className="text-center text-[#2f4f4f]/60 mt-10">
                  No items in wishlist
                </p>
              ) : (
                <div className="space-y-3">
                  {wishlist.map((item) => {
                    const href = `/products/${
                      item.product_id?.current || item.product_id || item._id
                    }`
                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 p-3 bg-white rounded-xl border border-[#2f4f4f]/10"
                      >
                        <Link href={href} className="shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain"
                          />
                        </Link>
                        <div className="flex-grow min-w-0">
                          <Link
                            href={href}
                            className="text-sm font-medium text-[#2f4f4f] hover:underline truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-[#2f4f4f]/60">
                            ₹{item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onAddToCart(item)}
                            className="px-3 py-1.5 bg-[#2f4f4f] text-white text-xs rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => onRemove(item)}
                            aria-label="Remove from wishlist"
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#e63946]/10 text-[#e63946] hover:bg-[#e63946] hover:text-white transition-colors"
                          >
                            <FaHeart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WishlistWidget
