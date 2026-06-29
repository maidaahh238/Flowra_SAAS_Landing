import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const { user, signOut }       = useAuth()
  const location                = useLocation()
  const navigate                = useNavigate()
  const isLanding               = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = (e) => { if (!e.target.closest('[data-dropdown]')) setDropOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    if (isLanding) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate to landing with hash — Landing.jsx handles the scroll
      navigate(`/#${id}`)
    }
  }

  const navLinks = [
    { label: 'Features',     id: 'features' },
    { label: 'Pricing',      id: 'pricing' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'FAQ',          id: 'faq' },
    { label: 'Contact',      id: 'contact' },
  ]

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U'

  const handleSignOut = () => { signOut(); setDropOpen(false); navigate('/') }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled || !isLanding ? 'bg-cream/95 backdrop-blur-md shadow-soft border-b border-beige-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-plum-500 to-plum-700 flex items-center justify-center shadow-plum">
              <span className="text-white text-sm font-display font-bold">F</span>
            </div>
            <span className="font-display font-semibold text-xl text-plum-800 group-hover:text-plum-600 transition-colors">
              Flowra
            </span>
          </Link>

          {/* Desktop section links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-body text-plum-700 hover:text-plum-500 hover:bg-plum-50 rounded-lg transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" data-dropdown>
                <button
                  onClick={() => setDropOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-beige-200 hover:border-plum-200 bg-white hover:bg-plum-50 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-plum-400 to-plum-600 flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-body font-medium text-plum-800 max-w-[110px] truncate">
                    {user.name}
                  </span>
                </button>
                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-beige-100 shadow-plum py-2 z-50">
                    <div className="px-4 py-2 border-b border-beige-100 mb-1">
                      <p className="text-xs font-body font-semibold text-plum-800 truncate">{user.name}</p>
                      <p className="text-xs font-body text-plum-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-body text-plum-700 hover:bg-plum-50 transition-colors"
                    >
                      <User size={14} /> Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm font-body text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium text-plum-600 hover:text-plum-800 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/onboarding"
                  className="px-5 py-2 text-sm font-medium text-white bg-plum-600 hover:bg-plum-700 rounded-xl shadow-plum transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get started free
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-plum-700 hover:bg-plum-50 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-beige-100 shadow-soft px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left px-4 py-2.5 text-sm text-plum-700 hover:bg-plum-50 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-beige-100 mt-2">
            {user ? (
              <>
                <div className="px-4 py-2">
                  <p className="text-xs font-body font-semibold text-plum-800">{user.name}</p>
                  <p className="text-xs font-body text-plum-400">{user.email}</p>
                </div>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-center text-plum-600 hover:bg-plum-50 rounded-lg transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="px-4 py-2.5 text-sm text-center text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-center text-plum-600 hover:bg-plum-50 rounded-lg transition-colors">
                  Sign in
                </Link>
                <Link to="/onboarding" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm font-medium text-center text-white bg-plum-600 rounded-xl shadow-plum transition-colors">
                  Get started free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
