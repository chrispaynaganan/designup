import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'
import { ROUTES } from '@/constants/routes'
import { TRACKS, LAUNCH_PRICE_PHP, REGULAR_PRICE_PHP, LAUNCH_USER_LIMIT, BRAND_NAME, BRAND_EMAIL } from '@/constants/tracks'

const HEADLINES_GUEST = [
  "Your design career starts here.",
  "28 days. One real portfolio piece.",
  "Stop watching. Start building.",
  "The course that ends with something real.",
  "Design skills, career-ready.",
]

const HEADLINES_USER = (name: string) => [
  `Welcome back, ${name}.`,
  `Ready to keep going, ${name}?`,
  `${name}, your portfolio piece is waiting.`,
  `Good to see you, ${name}.`,
  `Pick up where you left off, ${name}.`,
]

const SUBHEADLINES = [
  "A gamified 28-day curriculum for career shifters. Structured, focused, and ends with a real portfolio piece you can show employers.",
  "Not another video library. A real curriculum built for people making the switch into design — with streaks, XP, and a capstone project.",
  "₱299. 28 days. One portfolio piece. No filler, no fluff — just the skills that get you hired.",
]

export default function LandingPage() {
  const profile = useUserStore((s) => s.profile)
  const authStatus = useUserStore((s) => s.authStatus)

  const [headlineIndex] = useState(() => Math.floor(Math.random() * 5))
  const [subIndex] = useState(() => Math.floor(Math.random() * SUBHEADLINES.length))
  const subheadline = SUBHEADLINES[subIndex]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const isLoggedIn = authStatus === 'authenticated'
  const isPurchased = profile?.is_purchased ?? false
  const firstName = null as string | null

  const headline = firstName
    ? HEADLINES_USER(firstName)[headlineIndex]
    : HEADLINES_GUEST[headlineIndex]

  const words = headline.split(' ')
  const headlineStart = words.slice(0, -2).join(' ')
  const headlineEnd = words.slice(-2).join(' ')

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#FAF8F5] text-[#1A1916] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-marquee { animation: marquee 24s linear infinite; }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-6xl mx-auto">
        <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-[#1A1916] text-xl">
          {BRAND_NAME}
        </span>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              to={isPurchased ? ROUTES.DASHBOARD : ROUTES.PRICING}
              className="px-4 py-2 rounded-lg bg-[#1A1916] text-[#FAF8F5] text-sm font-medium hover:bg-[#2e2b26] transition-colors"
            >
              {isPurchased ? 'Go to dashboard →' : 'Continue →'}
            </Link>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="text-sm text-[#888580] hover:text-[#1A1916] transition-colors">
                Log in
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="px-4 py-2 rounded-lg bg-[#1A1916] text-[#FAF8F5] text-sm font-medium hover:bg-[#2e2b26] transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-medium mb-10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#534AB7] animate-pulse inline-block" />
          Launch price · ₱{LAUNCH_PRICE_PHP} for the first {LAUNCH_USER_LIMIT} learners
        </div>

        <div className={`transition-all duration-600 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-5xl sm:text-6xl lg:text-[80px] leading-[1.05] tracking-tight text-[#1A1916] max-w-3xl">
            {headlineStart}{' '}
            <span className="italic">{headlineEnd}</span>
          </h1>
        </div>

        <div className={`mt-8 flex flex-col sm:flex-row sm:items-end gap-8 transition-all duration-600 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <p className="text-base sm:text-lg text-[#64615C] leading-relaxed max-w-md">
            {subheadline}
          </p>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              to={isLoggedIn && isPurchased ? ROUTES.DASHBOARD : ROUTES.SIGNUP}
              className="px-7 py-3.5 rounded-xl bg-[#534AB7] text-white text-sm font-medium hover:bg-[#3C3489] transition-colors text-center whitespace-nowrap"
            >
              {isLoggedIn && isPurchased ? 'Continue learning' : `Start for ₱${LAUNCH_PRICE_PHP}`}
            </Link>
            <p className="text-[11px] text-[#B4B2A9] text-center">
              One-time · Certificate included · No expiry
            </p>
          </div>
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────────────────── */}
      <div className={`mt-12 border-y border-[#E8E4DE] bg-[#F2EFE9] py-3 overflow-hidden transition-all duration-600 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...Array(3)].flatMap((_, i) =>
            ['28-day curriculum', '·', 'UI design', '·', 'UX design', '·',
             'Gamified learning', '·', 'Real capstone project', '·',
             'Certificate included', '·', 'Career-transition focused', '·',
             'PH-built for PH learners', '·',
            ].map((item, j) => (
              <span key={`${i}-${j}`} className="text-xs font-medium text-[#888580] tracking-wide shrink-0">
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Tracks ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-[#B4B2A9] uppercase tracking-widest mb-2">Tracks</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-3xl sm:text-4xl text-[#1A1916]">
              Pick your path.
            </h2>
          </div>
          <p className="text-sm text-[#B4B2A9] hidden sm:block">More tracks coming soon</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TRACKS.map((track) => (
            <div
              key={track.id}
              className={`relative rounded-2xl p-5 border transition-all duration-200 ${
                track.available
                  ? 'border-[#E8E4DE] bg-white hover:border-[#534AB7]/30 hover:shadow-sm cursor-pointer'
                  : 'border-[#E8E4DE] bg-[#F7F5F1] opacity-50 cursor-not-allowed'
              }`}
            >
              <div
                className="w-8 h-8 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: track.color + '18' }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: track.color }} />
              </div>
              <p className="text-sm font-medium text-[#1A1916] leading-tight">{track.name}</p>
              <p className="text-xs text-[#B4B2A9] mt-1 leading-snug">{track.description}</p>
              {!track.available && (
                <span className="absolute top-3 right-3 text-[10px] text-[#B4B2A9] font-medium">Soon</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        <div className="mb-8">
          <p className="text-xs font-medium text-[#B4B2A9] uppercase tracking-widest mb-2">The curriculum</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-3xl sm:text-4xl text-[#1A1916]">
            How 28 days works.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { phase: 'Phase 1 · Days 1–7',   label: 'Foundations',      desc: 'Why design exists, visual principles, and tool orientation.' },
            { phase: 'Phase 2 · Days 8–14',  label: 'Core skills',      desc: 'Track-specific skills. UI or UX — diverges here.' },
            { phase: 'Phase 3 · Days 15–21', label: 'Applied practice', desc: 'Real brief scenarios, accessibility, iteration.' },
            { phase: 'Phase 4 · Days 22–28', label: 'Capstone',         desc: 'Build your portfolio piece from brief to final presentation.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-[#E8E4DE] bg-white p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#534AB7]/20 rounded-l-2xl" />
              <p className="text-[11px] font-medium text-[#534AB7] mb-3 tracking-wide">{item.phase}</p>
              <p className="text-base font-medium text-[#1A1916] mb-1">{item.label}</p>
              <p className="text-sm text-[#888580] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing CTA ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-32">
        <div className="rounded-3xl bg-[#1A1916] p-8 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
          <div className="max-w-lg">
            <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-3xl sm:text-4xl text-white leading-tight mb-4">
              Less than a bootcamp.{' '}
              <span className="italic text-[#7F77DD]">More than you'd expect.</span>
            </h2>
            <p className="text-[#888580] text-sm leading-relaxed">
              Local bootcamps charge ₱5,000–₱30,000. {BRAND_NAME} is ₱{LAUNCH_PRICE_PHP} — one payment,
              everything included, no expiry. You keep the certificate, the portfolio piece, and the skills forever.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {['Certificate included', 'Lifetime access', 'Real portfolio piece', 'No hidden fees'].map((item) => (
                <span key={item} className="text-xs text-[#5F5E5A] flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#534AB7] inline-block" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <p className="text-[11px] text-[#5F5E5A] uppercase tracking-widest mb-1">Launch price</p>
            <p style={{ fontFamily: "'DM Serif Display', serif" }} className="text-6xl text-white">
              ₱{LAUNCH_PRICE_PHP}
            </p>
            <p className="text-sm text-[#5F5E5A] line-through mt-0.5">₱{REGULAR_PRICE_PHP} regular</p>
            <Link
              to={ROUTES.SIGNUP}
              className="mt-6 inline-block px-7 py-3.5 rounded-xl bg-[#534AB7] text-white text-sm font-medium hover:bg-[#7F77DD] transition-colors"
            >
              Claim launch price →
            </Link>
            <p className="text-[11px] text-[#5F5E5A] mt-2">First {LAUNCH_USER_LIMIT} learners only</p>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#E8E4DE] px-6 sm:px-10 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-[#1A1916] text-lg">
          {BRAND_NAME}
        </span>
        <p className="text-xs text-[#B4B2A9]">
          © 2026 {BRAND_NAME} · Made for PH designers · {BRAND_EMAIL}
        </p>
      </footer>
    </div>
  )
}