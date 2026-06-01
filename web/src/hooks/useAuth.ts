import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useUserStore } from '@/store/useUserStore'

// Bootstraps auth state on app mount.
// Listens to Supabase auth changes and keeps the store in sync.

export function useAuth() {
  const { setAuthStatus, setUserId, setProfile, setProgress, reset } = useUserStore()

  useEffect(() => {
    // 1. Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id)
        setAuthStatus('authenticated')
        loadUserData(session.user.id)
      } else {
        setAuthStatus('unauthenticated')
      }
    })

    // 2. Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUserId(session.user.id)
          setAuthStatus('authenticated')
          if (event === 'SIGNED_IN') {
            await loadUserData(session.user.id)
          }
        } else {
          reset()
          setAuthStatus('unauthenticated')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function loadUserData(userId: string) {
    const [{ data: profile }, { data: progress }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('progress').select('*').eq('user_id', userId).single(),
    ])

    if (profile) setProfile(profile)
    if (progress) setProgress(progress)
  }
}