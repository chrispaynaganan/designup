import { create } from 'zustand'
import { UserProgress } from '../types'

type UserStore = {
  userId: string | null
  progress: UserProgress | null
  isAuthenticated: boolean
  setUserId: (id: string) => void
  setProgress: (progress: UserProgress) => void
  setAuthenticated: (val: boolean) => void
  updateXP: (amount: number) => void
  incrementStreak: () => void
  reset: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  progress: null,
  isAuthenticated: false,

  setUserId: (id) => set({ userId: id }),
  setProgress: (progress) => set({ progress }),
  setAuthenticated: (val) => set({ isAuthenticated: val }),

  updateXP: (amount) =>
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, xp: state.progress.xp + amount }
        : null,
    })),

  incrementStreak: () =>
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, streak: state.progress.streak + 1 }
        : null,
    })),

  reset: () => set({ userId: null, progress: null, isAuthenticated: false }),
}))