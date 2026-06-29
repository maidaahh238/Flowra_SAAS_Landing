import { useState } from 'react'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { plans } from '../data'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <SectionWrapper id="pricing" bg="bg-cream">
      <SectionHeading
        eyebrow="Pricing"
        title={<>Simple, honest<br /><em className="not-italic text-gradient">pricing</em></>}
        subtitle="No hidden fees. No sudden price jumps. Choose the plan that fits where your team is today."
      />

      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm font-body ${!annual ? 'text-plum-800 font-semibold' : 'text-plum-400'}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${annual ? 'bg-plum-600' : 'bg-beige-200'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${annual ? 'translate-x-6' : ''}`} />
        </button>
        <span className={`text-sm font-body ${annual ? 'text-plum-800 font-semibold' : 'text-plum-400'}`}>
          Annual
          <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Save 20%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => {
          const price = plan.price === 0 ? 0 : annual ? Math.round(plan.price * 0.8) : plan.price
          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 hover:-translate-y-1
                ${plan.highlight
                  ? 'bg-gradient-to-b from-plum-700 to-plum-900 border-plum-600 shadow-plum text-white'
                  : 'bg-white border-beige-100 shadow-soft hover:shadow-plum'}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-beige-400 to-beige-500 text-white text-xs font-medium px-4 py-1 rounded-full shadow-beige whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-plum-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm font-body ${plan.highlight ? 'text-plum-200' : 'text-plum-500'}`}>{plan.desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-display font-bold ${plan.highlight ? 'text-white' : 'text-plum-900'}`}>
                    ${price}
                  </span>
                  {price > 0 && <span className={`text-sm font-body mb-1.5 ${plan.highlight ? 'text-plum-300' : 'text-plum-400'}`}>/mo</span>}
                </div>
                {annual && price > 0 && (
                  <p className={`text-xs font-body mt-1 ${plan.highlight ? 'text-plum-300' : 'text-plum-400'}`}>
                    Billed ${price * 12}/year
                  </p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                      ${plan.highlight ? 'bg-beige-300/30' : 'bg-plum-100'}`}>
                      <Check size={10} className={plan.highlight ? 'text-beige-200' : 'text-plum-600'} strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-body ${plan.highlight ? 'text-plum-100' : 'text-plum-700'}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.price === 0 ? '/onboarding' : plan.name === 'Enterprise' ? '#contact' : '/onboarding'}
                className={`block text-center py-3 rounded-xl text-sm font-medium font-body transition-all duration-200
                  ${plan.highlight
                    ? 'bg-white text-plum-800 hover:bg-beige-50 shadow-soft'
                    : 'bg-plum-600 text-white hover:bg-plum-700 shadow-plum'}`}
              >
                {plan.cta}
              </Link>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
