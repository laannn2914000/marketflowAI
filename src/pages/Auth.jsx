import { useState } from 'react'
import { ArrowRight, Building2, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { defaultUsers } from '../data/users.js'

const USERS_KEY = 'smartseo_users'

function getUsers() {
  const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || 'null')
  if (storedUsers?.length) return storedUsers

  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
  return defaultUsers
}

export default function Auth({ onLogin }) {
  const [accountType, setAccountType] = useState('personal')
  const [authMode, setAuthMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' })
  const [error, setError] = useState('')

  const isLogin = authMode === 'login'

  function updateForm(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const email = form.email.trim().toLowerCase()
    const users = getUsers()

    if (isLogin) {
      const user = users.find(
        (candidate) => candidate.email === email && candidate.password === form.password && candidate.accountType === accountType,
      )

      if (!user) {
        setError('Email, password, or account type is incorrect.')
        return
      }

      onLogin(user)
      return
    }

    if (!form.name.trim() || (accountType === 'enterprise' && !form.company.trim())) {
      setError(accountType === 'enterprise' ? 'Please enter your full name and company name.' : 'Please enter your full name.')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (users.some((candidate) => candidate.email === email)) {
      setError('This email is already registered.')
      return
    }

    const newUser = {
      name: form.name.trim(),
      company: form.company.trim(),
      email,
      password: form.password,
      accountType,
      role: 'member',
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
    onLogin(newUser)
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-3 py-4 sm:px-4 sm:py-8">
      <div className="w-full max-w-5xl min-h-[calc(100vh-2rem)] sm:min-h-[650px] grid lg:grid-cols-[0.9fr_1.1fr] bg-white rounded-xl sm:rounded-2xl shadow-[0_24px_80px_rgba(15,18,34,0.12)] overflow-hidden">
        <section className="hidden lg:flex bg-brand-gradient text-black p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border-[42px] border-brand-500/20" />
          <div className="absolute -left-32 bottom-20 w-80 h-80 rounded-full border-[1px] border-white/10" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-16">
              <div className="w-8 h-8 rounded-md bg-brand-500 flex items-center justify-center font-bold">S</div>
              <span className=" text-white font-bold tracking-tight text-lg">SmartSEO</span>
            </div>
            <p className="text-white text-sm font-semibold mb-4">Marketing optimization, simplified</p>
            <h1 className="text-4xl text-white font-bold tracking-tight leading-tight max-w-sm">Build a smarter path to measurable growth.</h1>
            <p className="mt-5 text-white leading-relaxed max-w-sm">One focused solution to optimize your marketing performance, reach the right audience, and grow with confidence.</p>
          </div>
          <div className="relative space-y-4 text-sm text-white">
            {['Optimize every marketing channel', 'Reach high-value audiences', 'Turn insights into growth'].map((item) => (
              <div key={item} className="flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-black/10 text-black flex items-center justify-center"><Check size={13} /></span>{item}</div>
            ))}
          </div>
        </section>

        <section className="p-5 sm:p-12 flex flex-col justify-center">
          <div className="lg:hidden flex items-center gap-2 mb-8 sm:mb-10">
            <div className="w-8 h-8 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold">S</div>
            <span className="font-semibold tracking-tight text-ink-900 text-lg">SmartSEO</span>
          </div>
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <p className="text-sm text-brand-600 font-semibold mb-2">Your marketing, optimized</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900">{isLogin ? 'Sign in to your workspace' : 'Create your account'}</h2>
              <p className="text-sm text-ink-500 mt-2">{isLogin ? 'Continue optimizing your marketing performance.' : 'Start building a more effective growth strategy.'}</p>
            </div>

            <div className="grid grid-cols-2 gap-1 p-1 bg-ink-100/70 rounded-lg mb-6">
              {['personal', 'enterprise'].map((type) => (
                <button key={type} type="button" onClick={() => { setAccountType(type); setError('') }} className={`py-2.5 rounded-md text-sm font-medium transition ${accountType === type ? 'bg-white text-black shadow-sm' : 'text-ink-500 hover:text-black'}`}>
                  {type === 'personal' ? 'Personal' : 'Enterprise'}
                </button>
              ))}
            </div>

            <div className="flex gap-6 border-b border-ink-100 mb-6">
              {['login', 'register'].map((mode) => (
                <button key={mode} type="button" onClick={() => { setAuthMode(mode); setError('') }} className={`pb-3 text-sm font-medium border-b-2 transition ${authMode === mode ? 'border-brand-500 text-brand-600' : 'border-transparent text-ink-400 hover:text-ink-700'}`}>
                  {mode === 'login' ? 'Sign in' : 'Sign up'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && <label className="block"><span className="text-sm font-medium text-ink-700">Full name</span><div className="auth-field"><UserRound className="auth-field-icon" size={17} /><input name="name" value={form.name} onChange={updateForm} placeholder="Alex Morgan" className="auth-input" /></div></label>}
              {!isLogin && accountType === 'enterprise' && <label className="block"><span className="text-sm font-medium text-ink-700">Company name</span><div className="auth-field"><Building2 className="auth-field-icon" size={17} /><input name="company" value={form.company} onChange={updateForm} placeholder="Acme Inc." className="auth-input" /></div></label>}
              <label className="block"><span className="text-sm font-medium text-ink-700">Email</span><div className="auth-field"><Mail className="auth-field-icon" size={17} /><input name="email" type="email" value={form.email} onChange={updateForm} placeholder={accountType === 'enterprise' ? 'you@company.com' : 'you@example.com'} className="auth-input" required /></div></label>
              <label className="block"><span className="text-sm font-medium text-ink-700">Password</span><div className="auth-field auth-field-password"><LockKeyhole className="auth-field-icon" size={17} /><input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateForm} placeholder="Enter your password" className="auth-input" required minLength={isLogin ? undefined : 8} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="auth-password-toggle" aria-label="Show or hide password">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
              {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">{error}</p>}
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 rounded-lg transition shadow-sm">{isLogin ? 'Sign in' : 'Create account'} <ArrowRight size={17} /></button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}