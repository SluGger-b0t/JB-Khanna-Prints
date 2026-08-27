'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import FeaturesSection from '@/components/FeaturesSection'

const PREMIUM_FEATURES = [
  {
    title: 'Exclusive Prints',
    description: 'Limited edition prints with premium finishes and unique designs',
    path: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: 'Custom Designs',
    description: 'Bespoke creations tailored to your specific requirements',
    path: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  },
  {
    title: 'Premium Finishes',
    description: 'Luxurious finishes including gold foil, embossing, and special laminations',
    path: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
]

const Home = () => {
  useEffect(() => {
    const swiper = new Swiper('.main-slider', {
      modules: [Navigation, Autoplay],
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    })

    return () => {
      swiper.destroy()
    }
  }, [])

  return (
    <div className="bg-cream font-quicksand">
      <section id="billboard" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="swiper main-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide text-center">
                <p className="whisper-kicker mb-3">Since 1957</p>
                <h1 className="cormorant-heading text-[#2f4f4f] heading-underline mb-6 md:mb-8">
                  India&apos;s Leading Picture
                  <br />
                  Publication Company
                </h1>
                <p className="text-sm md:text-lg text-[#2f4f4f]/70 w-full md:w-2/3 mx-auto leading-relaxed">
                  Late Shri Jagannath Khanna founded JBKhanna &amp; Company in
                  1957 as a Picture Trading Company specializing in Religious
                  Pictures.
                  <br />
                  <br />
                  Seven decades in business, JBKhanna &amp; Company is well
                  known as the first dedicated Religious Picture Publication
                  Company &amp; has the largest library of exclusive Religious
                  pictures, coming out of its own{' '}
                  <span className="font-semibold text-[#2f4f4f]">
                    Design Studio &amp; State-of-the-Art Printing Press
                  </span>
                  .
                </p>
              </div>
              <div className="swiper-slide text-center">
                <p className="whisper-kicker mb-3">A Few Firsts</p>
                <h1 className="cormorant-heading text-[#2f4f4f] heading-underline mb-6 md:mb-8">
                  J.B. Khanna Prints Has A Few
                  <br />
                  Firsts To Its Credit
                </h1>
                <p className="text-sm md:text-lg text-[#2f4f4f]/70 w-full md:w-2/3 mx-auto leading-relaxed">
                  First in India to start Laminated Religious &amp; non
                  religious Poster Printing.
                  <br />
                  First Non-Commercial Printer to Indigenously start CTP in
                  India.
                  <br />
                  First Non-Commercial Printer to Indigenously add a Polar
                  Cutting Machine in India.
                  <br />
                  First to create Gold Foil Embossed Pictures in India.
                  <br />
                  First in India to Indigenously print 5D holographic Foil Art
                  Pictures, Foil Posters and home decor for sale.
                </p>
              </div>
            </div>

            <div className="swiper-button-next after:text-[#2f4f4f]"></div>
            <div className="swiper-button-prev after:text-[#2f4f4f]"></div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2f4f4f] to-primary-light" />
        <div className="absolute inset-0 bg-[url('/images/texture-background.jpg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto mb-14">
            <p className="whisper-kicker mb-2">For the Connoisseur</p>
            <h2 className="cormorant-heading text-[#f7e0ab] heading-underline mb-6">
              Premium Collection
            </h2>
            <p className="text-base md:text-lg text-[#f7e0ab]/80 leading-relaxed">
              Experience our exclusive premium collection featuring handcrafted
              masterpieces, limited edition prints, and bespoke designs that
              embody the perfect blend of tradition and contemporary artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {PREMIUM_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-[#f7e0ab]/15 hover:border-[#f7e0ab]/40 transition-all duration-300"
              >
                <div className="h-12 w-12 mx-auto mb-5 rounded-full border border-[#f7e0ab]/40 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#f7e0ab]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d={feature.path}
                    />
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-[#f7e0ab] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#f7e0ab]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/premium"
            className="inline-flex items-center px-8 py-3 bg-[#f7e0ab] text-[#2f4f4f] rounded-full hover:bg-white transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            Explore Premium Collection
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      <section id="about-us" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="whisper-kicker mb-2">Our Story</p>
            <h1 className="cormorant-heading text-[#2f4f4f] heading-underline">
              About Us
            </h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-[#2f4f4f] mb-6 text-center">
              J.B. Khanna Prints
            </h2>
            <p className="text-sm md:text-lg text-[#2f4f4f]/70 mb-14 leading-relaxed text-center max-w-3xl mx-auto">
              JBKhanna Family Run Enterprises, now in its fourth generation,
              continues Shri Jagannath Khanna&apos;s legacy of innovation in
              printing. Dedicated to quality and customer satisfaction, we
              offer world-class products at reasonable prices.
              <br />
              <br />
              With a state-of-the-art printing press, advanced design studio,
              and cutting-edge technology, we ensure top-tier printing and
              packaging solutions. Expanding further, our new Chennai showroom
              will feature gift boxes, hand-painted art, wedding cards, and
              more, while our Madhavaram factory is set to lead in UV screen
              printing and lamination.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cream p-8 rounded-2xl border border-[#2f4f4f]/10 hover-lift">
                <h3 className="text-lg md:text-xl font-semibold mb-5 text-[#2f4f4f] curvy-subheading">
                  History
                </h3>
                <ul className="space-y-2.5 text-sm md:text-base text-[#2f4f4f]/70">
                  <li>
                    <span className="font-semibold text-[#2f4f4f]">1957</span>{' '}
                    — Founded JBKhanna &amp; Company, in Chennai
                  </li>
                  <li>
                    <span className="font-semibold text-[#2f4f4f]">1984</span>{' '}
                    — Lamination
                  </li>
                  <li>
                    <span className="font-semibold text-[#2f4f4f]">2002</span>{' '}
                    — CTP
                  </li>
                  <li>
                    <span className="font-semibold text-[#2f4f4f]">
                      Showroom
                    </span>{' '}
                    — Since beginning
                  </li>
                </ul>
              </div>

              <div className="bg-cream p-8 rounded-2xl border border-[#2f4f4f]/10 hover-lift">
                <h3 className="text-lg md:text-xl font-semibold mb-5 text-[#2f4f4f] curvy-subheading">
                  Quality
                </h3>
                <ul className="space-y-2.5 text-sm md:text-base text-[#2f4f4f]/70">
                  <li>Best Paper</li>
                  <li>Best Ink</li>
                  <li>Best Machines</li>
                  <li>Best Packing</li>
                </ul>
              </div>

              <div className="bg-cream p-8 rounded-2xl border border-[#2f4f4f]/10 hover-lift">
                <h3 className="text-lg md:text-xl font-semibold mb-5 text-[#2f4f4f] curvy-subheading">
                  Services
                </h3>
                <ul className="space-y-2.5 text-sm text-[#2f4f4f]/70">
                  <li>Poster Designing B &amp; W to Colour</li>
                  <li>Re-Creation Designing &amp; CMYK Multi Colour Printing</li>
                  <li>Plate Making (CTP) &amp; Copy Dot Scanning</li>
                  <li>Poster Lamination &amp; Die Cutting Stickers</li>
                  <li>Dedicated Machine for Printing 3D Holographic Artworks</li>
                  <li>Sticker Gumming Machine</li>
                </ul>
              </div>

              <div className="bg-cream p-8 rounded-2xl border border-[#2f4f4f]/10 hover-lift">
                <h3 className="text-lg md:text-xl font-semibold mb-5 text-[#2f4f4f] curvy-subheading">
                  Sales Network
                </h3>
                <p className="text-sm md:text-base text-[#2f4f4f]/70">
                  Our sales network is spread all across the globe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section id="quotation" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="font-cormorant text-6xl text-[#f7e0ab] leading-none block mb-2">
            &ldquo;
          </span>
          <blockquote>
            <q className="font-cormorant text-2xl md:text-3xl leading-relaxed text-[#2f4f4f] block mb-6">
              Printing is the greatest weapon ever invented in the armory of
              the modern commander. It is the voice of reason, the bearer of
              knowledge, and the bridge between imagination and reality.
            </q>
            <div className="text-base font-medium text-[#2f4f4f]/60 tracking-wide">
              Napoleon Bonaparte
            </div>
          </blockquote>
        </div>
      </section>

      <section id="contact-us" className="py-20 md:py-28 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="whisper-kicker mb-2">Stay Connected</p>
              <h2 className="cormorant-heading text-[#2f4f4f] heading-underline">
                Enquire Now
              </h2>
            </div>
            <div>
              <p className="mb-6 text-[#2f4f4f]/70">
                Be the first to know about new products, special offers, and
                exclusive collections. Join our community today!
              </p>
              <form id="form" className="flex gap-2">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3 bg-white border border-[#2f4f4f]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f7e0ab] text-sm"
                />
                <button className="px-6 py-3 bg-[#2f4f4f] text-[#f7e0ab] rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm font-medium">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
