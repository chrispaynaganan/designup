import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ROUTES } from '@/constants/routes'
import { BRAND_NAME } from '@/constants/tracks'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [linkedinLoading, setLinkedinLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${ROUTES.PRICING}`,
      },
    })

    setLoading(false)
    if (error) { setError(error.message); return }
    setDone(true)
  }

  async function handleGoogleSignUp() {
    setError(null)
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${ROUTES.PRICING}` },
    })
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  async function handleLinkedInSignUp() {
    setError(null)
    setLinkedinLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: `${window.location.origin}${ROUTES.PRICING}` },
    })
    if (error) { setError(error.message); setLinkedinLoading(false) }
  }

  // ── Email sent state ──────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=DM+Serif+Display:ital@0;1&display=swap');`}</style>
        <div className="max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#534AB7]/10 flex items-center justify-center mx-auto mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-3xl text-[#1A1916] mb-3">
            Check your email.
          </h1>
          <p className="text-[#888580] text-sm leading-relaxed mb-8">
            We sent a confirmation link to <span className="text-[#1A1916] font-medium">{email}</span>.
            Click it to confirm your account and you'll be taken straight to checkout.
          </p>
          <p className="text-xs text-[#B4B2A9]">
            Wrong email?{' '}
            <button onClick={() => setDone(false)} className="text-[#534AB7] hover:underline">
              Go back
            </button>
          </p>
        </div>
      </div>
    )
  }

  // ── Sign up form ──────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display:ital@0;1&display=swap');`}</style>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-6xl mx-auto w-full">
        <Link to={ROUTES.HOME} style={{ fontFamily: "'DM Serif Display', serif" }} className="text-[#1A1916] text-xl">
          {BRAND_NAME}
        </Link>
        <p className="text-sm text-[#888580]">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-[#534AB7] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h1 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-4xl text-[#1A1916] mb-2">
              Create your account.
            </h1>
            <p className="text-sm text-[#888580]">
              One account. 28 days. Your first design career.
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={googleLoading || linkedinLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#E8E4DE] bg-white text-sm font-medium text-[#1A1916] hover:bg-[#F7F5F1] transition-colors disabled:opacity-60 mb-3"
          >
            {googleLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-[#534AB7] border-t-transparent animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {googleLoading ? 'Connecting...' : 'Continue with Google'}
          </button>

          {/* LinkedIn button */}
          <button
            onClick={handleLinkedInSignUp}
            disabled={googleLoading || linkedinLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#E8E4DE] bg-white text-sm font-medium text-[#1A1916] hover:bg-[#F7F5F1] transition-colors disabled:opacity-60 mb-4"
          >
            {linkedinLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-[#0A66C2] border-t-transparent animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            )}
            {linkedinLoading ? 'Connecting...' : 'Continue with LinkedIn'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#E8E4DE]" />
            <span className="text-xs text-[#B4B2A9]">or</span>
            <div className="flex-1 h-px bg-[#E8E4DE]" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSignUp} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-[#64615C] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E8E4DE] bg-white text-sm text-[#1A1916] placeholder-[#B4B2A9] focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64615C] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E4DE] bg-white text-sm text-[#1A1916] placeholder-[#B4B2A9] focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10 transition-colors"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#534AB7] text-white text-sm font-medium hover:bg-[#3C3489] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Creating account...
                </>
              ) : 'Create account'}
            </button>
          </form>

          <p className="text-[11px] text-[#B4B2A9] text-center mt-5 leading-relaxed">
            By signing up you agree to our{' '}
            <a href="#" className="underline hover:text-[#888580]">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-[#888580]">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}