import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="bg-[#2f4f4f] text-[#f7e0ab]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img
              src="/images/logotm.png"
              alt="JB Khanna Prints"
              className="h-16 w-auto mb-6"
            />
            <p className="text-[#f7e0ab]/70 text-sm leading-relaxed max-w-xs">
              Four generations of picture publication, established 1957 in
              Chennai — framed art prints, posters and gifts crafted at our
              own design studio and printing press.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#f7e0ab]/30 hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#f7e0ab]/30 hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#f7e0ab]/30 hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
              >
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-cormorant text-lg font-semibold text-white mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-[#f7e0ab]/80">
              <li>Contact Person: Mr. Sanjay Khanna</li>
              <li>
                <a href="tel:+919790787828" className="hover:text-[#f7e0ab]">
                  +91 97907 87828
                </a>{' '}
                |{' '}
                <a href="tel:+919003103849" className="hover:text-[#f7e0ab]">
                  +91 90031 03849
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@jbkhannaprints.in"
                  className="hover:text-[#f7e0ab]"
                >
                  info@jbkhannaprints.in
                </a>
              </li>
              <li className="pt-2">
                Old No: 6 &amp; New No: 11, &quot;CASA BLANCA&quot;
                <br />
                Casa Major Road, Ground Floor
                <br />
                Chennai - 600008
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cormorant text-lg font-semibold text-white mb-5">
              Visit Our Showroom
            </h3>
            <div className="rounded-xl overflow-hidden border border-[#f7e0ab]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4473880986275!2d80.25178607454806!3d13.070808112696495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526672ac6bc979%3A0xa42c76cc2111f109!2sCASA%20Major%20Rd%2C%20Egmore%2C%20Chennai%2C%20Tamil%20Nadu%20600008!5e0!3m2!1sen!2sin!4v1741851805024!5m2!1sen!2sin"
                className="w-full h-48 border-0 grayscale-[30%]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JB Khanna Prints showroom location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f7e0ab]/15">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-[#f7e0ab]/60">
          <p>© {new Date().getFullYear()} J.B. Khanna Prints. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[#f7e0ab]">
              Home
            </Link>
            <Link href="/career" className="hover:text-[#f7e0ab]">
              Career
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
