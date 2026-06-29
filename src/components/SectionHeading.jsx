export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-block mb-3 text-xs font-mono font-medium tracking-widest uppercase text-plum-500 bg-plum-50 px-3 py-1 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-plum-600/80 max-w-2xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
