import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, KeyRound, Check, ArrowLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const token     = location.state?.token  || ''
  const email     = location.state?.email  || ''

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPass,  setShowPass]  = useState(false)
  const [showConf,  setShowConf]  = useState(false)
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)

  // If someone lands here without a token, redirect to forgot-password
  if (!token) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <KeyRound size={26} className="text-red-500" />
          </div>
          <h2 className="font-display text-xl font-bold text-plum-900 mb-2">Invalid reset link</h2>
          <p className="text-sm font-body text-plum-500 mb-6">This link is missing or has expired. Please request a new password reset.</p>
          <Link to="/forgot-password" className="inline-flex items-center gap-2 px-6 py-3 bg-plum-600 text-white text-sm font-medium rounded-xl shadow-plum hover:bg-plum-700 transition-all">
            Request new link
          </Link>
        </div>
      </div>
    )
  }

  const strengthScore = (p) => {
    let s = 0
    if (p.length >= 8)           s++
    if (/[A-Z]/.test(p))         s++
    if (/[0-9]/.test(p))         s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }
  const strength = strengthScore(password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] || ''
  const strengthColor = ['', 'bg-red-400', 'bg-beige-400', 'bg-yellow-400', 'bg-green-500'][strength] || ''

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8)      { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm)      { setError('Passwords do not match.'); return }
    setLoading(true)
    setTimeout(() => {
      const result = resetPassword(token, password)
      setLoading(false)
      if (result.ok) {
        setSuccess(true)
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
            Create a new<br />password.
          </h2>
          <p className="text-sm font-body text-plum-300 leading-relaxed mb-6">
            Choose something strong and unique. A good password has a mix of letters, numbers, and symbols.
          </p>
          <ul className="space-y-2">
            {['At least 8 characters', 'One uppercase letter', 'One number', 'One special character'].map(tip => (
              <li key={tip} className="flex items-center gap-2 text-xs font-body text-plum-300">
                <div className="w-1.5 h-1.5 rounded-full bg-beige-400 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-plum-700/50 rounded-2xl p-5 border border-plum-600">
          <p className="text-xs font-body text-plum-300 mb-1">Resetting for</p>
          <p className="text-sm font-display font-semibold text-white truncate">{email}</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-beige-100 bg-white/80 backdrop-blur">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-plum-500 to-plum-700 flex items-center justify-center">
              <span className="text-white text-xs font-display font-bold">F</span>
            </div>
            <span className="font-display font-semibold text-lg text-plum-800">Flowra</span>
          </Link>
          <Link to="/signin" className="text-xs font-body text-plum-500 hover:text-plum-800 transition-colors">← Sign in</Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {success ? (
              /* ── Success state ── */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check size={30} className="text-green-600" />
                </div>
                <h1 className="font-display text-2xl font-bold text-plum-900 mb-2">Password updated!</h1>
                <p className="text-sm font-body text-plum-500 mb-8">
                  Your password has been changed successfully. You can now sign in with your new password.
                </p>
                <button
                  onClick={() => navigate('/signin')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-plum-600 hover:bg-plum-700 text-white text-sm font-medium font-body rounded-xl shadow-plum transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sign in now
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <div className="w-14 h-14 rounded-2xl bg-plum-100 flex items-center justify-center mb-6">
                  <KeyRound size={26} className="text-plum-600" />
                </div>

                <div className="mb-8">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-plum-900 mb-2">
                    Set new password
                  </h1>
                  <p className="text-sm font-body text-plum-500">
                    Resetting password for <span className="font-medium text-plum-700">{email}</span>
                  </p>
                </div>

                {error && (
                  <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm font-body text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* New password */}
                  <div>
                    <label className="block text-sm font-body font-medium text-plum-700 mb-1.5">
                      New password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError('') }}
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-3 text-sm font-body bg-white border border-beige-200 hover:border-plum-200 rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        className="absolute right-3 top-3.5 text-plum-300 hover:text-plum-600 transition-colors"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1,2,3,4].map(i => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-beige-100'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-body text-plum-400">
                          Strength: <span className="font-medium text-plum-700">{strengthLabel}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="block text-sm font-body font-medium text-plum-700 mb-1.5">
                      Confirm new password
                    </label>
                    <div className="relative">
                      <input
                        type={showConf ? 'text' : 'password'}
                        value={confirm}
                        onChange={e => { setConfirm(e.target.value); setError('') }}
                        placeholder="Re-enter your password"
                        className={`w-full px-4 py-3 text-sm font-body bg-white border rounded-xl text-plum-800 placeholder-plum-300 focus:outline-none focus:ring-2 focus:ring-plum-300 transition-all pr-11
                          ${confirm.length > 0 && confirm !== password ? 'border-red-300' : confirm.length > 0 && confirm === password ? 'border-green-400' : 'border-beige-200 hover:border-plum-200'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConf(v => !v)}
                        className="absolute right-3 top-3.5 text-plum-300 hover:text-plum-600 transition-colors"
                      >
                        {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {confirm.length > 0 && confirm === password && (
                        <div className="absolute right-9 top-3.5">
                          <Check size={16} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    {confirm.length > 0 && confirm !== password && (
                      <p className="mt-1 text-xs text-red-500 font-body">Passwords do not match</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-plum-600 hover:bg-plum-700 disabled:opacity-60 text-white text-sm font-medium font-body rounded-xl shadow-plum transition-all duration-200 hover:-translate-y-0.5 mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Updating…
                      </span>
                    ) : (
                      <>Update password</>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signin" className="inline-flex items-center gap-1.5 text-sm font-body text-plum-500 hover:text-plum-800 transition-colors">
                    <ArrowLeft size={14} /> Back to sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
