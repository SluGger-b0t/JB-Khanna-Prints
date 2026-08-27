'use client'

import PageHero from '@/components/PageHero'

const JOBS = [
  {
    title: 'Graphic Designer',
    description:
      "We are seeking a creative Graphic Designer to join our design studio. The ideal candidate should have experience in religious art and traditional design.",
    requirements: [
      '3+ years of experience in graphic design',
      'Proficiency in Adobe Creative Suite',
      'Strong understanding of religious art and symbolism',
      'Excellent communication skills',
    ],
  },
  {
    title: 'Production Manager',
    description:
      'Looking for an experienced Production Manager to oversee our printing operations and ensure quality control.',
    requirements: [
      '5+ years of experience in printing industry',
      'Strong knowledge of printing processes and equipment',
      'Excellent project management skills',
      'Team leadership experience',
    ],
  },
  {
    title: 'Sales Representative',
    description:
      'Join our sales team to help expand our market reach and build relationships with clients across India.',
    requirements: [
      '2+ years of sales experience',
      'Strong communication and negotiation skills',
      'Knowledge of religious art market',
      'Willingness to travel',
    ],
  },
  {
    title: 'Digital Marketing Specialist',
    description:
      "We're looking for a Digital Marketing Specialist to help grow our online presence and manage our social media channels.",
    requirements: [
      '3+ years of digital marketing experience',
      'Strong social media management skills',
      'Experience with content creation',
      'Analytics and reporting expertise',
    ],
  },
]

const BENEFITS = [
  {
    title: 'Growth Opportunities',
    description: 'Continuous learning and career advancement',
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible working hours and supportive environment',
  },
  {
    title: 'Competitive Benefits',
    description: 'Health insurance and performance bonuses',
  },
  {
    title: 'Modern Workplace',
    description: 'State-of-the-art facilities and technology',
  },
]

const CareerPage = () => {
  return (
    <div className="bg-white font-quicksand">
      <PageHero
        kicker="Join Our Team"
        title="Career Opportunities"
        description="Be part of India's leading picture publication company. We're always looking for talented individuals who share our passion for quality and innovation."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {JOBS.map((job) => (
                <div
                  key={job.title}
                  className="bg-cream p-8 rounded-2xl border border-[#2f4f4f]/10 hover-lift"
                >
                  <h3 className="font-cormorant text-xl font-semibold mb-3 text-[#2f4f4f]">
                    {job.title}
                  </h3>
                  <p className="text-[#2f4f4f]/70 text-sm mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <ul className="list-disc list-inside text-[#2f4f4f]/70 text-sm mb-6 space-y-1">
                    {job.requirements.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                  <a
                    href="/#contact-us"
                    className="inline-block px-6 py-2 bg-[#2f4f4f] text-[#f7e0ab] rounded-full hover:bg-[#f7e0ab] hover:text-[#2f4f4f] transition-colors text-sm font-medium"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-cream p-8 md:p-10 rounded-2xl border border-[#2f4f4f]/10">
              <h2 className="font-cormorant text-2xl font-semibold mb-8 text-[#2f4f4f] text-center">
                Why Join Us?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.title} className="text-center">
                    <h3 className="text-base font-semibold mb-1 text-[#2f4f4f]">
                      {benefit.title}
                    </h3>
                    <p className="text-[#2f4f4f]/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CareerPage
