import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Dancing_Script } from 'next/font/google'
import { Whisper } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import { Footer } from '@/components/Footer'
import ClientNavbarWrapper from '@/components/ClientNavbarWrapper'
import React from 'react'

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
  description:
    'JB Khanna Prints offers premium wall art, canvas paintings, and home decor. Discover unique designs to elevate your space.',
  keywords: [
    'wall art',
    'canvas paintings',
    'home decor',
    'art prints',
    'modern art',
    'JB Khanna',
    'buy art online',
    'premium prints',
    'interior design',
    'unique wall decor',
  ],
  openGraph: {
    title: 'JB Khanna Prints',
    description:
      'Premium wall art and canvas paintings for your home. Shop unique designs at JB Khanna Prints.',
    url: 'https://jbkhannaprints.in',
    siteName: 'JB Khanna Prints',
    images: [
      {
        url: '/public/images/main-banner1.jpg',
        width: 1200,
        height: 630,
        alt: 'JB Khanna Prints Wall Art',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JB Khanna Prints',
    description:
      'Premium wall art and canvas paintings for your home. Shop unique designs at JB Khanna Prints.',
    site: '@jbkhannaprints',
    images: ['/public/images/main-banner1.jpg'],
  },
  metadataBase: new URL('https://jbkhannaprints.in'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="canonical" href="https://jbkhannaprints.in" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${whisper.variable} ${cormorant.variable} antialiased pt-20`}
      >
        <ClientNavbarWrapper />
        {children}
      </body>
    </html>
  )
}
