import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const result = requestPasswordReset(email.trim())
      setLoading(false)
      if (result.ok) {
        // Pass token via state so ResetPassword page can read it
        navigate('/reset-password', { state: { token: result.token, email: email.trim() } })
      } else {
        setError(result.error)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-hero flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-80 xl:w-96 bg-gradient-to-b from-plum-800 to-plum-900 flex-col justify-between p-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-beige-300 to-beige-500 flex items-center justify-center">
              <span className="text-plum-900 text-sm font-display font-bold">F</span>
            </div>
            <span className="font-display font-semibold text-xl text-white">Flowra</span>
          </Link>
          <h2 className="font-display text-2xl font-bold text-white mb-3 leading-tight">
            Forgot your<br />password?
          </h2>
          <p className="text-sm font-body text-plum-300 leading-relaxed">
            No worries — it happens to the best of us. Enter your email and we'll get you back in right away.
          </p>
        </div>
        <div className="bg-plum-700/50 rounded-2xl p-5 border border-plum-600">
          <p className="text-xs font-body text-plum-300 mb-1">Need help?</p>
          <p className="text-sm font-display font-semibold text-white">Contact support</p>
          <p className="text-xs font-body text-plum-400 mt-1">hello@flowra.io</p>
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
          <Link to="/signin" className="text-xs font-body text-plum-500 hover:text-plum-800 transition-colors">← Back</Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-plum-100 flex items-center justify-center mb-6">
              <Mail size={26} className="text-plum-600" />
            </div>

            <div className="mb-8">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-plum-900 mb-2">
                Reset your password
              </h1>
              <p className="text-sm font-body text-plum-500">
                Enter the email address linked to your Flowra account and we'll send you a reset link.
              </p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm font-body text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-body font-medium text-plum-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 text-sm font-body bg-white border border-beige-200 hover:border-plum-200 rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-plum-600 hover:bg-plum-700 disabled:opacity-60 text-white text-sm font-medium font-body rounded-xl shadow-plum transition-all duration-200 hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <>Continue <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 text-sm font-body text-plum-500 hover:text-plum-800 transition-colors"
              >
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
