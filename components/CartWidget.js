'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CartWidget = ({ cart, onQuantityChange, footerVisible }) => {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const router = useRouter()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleButtonClick = () => {
    if (cart.length === 0) {
      setToast('Your cart is empty')
      setTimeout(() => setToast(null), 2000)
    } else {
      setOpen(true)
    }
  }

  const groupedByCollection = cart.reduce((acc, item) => {
    const collection = item.collection || 'Other'
    if (!acc[collection]) acc[collection] = []
    acc[collection].push(item)
    return acc
  }, {})

  return (
    <>
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-[#2f4f4f] text-white px-6 py-3 rounded-full shadow-lg z-50">
          {toast}
        </div>
      )}

      <button
        onClick={handleButtonClick}
        aria-label="View cart"
        className={`fixed right-8 bg-[#2f4f4f] text-white p-4 rounded-full shadow-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors z-40 ${
          footerVisible ? 'bottom-32' : 'bottom-8'
        }`}
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e63946] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
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
                Your Cart
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[#2f4f4f]/60 hover:text-[#2f4f4f] text-xl leading-none"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#2f4f4f]/60 mt-10">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedByCollection).map(
                    ([collection, items]) => (
                      <div key={collection}>
                        <h3 className="text-xs uppercase tracking-wider text-[#2f4f4f]/50 mb-3">
                          {collection}
                        </h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center gap-4 p-3 bg-white rounded-xl border border-[#2f4f4f]/10"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-contain"
                              />
                              <div className="flex-grow min-w-0">
                                <h4 className="text-sm font-medium text-[#2f4f4f] truncate">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-[#2f4f4f]/60">
                                  ₹{item.price}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() =>
                                    onQuantityChange(item._id, item.quantity - 1)
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2f4f4f]/10 text-[#2f4f4f] hover:bg-[#2f4f4f] hover:text-white transition-colors"
                                >
                                  −
                                </button>
                                <span className="text-[#2f4f4f] w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onQuantityChange(item._id, item.quantity + 1)
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2f4f4f]/10 text-[#2f4f4f] hover:bg-[#2f4f4f] hover:text-white transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-[#2f4f4f]/10 px-6 py-5">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-[#2f4f4f]">Total</span>
                <span className="font-semibold text-[#2f4f4f]">
                  ₹{totalPrice}
                </span>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                disabled={cart.length === 0}
                className="w-full py-3 bg-[#2f4f4f] text-white rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartWidget
