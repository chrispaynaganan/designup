import { Navigate } from 'react-router-dom'
import { useUserStore, selectIsAuthenticated, selectIsPurchased, selectHasTrack } from '@/store/useUserStore'
import { ROUTES } from '@/constants/routes'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authStatus     = useUserStore((s) => s.authStatus)
  const isAuthenticated = useUserStore(selectIsAuthenticated)
  const isPurchased    = useUserStore(selectIsPurchased)
  const hasTrack       = useUserStore(selectHasTrack)

  // Still checking session — render nothing (or a spinner)
  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  // Not logged in → login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  // Logged in but not paid → pricing
  if (!isPurchased) {
    return <Navigate to={ROUTES.PRICING} replace />
  }

  // Paid but no track selected → track select
  // (skip this check for /tracks itself to avoid infinite redirect)
  if (!hasTrack) {
    return <Navigate to={ROUTES.TRACKS} replace />
  }

  return <>{children}</>
}

// Variant for /tracks — paid but track not required yet
export function PaidRoute({ children }: ProtectedRouteProps) {
  const authStatus     = useUserStore((s) => s.authStatus)
  const isAuthenticated = useUserStore(selectIsAuthenticated)
  const isPurchased    = useUserStore(selectIsPurchased)

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />
  if (!isPurchased) return <Navigate to={ROUTES.PRICING} replace />

  return <>{children}</>
}