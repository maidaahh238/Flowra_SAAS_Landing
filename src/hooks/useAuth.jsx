import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const store = {
  get:    (key)      => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null } catch { return null } },
  set:    (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} },
  remove: (key)      => { try { localStorage.removeItem(key) } catch {} },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => store.get('flowra_user'))

  const signUp = (name, email, password, extra = {}) => {
    const users = store.get('flowra_users') || []
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists. Try signing in instead.' }
    }
    const newUser = { name, email: email.toLowerCase(), password, ...extra, createdAt: Date.now() }
    store.set('flowra_users', [...users, newUser])
    const session = { name, email: email.toLowerCase(), company: extra.company, role: extra.role }
    store.set('flowra_user', session)
    setUser(session)
    return { ok: true }
  }

  const signIn = (email, password) => {
    const users = store.get('flowra_users') || []
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) return { ok: false, error: 'Incorrect email or password. Please try again.' }
    const session = { name: found.name, email: found.email, company: found.company, role: found.role }
    store.set('flowra_user', session)
    setUser(session)
    return { ok: true }
  }

  const signOut = () => { store.remove('flowra_user'); setUser(null) }

  // Update profile info and persist to both session and users list
  const updateProfile = (updates) => {
    if (!user) return { ok: false, error: 'Not signed in.' }
    const updatedSession = { ...user, ...updates }
    store.set('flowra_user', updatedSession)
    setUser(updatedSession)
    // Also update the users list so it persists across sign-ins
    const users = store.get('flowra_users') || []
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === user.email.toLowerCase()
        ? { ...u, ...updates }
        : u
    )
    store.set('flowra_users', updatedUsers)
    return { ok: true }
  }

  const requestPasswordReset = (email) => {
    const users = store.get('flowra_users') || []
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) return { ok: false, error: 'No account found with that email address.' }
    const token = btoa(email.toLowerCase() + ':' + Date.now())
    store.set('flowra_reset_token', { email: email.toLowerCase(), token, createdAt: Date.now() })
    return { ok: true, token }
  }

  const resetPassword = (token, newPassword) => {
    const saved = store.get('flowra_reset_token')
    if (!saved || saved.token !== token) return { ok: false, error: 'Invalid or expired reset link.' }
    if (Date.now() - saved.createdAt > 10 * 60 * 1000) {
      store.remove('flowra_reset_token')
      return { ok: false, error: 'Reset link has expired. Please request a new one.' }
    }
    const users = store.get('flowra_users') || []
    const updated = users.map(u =>
      u.email.toLowerCase() === saved.email ? { ...u, password: newPassword } : u
    )
    store.set('flowra_users', updated)
    store.remove('flowra_reset_token')
    return { ok: true }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateProfile, requestPasswordReset, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
