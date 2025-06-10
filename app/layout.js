import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Dancing_Script } from 'next/font/google'
import { Whisper } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import { Footer } from '@/components/Footer'
// import { usePathname } from 'next/navigation'

const whisper = Whisper({
  subsets: ['latin'],
  weight: ['400'], // Adjust weights as needed
  variable: '--font-whisper',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // adjust as needed
  variable: '--font-cormorant',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'JB Khanna Prints',
  description: 'I am a Blog',
}

export default function RootLayout({ children }) {
  // Hide Navbar on /checkout
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const hideNavbar = pathname.startsWith('/checkout')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${whisper.variable} ${cormorant.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="relative">{!hideNavbar && <Navbar />}</div>
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
