export type Track = {
  id: string
  name: string
  description: string
  color: string
  icon: string
  totalDays: number
}

export type UserProgress = {
  userId: string
  trackId: string
  currentDay: number
  xp: number
  streak: number
  lastCompletedAt: string | null
  isPurchased: boolean
}

export type Lesson = {
  id: string
  trackId: string
  day: number
  title: string
  type: 'lesson' | 'quiz' | 'challenge' | 'project' | 'milestone'
  xpReward: number
  content: LessonContent[]
}

export type LessonContent = {
  type: 'text' | 'quiz' | 'drag'
  data: Record<string, unknown>
}

export type RootStackParamList = {
  Onboarding: undefined
  TrackSelect: undefined
  Main: undefined
  Lesson: { lessonId: string; day: number }
  Milestone: { phase: number; xpEarned: number }
}

export type MainTabParamList = {
  Home: undefined
  Learn: undefined
  Progress: undefined
  Profile: undefined
}