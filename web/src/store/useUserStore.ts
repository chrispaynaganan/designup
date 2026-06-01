import { create } from 'zustand'
import type { UserProfile, UserProgress, AuthStatus, TrackId } from '@/types'

interface UserStore {
  // Auth
  authStatus: AuthStatus
  userId: string | null

  // Profile + progress (null until loaded from Supabase)
  profile: UserProfile | null
  progress: UserProgress | null

  // Setters
  setAuthStatus: (status: AuthStatus) => void
  setUserId: (id: string | null) => void
  setProfile: (profile: UserProfile | null) => void
  setProgress: (progress: UserProgress | null) => void
  setSelectedTrack: (track: TrackId) => void
  setPurchased: () => void
  reset: () => void
}

const initialState = {
  authStatus: 'loading' as AuthStatus,
  userId: null,
  profile: null,
  progress: null,
}

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,

  setAuthStatus: (authStatus) => set({ authStatus }),

  setUserId: (userId) => set({ userId }),

  setProfile: (profile) => set({ profile }),

  setProgress: (progress) => set({ progress }),

  setSelectedTrack: (track) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, selected_track: track } : null,
    })),

  setPurchased: () =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, is_purchased: true } : null,
    })),

  reset: () => set(initialState),
}))

// ─── Derived selectors ────────────────────────────────────────────────────────
// Use these in components instead of reading store directly

export const selectIsAuthenticated = (s: UserStore) => s.authStatus === 'authenticated'
export const selectIsPurchased = (s: UserStore) => s.profile?.is_purchased ?? false
export const selectHasTrack = (s: UserStore) => s.profile?.selected_track != null
export const selectCurrentDay = (s: UserStore) => s.progress?.current_day ?? 1
export const selectTotalXP = (s: UserStore) => s.progress?.total_xp ?? 0
export const selectStreak = (s: UserStore) => s.progress?.streak ?? 0