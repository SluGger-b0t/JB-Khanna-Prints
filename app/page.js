'use client'

import React, { useEffect } from 'react'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

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
    <div className="bg-[url('/images/texture-background.jpg')] bg-repeat pt-20 font-quicksand">
      <section id="billboard" className="py-16">
        <div className="container mx-auto px-4">
          <div className="swiper main-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide text-center">
                <h1 className="whisper-heading text-[#2f4f4f] mb-6 md:mb-8 heading-underline mt-8 md:mt-6">
                  Welcome to India's Leading <br />
                  "Picture Publication Company"
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-[#2f4f4fcc] w-full md:w-1/2 mx-auto">
                  Late Shri Jagannath Khanna founded JBKhanna & Company in 1957
                  as a Picture Trading Company specializing in "Religious
                  Pictures".
                  <br />
                  <br />
                  Seven Decades in business, JBKhanna & Company is well known as
                  the first dedicated Religious Picture Publication Company &
                  has the largest library carrying exclusive collection of
                  Religious pictures coming out from its own <br />
                  <span className="font-bold">
                    "DESIGN STUDIO & STATE OF ART PRINTING PRESS"
                  </span>
                </p>
              </div>
              <div className="swiper-slide text-center">
                <h1 className="whisper-heading text-[#2f4f4f] mb-6 md:mb-8 heading-underline mt-8 md:mt-6">
                  J.B.Khanna Prints has a few <br />
                  first to its credit
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-[#2f4f4fcc] w-full md:w-1/2 mx-auto">
                  First in India to start the Laminated Religious & non
                  religious Poster Printing. <br />
                  First Non-Commercial Printer to Indigenously Start CTP in
                  India.
                  <br />
                  First Non-Commercial Printer to Indigenously Add Polar Cutting
                  Machine in India.
                  <br />
                  First to Create Gold Foil Embossed Pictures in India.
                  <br />
                  First in India to Indigenously Print 5D holographic Foil Art
                  Pictures, Foil Posters, home decor for sale.
                </p>
              </div>
            </div>

            <div className="swiper-button-next after:text-[#2f4f4f]"></div>
            <div className="swiper-button-prev after:text-[#2f4f4f]"></div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="cormorant-heading text-[#2f4f4f] heading-underline mb-8">
            Explore Our Products
          </h2>
          <p className="text-sm md:text-lg text-[#2f4f4fcc] mb-8 w-full md:w-1/2 mx-auto">
            Discover our exquisite collection of canvas paintings, each piece
            thoughtfully curated to add charm and character to any space.
          </p>
          <a
            href="/product"
            className="inline-flex items-center px-8 py-4 bg-[#2f4f4f] text-[#f7e0ab] rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-lg font-medium"
          >
            View All Products
          </a>
        </div>
      </section>

      <section id="about-us" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="cormorant-heading text-[#2f4f4f] heading-underline uppercase tracking-wider">
              About Us
            </h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="whisper-subheading text-[#2f4f4f] mb-4 md:mb-8 heading-underline text-center">
              J.B. Khanna Prints
            </h2>
            <p className="text-sm md:text-lg text-[#2f4f4fcc] mb-6 md:mb-8">
              JBKhanna Family Run Enterprises, now in its fourth generation,
              continues Shri Jagannath Khanna's legacy of innovation in
              printing. Dedicated to quality and customer satisfaction, we offer
              world-class products at reasonable prices. <br />
              <br />
              With a state-of-the-art printing press, advanced design studio,
              and cutting-edge technology, we ensure top-tier printing and
              packaging solutions. Expanding further, our new Chennai showroom
              will feature gift boxes, hand-painted art, wedding cards, and
              more, while our Madhavaram factory is set to lead in UV screen
              printing and lamination. <br />
              <br />
              Committed to excellence, JBKhanna continues to set new benchmarks
              in the industry.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-base md:text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  History
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-[#2f4f4fcc]">
                  <li>
                    <span className="font-bold text-[#f7e0ab]">1957</span> -
                    Founded JBKhanna & Company, in Chennai
                  </li>
                  <li>
                    <span className="font-bold text-[#f7e0ab]">1984</span> -
                    Lamination
                  </li>
                  <li>
                    <span className="font-bold text-[#f7e0ab]">2002</span> - CTP
                  </li>
                  <li>
                    <span className="font-bold text-[#f7e0ab]">Showroom</span> -
                    Since beginning
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Quality
                </h3>
                <ul className="space-y-2 text-[#2f4f4fcc]">
                  <li>Best Paper</li>
                  <li>Best Ink</li>
                  <li>Best Machines</li>
                  <li>Best Packing</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Services
                </h3>
                <ul className="space-y-2 text-sm text-[#2f4f4fcc]">
                  <li>Poster Designing B & W to Colour</li>
                  <li>Re-Creation Designing & CMYK Multi colour Printing</li>
                  <li>Plate Making(CTP) & Copy Dot Scaning</li>
                  <li>Poster Lamination & Die Cutting Stickers</li>
                  <li>
                    Dedicated Machine for Printing 3D holographic artworks
                  </li>
                  <li>Sticker Gumming machine</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Sales Network
                </h3>
                <p className="text-[#2f4f4fcc]">
                  Our sales network is spread all across the globe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section  */}
      <section id="quotation" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="cormorant-heading text-[#2f4f4f] heading-underline mb-12 uppercase tracking-wider">
            Quote Of The Day
          </h2>
          <blockquote className="max-w-3xl mx-auto">
            <q className="text-2xl leading-relaxed text-[#2f4f4fcc] font-quicksand block mb-8">
              "Printing is the greatest weapon ever invented in the armory of
              the modern commander. It is the voice of reason, the bearer of
              knowledge, and the bridge between imagination and reality."
            </q>
            <div className="text-xl font-medium text-[#2f4f4f]">
              Napoleon Bonaparte
            </div>
          </blockquote>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="whisper-heading text-[#2f4f4f] heading-underline">
                  Subscribe to our newsletter
                </h2>
              </div>
              <div>
                <p className="mb-6 text-[#2f4f4fcc]">
                  Be the first to know about new products, special offers, and
                  exclusive deals. Join our community today!
                </p>
                <form id="form" className="flex gap-2">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email address here"
                    className="flex-1 px-4 py-2 border border-[#2f4f4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7e0ab]"
                  />
                  <button className="px-6 py-2 bg-[#2f4f4f] text-[#f7e0ab] rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors curvy-subheading">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-[#2f4f4f] text-[#f7e0ab] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="images/main-logo (2).png"
                alt="logo"
                className="h-16 mb-6"
              />
              <p className="text-[#f7e0abcc]">
                Contact Person: Mr. Sanjay Khanna <br />
                Mobile: +91 9840077936 | +91 9944505220 <br />
                Email: info@jbkhannaprints.in <br />
                <br />
                Address: <br />
                Old No: 6 & New No: 11, <br />
                "CASA BLANCA" Casa Major Road, <br />
                Ground Floor Chennai - 600008
              </p>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4473880986275!2d80.25178607454806!3d13.070808112696495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526672ac6bc979%3A0xa42c76cc2111f109!2sCASA%20Major%20Rd%2C%20Egmore%2C%20Chennai%2C%20Tamil%20Nadu%20600008!5e0!3m2!1sen!2sin!4v1741851805024!5m2!1sen!2sin"
                className="w-full h-96 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div id="footer-bottom" className="bg-[#2f4f4fe6] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#f7e0abcc] mb-4 md:mb-0">
              © 2025 J.B. Khanna Prints. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <i className="icon icon-facebook"></i>
              <a
                href="#"
                className="text-[#f7e0abcc] hover:text-[#f7e0ab] transition-colors"
              >
                <i className="icon icon-twitter"></i>
              </a>
              <a
                href="#"
                className="text-[#f7e0abcc] hover:text-[#f7e0ab] transition-colors"
              >
                <i className="icon icon-youtube-play"></i>
              </a>
              <a
                href="#"
                className="text-[#f7e0abcc] hover:text-[#f7e0ab] transition-colors"
              >
                <i className="icon icon-behance-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
