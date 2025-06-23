'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ClientNavbarWrapper() {
  const pathname = usePathname()
  const hideNavbar =
    pathname.startsWith('/admin')
  if (hideNavbar) return null
  return <Navbar />
}
