import type { Track } from '@/types'

// ─── XP + curriculum constants ───────────────────────────────────────────────

export const XP_PER_DAY = 100
export const TOTAL_DAYS = 28
export const TOTAL_XP = XP_PER_DAY * TOTAL_DAYS // 2800

export const PHASES = [
  { phase: 1, days: [1, 7],   title: 'Foundations',     description: 'Why design exists, visual principles, tools overview' },
  { phase: 2, days: [8, 14],  title: 'Core skills',      description: 'Track-specific skills' },
  { phase: 3, days: [15, 21], title: 'Applied practice', description: 'Real brief scenarios, accessibility, iteration' },
  { phase: 4, days: [22, 28], title: 'Capstone',         description: 'Build your first portfolio piece' },
] as const

// ─── Pricing constants ────────────────────────────────────────────────────────

export const LAUNCH_PRICE_PHP = 299
export const REGULAR_PRICE_PHP = 699
export const LAUNCH_USER_LIMIT = 100

// ─── Brand ───────────────────────────────────────────────────────────────────

export const BRAND_NAME = 'Layon Obra'
export const BRAND_TAGLINE = 'Purposeful work starts here.'
export const BRAND_EMAIL = 'hello@layonobra.com'
export const BRAND_DOMAIN = 'layonobra.com'

// ─── Tracks ──────────────────────────────────────────────────────────────────

export const TRACKS: Track[] = [
  {
    id: 'ui-design',
    name: 'UI design',
    color: '#534AB7',
    description: 'Components, grids, and visual systems',
    available: true,
  },
  {
    id: 'ux-design',
    name: 'UX design',
    color: '#1D9E75',
    description: 'Research, flows, and wireframes',
    available: true,
  },
  {
    id: 'web-design',
    name: 'Web design',
    color: '#BA7517',
    description: 'Layouts, type, and responsive design',
    available: false,
  },
  {
    id: 'graphic-design',
    name: 'Graphic design',
    color: '#D85A30',
    description: 'Composition, colour, and type',
    available: false,
  },
  {
    id: 'motion-graphics',
    name: 'Motion graphics',
    color: '#D4537E',
    description: 'Animation, timing, and transitions',
    available: false,
  },
  {
    id: '3d-design',
    name: '3D design',
    color: '#378ADD',
    description: 'Modelling, lighting, and render',
    available: false,
  },
]

export const AVAILABLE_TRACKS = TRACKS.filter((t) => t.available)