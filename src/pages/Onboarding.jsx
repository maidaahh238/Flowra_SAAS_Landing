import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'

const STEPS = [
  { id: 1, label: 'Account',    title: 'Create your account',       subtitle: 'Start your 14-day free trial — no card needed.' },
  { id: 2, label: 'Workspace',  title: 'Set up your workspace',     subtitle: 'Tell us a little about your team.' },
  { id: 3, label: 'Preferences',title: 'Customize your experience', subtitle: 'Choose how you want to use Flowra.' },
  { id: 4, label: 'Done',       title: "You're all set!",           subtitle: 'Your workspace is ready. Welcome to Flowra.' },
]

const TEAM_SIZES = ['Just me', '2–5 people', '6–20 people', '21–100 people', '100+ people']
const ROLES      = ['Founder / CEO', 'Product Manager', 'Engineer / Developer', 'Designer', 'Marketing', 'Operations', 'Other']
const USE_CASES  = ['Project management', 'Product roadmap', 'Engineering sprints', 'Marketing campaigns', 'Design handoffs', 'Client work', 'HR & hiring']

function ProgressBar({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.slice(0, 3).map((s, i) => (
        <div key={s.id} className="flex items-center flex-1 last:flex-none">
          <div className={`flex items-center gap-2 ${i < current - 1 ? 'text-plum-600' : i === current - 1 ? 'text-plum-700' : 'text-plum-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 flex-shrink-0
              ${i < current - 1 ? 'bg-plum-600 text-white' : i === current - 1 ? 'bg-white border-2 border-plum-600 text-plum-700' : 'bg-beige-100 text-plum-300'}`}>
              {i < current - 1 ? <Check size={14} /> : s.id}
            </div>
            <span className="text-xs font-body font-medium hidden sm:block">{s.label}</span>
          </div>
          {i < 2 && (
            <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all duration-500 ${i < current - 1 ? 'bg-plum-400' : 'bg-beige-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── InputField defined OUTSIDE so it never re-mounts on parent re-render ─── */
function InputField({ id, label, type, value, onChange, error, showPass, onTogglePass }) {
  return (
    <div>
      <label className="block text-sm font-body font-medium text-plum-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={id === 'password' ? (showPass ? 'text' : 'password') : (type || 'text')}
          value={value}
          onChange={onChange}
          placeholder={label}
          autoComplete={id === 'password' ? 'new-password' : id === 'email' ? 'email' : 'off'}
          className={`w-full px-4 py-3 text-sm font-body bg-white border rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all
            ${error ? 'border-red-300 focus:ring-red-200' : 'border-beige-200 hover:border-plum-200'}`}
        />
        {id === 'password' && (
          <button
            type="button"
            onClick={onTogglePass}
            className="absolute right-3 top-3.5 text-plum-300 hover:text-plum-600 transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-body">{error}</p>}
    </div>
  )
}

export default function Onboarding() {
  const { signUp } = useAuth()
  const navigate   = useNavigate()

  const [step,     setStep]     = useState(1)
  const [showPass, setShowPass] = useState(false)
  const [errors,   setErrors]   = useState({})
  const [authErr,  setAuthErr]  = useState('')
  const [loading,  setLoading]  = useState(false)

  const [data, setData] = useState({
    name: '', email: '', password: '',
    company: '', size: '', role: '',
    useCases: [], notifications: true, theme: 'light',
  })

  const setField = (k, v) => {
    setData(d => ({ ...d, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
    setAuthErr('')
  }

  const toggleUseCase = (uc) => {
    setData(d => ({
      ...d,
      useCases: d.useCases.includes(uc)
        ? d.useCases.filter(u => u !== uc)
        : [...d.useCases, uc],
    }))
  }

  const validateStep = () => {
    const e = {}
    if (step === 1) {
      if (!data.name.trim())    e.name     = 'Please enter your name'
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                                e.email    = 'Please enter a valid email'
      if (data.password.length < 8) e.password = 'Password must be at least 8 characters'
    }
    if (step === 2) {
      if (!data.company.trim()) e.company  = 'Please enter a company name'
      if (!data.size)           e.size     = 'Please select a team size'
      if (!data.role)           e.role     = 'Please select your role'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validateStep()) return
    if (step === 3) {
      // Final step — create account
      setLoading(true)
      setTimeout(() => {
        const result = signUp(data.name, data.email, data.password, {
          company: data.company,
          size:    data.size,
          role:    data.role,
        })
        setLoading(false)
        if (result.ok) {
          setStep(4)
        } else {
          setAuthErr(result.error)
        }
      }, 400)
    } else {
      setStep(s => s + 1)
    }
  }

  const back = () => setStep(s => s - 1)

  return (
    <div className="min-h-screen bg-hero flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-80 xl:w-96 bg-gradient-to-b from-plum-800 to-plum-900 flex-col justify-between p-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-beige-300 to-beige-500 flex items-center justify-center">
              <span className="text-plum-900 text-sm font-display font-bold">F</span>
            </div>
            <span className="font-display font-semibold text-xl text-white">Flowra</span>
          </Link>
          <h2 className="font-display text-2xl font-bold text-white mb-3 leading-tight">
            Everything your<br />team needs to ship.
          </h2>
          <p className="text-sm font-body text-plum-300 leading-relaxed mb-8">
            Join 12,000+ teams already using Flowra to manage projects, track goals, and collaborate in real time.
          </p>
          <ul className="space-y-3">
            {['14-day free trial, no card needed', 'Set up in under 2 minutes', 'Import from any other tool', 'Cancel anytime, no questions asked'].map(b => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-body text-plum-200">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-beige-300/20 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-beige-300" strokeWidth={3} />
                </div>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-plum-700/50 rounded-2xl p-5 border border-plum-600">
          <p className="text-xs font-body text-plum-300 mb-1">Rated 4.9 / 5 on G2</p>
          <p className="text-sm font-display font-semibold text-white">"Best project tool we've ever used."</p>
          <p className="text-xs font-body text-plum-400 mt-1">— Sarah Chen, Luminary AI</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-beige-100 bg-white/80 backdrop-blur">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-plum-500 to-plum-700 flex items-center justify-center">
              <span className="text-white text-xs font-display font-bold">F</span>
            </div>
            <span className="font-display font-semibold text-lg text-plum-800">Flowra</span>
          </Link>
          <Link to="/" className="text-xs font-body text-plum-500 hover:text-plum-800 transition-colors">← Back</Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-lg">

            {step < 4 && <ProgressBar current={step} />}

            <div className="mb-8">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-plum-900 mb-2">{STEPS[step - 1].title}</h1>
              <p className="text-sm font-body text-plum-500">{STEPS[step - 1].subtitle}</p>
              {step === 1 && (
                <p className="text-sm font-body text-plum-400 mt-1">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-plum-600 font-medium underline underline-offset-2 hover:text-plum-800 transition-colors">
                    Sign in
                  </Link>
                </p>
              )}
            </div>

            {/* Auth error banner */}
            {authErr && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm font-body text-red-600">
                {authErr}
              </div>
            )}

            {/* ── Step 1: Account ── */}
            {step === 1 && (
              <div className="space-y-4">
                <InputField
                  id="name" label="Full name" type="text"
                  value={data.name}
                  onChange={e => setField('name', e.target.value)}
                  error={errors.name}
                />
                <InputField
                  id="email" label="Work email" type="email"
                  value={data.email}
                  onChange={e => setField('email', e.target.value)}
                  error={errors.email}
                />
                <InputField
                  id="password" label="Password" type="password"
                  value={data.password}
                  onChange={e => setField('password', e.target.value)}
                  error={errors.password}
                  showPass={showPass}
                  onTogglePass={() => setShowPass(v => !v)}
                />
                <p className="text-xs font-body text-plum-400">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-plum-600 underline underline-offset-2">Terms</a> and{' '}
                  <a href="#" className="text-plum-600 underline underline-offset-2">Privacy Policy</a>.
                </p>
              </div>
            )}

            {/* ── Step 2: Workspace ── */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-body font-medium text-plum-700 mb-1.5">Company name</label>
                  <input
                    value={data.company}
                    onChange={e => setField('company', e.target.value)}
                    placeholder="Your company or team name"
                    className={`w-full px-4 py-3 text-sm font-body bg-white border rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all ${errors.company ? 'border-red-300' : 'border-beige-200 hover:border-plum-200'}`}
                  />
                  {errors.company && <p className="mt-1 text-xs text-red-500 font-body">{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-plum-700 mb-2">Team size</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TEAM_SIZES.map(s => (
                      <button key={s} type="button" onClick={() => setField('size', s)}
                        className={`px-3 py-2.5 text-xs font-body rounded-xl border text-left transition-all
                          ${data.size === s ? 'border-plum-400 bg-plum-50 text-plum-700 font-medium' : 'border-beige-200 bg-white text-plum-600 hover:border-plum-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.size && <p className="mt-1 text-xs text-red-500 font-body">{errors.size}</p>}
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-plum-700 mb-2">Your role</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ROLES.map(r => (
                      <button key={r} type="button" onClick={() => setField('role', r)}
                        className={`px-3 py-2.5 text-xs font-body rounded-xl border text-left transition-all
                          ${data.role === r ? 'border-plum-400 bg-plum-50 text-plum-700 font-medium' : 'border-beige-200 bg-white text-plum-600 hover:border-plum-200'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                  {errors.role && <p className="mt-1 text-xs text-red-500 font-body">{errors.role}</p>}
                </div>
              </div>
            )}

            {/* ── Step 3: Preferences ── */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-body font-medium text-plum-700 mb-2">
                    What will you mainly use Flowra for?{' '}
                    <span className="text-plum-400 font-normal">(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {USE_CASES.map(uc => (
                      <button key={uc} type="button" onClick={() => toggleUseCase(uc)}
                        className={`px-4 py-2 text-xs font-body rounded-full border transition-all
                          ${data.useCases.includes(uc) ? 'border-plum-400 bg-plum-600 text-white' : 'border-beige-200 bg-white text-plum-600 hover:border-plum-300'}`}>
                        {uc}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-plum-700 mb-2">Preferred theme</label>
                  <div className="flex gap-3">
                    {[{ v: 'light', label: 'Light', icon: '☀' }, { v: 'dark', label: 'Dark', icon: '◐' }].map(t => (
                      <button key={t.v} type="button" onClick={() => setField('theme', t.v)}
                        className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-body transition-all
                          ${data.theme === t.v ? 'border-plum-400 bg-plum-50 text-plum-700 font-medium' : 'border-beige-200 bg-white text-plum-500 hover:border-plum-200'}`}>
                        <span>{t.icon}</span>{t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-beige-100">
                  <div>
                    <p className="text-sm font-body font-medium text-plum-800">Email notifications</p>
                    <p className="text-xs font-body text-plum-400">Get updates on task changes and comments</p>
                  </div>
                  <button type="button" onClick={() => setField('notifications', !data.notifications)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${data.notifications ? 'bg-plum-600' : 'bg-beige-200'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${data.notifications ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 4: Success ── */}
            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center mx-auto mb-6 shadow-plum">
                  <Check size={36} className="text-white" />
                </div>
                <div className="bg-cream rounded-2xl border border-beige-100 p-5 mb-8 text-left">
                  <p className="text-xs font-mono text-plum-400 uppercase tracking-widest mb-3">Your workspace summary</p>
                  <div className="space-y-2">
                    {[
                      { k: 'Name',      v: data.name    || '—' },
                      { k: 'Email',     v: data.email   || '—' },
                      { k: 'Company',   v: data.company || '—' },
                      { k: 'Team size', v: data.size    || '—' },
                      { k: 'Role',      v: data.role    || '—' },
                    ].map(r => (
                      <div key={r.k} className="flex justify-between text-sm">
                        <span className="font-body text-plum-400">{r.k}</span>
                        <span className="font-body font-medium text-plum-800">{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-plum-600 hover:bg-plum-700 text-white text-sm font-medium font-body rounded-2xl shadow-plum transition-all duration-200 hover:-translate-y-0.5"
                >
                  Go to my dashboard
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button type="button" onClick={back}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-body font-medium text-plum-600 bg-white border border-beige-200 hover:border-plum-200 rounded-xl transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                <button type="button" onClick={next} disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-body font-medium text-white bg-plum-600 hover:bg-plum-700 disabled:opacity-60 rounded-xl shadow-plum transition-all duration-200 hover:-translate-y-0.5">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Creating account…
                    </>
                  ) : (
                    <>{step === 3 ? 'Finish setup' : 'Continue'} <ArrowRight size={16} /></>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
