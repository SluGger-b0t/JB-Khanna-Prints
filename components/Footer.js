import React from 'react'

export const Footer = () => {
  return (
    <div>
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
