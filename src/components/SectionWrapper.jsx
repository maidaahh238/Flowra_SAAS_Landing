export default function SectionWrapper({ children, id, className = '', bg = '' }) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${bg} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
