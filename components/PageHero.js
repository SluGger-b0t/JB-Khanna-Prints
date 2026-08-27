const PageHero = ({ kicker, title, description, children }) => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f4f4f] to-primary-light" />
      <div className="absolute inset-0 bg-[url('/images/texture-background.jpg')] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        {kicker && <p className="whisper-kicker mb-2">{kicker}</p>}
        <h1 className="cormorant-heading text-[#f7e0ab] heading-underline mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-[#f7e0ab]/85 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}

export default PageHero
