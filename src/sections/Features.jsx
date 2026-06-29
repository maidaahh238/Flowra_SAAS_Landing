import { features } from '../data'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function Features() {
  return (
    <SectionWrapper id="features" bg="bg-white">
      <SectionHeading
        eyebrow="Everything you need"
        title={<>Built for the way<br /><em className="not-italic text-gradient">modern teams work</em></>}
        subtitle="Stop juggling tools. Flowra brings your projects, people, and data into one calm, focused workspace."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`group relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-plum cursor-default
              ${f.color === 'plum' ? 'bg-plum-50 border-plum-100 hover:border-plum-200' : 'bg-beige-50 border-beige-100 hover:border-beige-200'}`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110
              ${f.color === 'plum' ? 'bg-plum-100 text-plum-600' : 'bg-beige-100 text-beige-500'}`}>
              {f.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-plum-900 mb-2">{f.title}</h3>
            <p className="text-sm font-body text-plum-600/80 leading-relaxed">{f.desc}</p>
            {/* Hover accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity
              ${f.color === 'plum' ? 'bg-gradient-to-r from-plum-400 to-plum-600' : 'bg-gradient-to-r from-beige-300 to-beige-500'}`} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
