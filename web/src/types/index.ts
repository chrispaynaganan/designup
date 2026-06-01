// ─── Tracks ──────────────────────────────────────────────────────────────────

export type TrackId =
  | 'ui-design'
  | 'ux-design'
  | 'web-design'
  | 'graphic-design'
  | 'motion-graphics'
  | '3d-design'

export interface Track {
  id: TrackId
  name: string
  color: string
  description: string
  available: boolean // only ui-design + ux-design in v0.1
}

// ─── User & progress ─────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  created_at: string
  selected_track: TrackId | null
  is_purchased: boolean
}

export interface UserProgress {
  id: string
  user_id: string
  current_day: number
  total_xp: number
  streak: number
  last_activity_date: string | null
  completed_days: number[]
  created_at: string
}

// ─── Lessons ─────────────────────────────────────────────────────────────────

export type ActivityType = 'lesson' | 'quiz' | 'challenge' | 'project' | 'milestone'

export interface Lesson {
  day: number
  title: string
  activity_type: ActivityType
  phase: 1 | 2 | 3 | 4
  xp: number
}

export interface LessonContent {
  day: number
  track: TrackId
  title: string
  body: string          // markdown content for lesson type
  activity_type: ActivityType
}

// ─── Auth state ──────────────────────────────────────────────────────────────

export type AuthStatus =
  | 'loading'           // checking session on mount
  | 'unauthenticated'   // no session
  | 'authenticated'     // has session

// ─── Router ──────────────────────────────────────────────────────────────────

export interface RouteParams {
  dayId: string
}