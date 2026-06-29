import { useState } from 'react'
import { Send, Check } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'

/* ── Field components defined OUTSIDE Contact so they never remount on re-render ── */
function TextField({ id, label, type = 'text', value, onChange, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-body font-medium text-plum-700 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`w-full px-4 py-3 text-sm font-body bg-white border rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all
          ${error ? 'border-red-300 focus:ring-red-200' : 'border-beige-200 hover:border-plum-200'}`}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-body">{error}</p>}
    </div>
  )
}

function TextArea({ id, label, rows, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-body font-medium text-plum-700 mb-1.5">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={`Your ${label.toLowerCase()}...`}
        className={`w-full px-4 py-3 text-sm font-body bg-white border rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all resize-none
          ${error ? 'border-red-300 focus:ring-red-200' : 'border-beige-200 hover:border-plum-200'}`}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-body">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent]     = useState(false)

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSent(true)
    setForm({ name: '', email: '', company: '', message: '' })
    setErrors({})
  }

  return (
    <SectionWrapper id="contact" bg="bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — info */}
          <div>
            <span className="inline-block mb-3 text-xs font-mono font-medium tracking-widest uppercase text-plum-500 bg-plum-50 px-3 py-1 rounded-full">
              Contact us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-plum-900 mb-4 leading-tight">
              Let's start a<br /><span className="text-gradient">conversation</span>
            </h2>
            <p className="text-plum-600/80 font-body leading-relaxed mb-8">
              Have a question about pricing, a feature request, or just want to say hello? We respond to every message within one business day.
            </p>
            <div className="space-y-4">
              {[
                { icon: '✉', label: 'Email',         val: 'hello@flowra.io' },
                { icon: '◎', label: 'Support hours', val: 'Mon–Fri, 9am–6pm PKT' },
                { icon: '✦', label: 'Response time', val: 'Under 24 hours' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-beige-100">
                  <div className="w-10 h-10 rounded-xl bg-plum-50 flex items-center justify-center text-plum-500 text-lg">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-body text-plum-400">{c.label}</p>
                    <p className="text-sm font-body font-medium text-plum-800">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-3xl border border-beige-100 shadow-soft p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-plum-900 mb-2">Message sent!</h3>
                <p className="text-sm font-body text-plum-500 mb-6">
                  We'll get back to you within one business day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-body text-plum-600 hover:text-plum-800 underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    id="name"
                    label="Full name"
                    value={form.name}
                    onChange={e => setField('name', e.target.value)}
                    error={errors.name}
                  />
                  <TextField
                    id="email"
                    label="Email address"
                    type="email"
                    value={form.email}
                    onChange={e => setField('email', e.target.value)}
                    error={errors.email}
                  />
                </div>
                <TextField
                  id="company"
                  label="Company (optional)"
                  value={form.company}
                  onChange={e => setField('company', e.target.value)}
                  error={errors.company}
                />
                <TextArea
                  id="message"
                  label="Message"
                  rows={4}
                  value={form.message}
                  onChange={e => setField('message', e.target.value)}
                  error={errors.message}
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-plum-600 hover:bg-plum-700 text-white text-sm font-medium font-body rounded-xl shadow-plum transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
