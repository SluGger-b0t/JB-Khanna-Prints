// Centralized, SSR-safe read/write for the cart and wishlist.
// localStorage doesn't exist during server rendering, and on this project's
// Node runtime a broken global can exist even server-side — always guard.

const isBrowser = () => typeof window !== 'undefined'

function readList(key) {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeList(key, items) {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(items))
  } catch {
    // Ignore write failures (e.g. private browsing storage limits).
  }
}

export function getCart() {
  return readList('cart')
}

export function setCart(items) {
  writeList('cart', items)
}

export function addToCart(product) {
  const cart = getCart()
  const existingIndex = cart.findIndex((item) => item._id === product._id)

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
      category: product.category || 'normal',
      image: product.image === '' ? null : product.image,
    })
  }

  setCart(cart)
  return cart
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item._id !== productId)
  setCart(cart)
  return cart
}

export function updateCartQuantity(productId, quantity) {
  const cart = getCart()
  const index = cart.findIndex((item) => item._id === productId)
  if (index > -1) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
  }
  setCart(cart)
  return cart
}

export function clearCart() {
  setCart([])
}

export function getWishlist() {
  return readList('wishlist')
}

export function setWishlist(items) {
  writeList('wishlist', items)
}

export function toggleWishlist(product) {
  const wishlist = getWishlist()
  const existingIndex = wishlist.findIndex((item) => item._id === product._id)

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1)
  } else {
    wishlist.push(product)
  }

  setWishlist(wishlist)
  return wishlist
}

export function isInWishlist(wishlist, productId) {
  return wishlist.some((item) => item._id === productId)
}

// A product created within the last 30 days is treated as "New" —
// Sanity already tracks _createdAt on every document, so no manual flag needed.
export function isNewProduct(createdAt) {
  if (!createdAt) return false
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
  return Date.now() - new Date(createdAt).getTime() < THIRTY_DAYS_MS
}
