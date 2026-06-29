import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../data'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <SectionWrapper id="faq" bg="bg-white">
      <SectionHeading
        eyebrow="FAQ"
        title={<>Questions?<br /><em className="not-italic text-gradient">We have answers.</em></>}
        subtitle="Can't find what you're looking for? Reach out to our friendly team."
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`border rounded-2xl overflow-hidden transition-all duration-200
              ${open === i ? 'border-plum-200 shadow-soft' : 'border-beige-100 hover:border-plum-100'}`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-plum-50/30 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-display font-semibold text-plum-900 text-[15px] leading-snug">{item.q}</span>
              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors
                ${open === i ? 'bg-plum-600 text-white' : 'bg-beige-100 text-plum-500'}`}>
                {open === i ? <Minus size={14} /> : <Plus size={14} />}
              </div>
            </button>
            {open === i && (
              <div className="px-6 pb-5 bg-white">
                <p className="text-sm font-body text-plum-600/80 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
