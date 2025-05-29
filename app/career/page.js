'use client'

import React from 'react'

const CareerPage = () => {
  return (
    <div className="bg-[url('/images/texture-background.jpg')] bg-repeat pt-20 font-quicksand">
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="whisper-heading text-[#2f4f4f] heading-underline text-center mb-12">
            Career Opportunities
          </h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-[#2f4f4fcc] text-center mb-12">
              Join our team and be part of India's leading picture publication
              company. We're always looking for talented individuals who share
              our passion for quality and innovation.
            </p>

            {/* Job Listings */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Graphic Designer
                </h3>
                <p className="text-[#2f4f4fcc] mb-4">
                  We are seeking a creative Graphic Designer to join our design
                  studio. The ideal candidate should have experience in
                  religious art and traditional design.
                </p>
                <ul className="list-inside text-[#2f4f4fcc] mb-4">
                  <li>3+ years of experience in graphic design</li>
                  <li>Proficiency in Adobe Creative Suite</li>
                  <li>Strong understanding of religious art and symbolism</li>
                  <li>Excellent communication skills</li>
                </ul>
                <button
                  onClick={() =>
                    window.open('YOUR_GOOGLE_FORM_URL_HERE', '_blank')
                  }
                  className="px-6 py-2 bg-[#2f4f4f] text-[#f7e0ab] rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                >
                  Apply Now
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Production Manager
                </h3>
                <p className="text-[#2f4f4fcc] mb-4">
                  Looking for an experienced Production Manager to oversee our
                  printing operations and ensure quality control.
                </p>
                <ul className="list-inside text-[#2f4f4fcc] mb-4">
                  <li>5+ years of experience in printing industry</li>
                  <li>Strong knowledge of printing processes and equipment</li>
                  <li>Excellent project management skills</li>
                  <li>Team leadership experience</li>
                </ul>
                <button
                  onClick={() =>
                    window.open('YOUR_GOOGLE_FORM_URL_HERE', '_blank')
                  }
                  className="px-6 py-2 bg-[#2f4f4f] text-[#f7e0ab] rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                >
                  Apply Now
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Sales Representative
                </h3>
                <p className="text-[#2f4f4fcc] mb-4">
                  Join our sales team to help expand our market reach and build
                  relationships with clients across India.
                </p>
                <ul className="list-inside text-[#2f4f4fcc] mb-4">
                  <li>2+ years of sales experience</li>
                  <li>Strong communication and negotiation skills</li>
                  <li>Knowledge of religious art market</li>
                  <li>Willingness to travel</li>
                </ul>
                <button
                  onClick={() =>
                    window.open('YOUR_GOOGLE_FORM_URL_HERE', '_blank')
                  }
                  className="px-6 py-2 bg-[#2f4f4f] text-[#f7e0ab] rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                >
                  Apply Now
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
                <h3 className="text-xl font-bold mb-4 text-[#2f4f4f] curvy-subheading">
                  Digital Marketing Specialist
                </h3>
                <p className="text-[#2f4f4fcc] mb-4">
                  We're looking for a Digital Marketing Specialist to help grow
                  our online presence and manage our social media channels.
                </p>
                <ul className="list-inside text-[#2f4f4fcc] mb-4">
                  <li>3+ years of digital marketing experience</li>
                  <li>Strong social media management skills</li>
                  <li>Experience with content creation</li>
                  <li>Analytics and reporting expertise</li>
                </ul>
                <button
                  onClick={() =>
                    window.open('YOUR_GOOGLE_FORM_URL_HERE', '_blank')
                  }
                  className="px-6 py-2 bg-[#2f4f4f] text-[#f7e0ab] rounded-lg hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-[#2f4f4f] curvy-subheading text-center">
                Why Join Us?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-[#2f4f4f]">
                    Growth Opportunities
                  </h3>
                  <p className="text-[#2f4f4fcc]">
                    Continuous learning and career advancement
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-[#2f4f4f]">
                    Work-Life Balance
                  </h3>
                  <p className="text-[#2f4f4fcc]">
                    Flexible working hours and supportive environment
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-[#2f4f4f]">
                    Competitive Benefits
                  </h3>
                  <p className="text-[#2f4f4fcc]">
                    Health insurance and performance bonuses
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-[#2f4f4f]">
                    Modern Workplace
                  </h3>
                  <p className="text-[#2f4f4fcc]">
                    State-of-the-art facilities and technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CareerPage
