import { Star } from 'lucide-react'
import { testimonials } from '../data'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials" bg="bg-white">
      <SectionHeading
        eyebrow="Loved by teams"
        title={<>Don't take our word<br /><em className="not-italic text-gradient">for it</em></>}
        subtitle="Over 12,000 teams rely on Flowra every day. Here's what a few of them have to say."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-plum
              ${i % 2 === 0 ? 'bg-plum-50 border-plum-100' : 'bg-beige-50 border-beige-100'}`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_,j)=>(
                <Star key={j} size={14} className="text-beige-400 fill-beige-400" />
              ))}
            </div>
            {/* Quote */}
            <blockquote className="font-body text-plum-800 leading-relaxed mb-6 text-[15px]">
              "{t.quote}"
            </blockquote>
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-plum">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-plum-900">{t.name}</p>
                <p className="text-xs font-body text-plum-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Logo strip */}
      <div className="mt-16 text-center">
        <p className="text-sm font-body text-plum-400 mb-6">Trusted by teams at</p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
          {['NayaPay','Systems Limited','Arbisoft','Airlift Tech','Netsol Technologies','10Pearls'].map(name => (
            <span key={name} className="text-sm font-display font-bold text-plum-800 tracking-wide">{name}</span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
