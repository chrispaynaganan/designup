import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute, PaidRoute } from '@/components/layout/ProtectedRoute'
import { ROUTES } from '@/constants/routes'

// Pages
import LandingPage          from '@/pages/LandingPage'
import SignUpPage            from '@/pages/SignUpPage'
import LoginPage             from '@/pages/LoginPage'
import PricingPage           from '@/pages/PricingPage'
import CheckoutSuccessPage   from '@/pages/CheckoutSuccessPage'
import CheckoutCancelPage    from '@/pages/CheckoutCancelPage'
import OnboardingPage        from '@/pages/OnboardingPage'
import TrackSelectPage       from '@/pages/TrackSelectPage'
import DashboardPage         from '@/pages/DashboardPage'
import LearnPage             from '@/pages/LearnPage'
import LessonPage            from '@/pages/LessonPage'
import ProgressPage          from '@/pages/ProgressPage'
import ProfilePage           from '@/pages/ProfilePage'
import CertificatePage       from '@/pages/CertificatePage'

const router = createBrowserRouter([
  // ── Public ────────────────────────────────────────────────────────────────
  { path: ROUTES.HOME,    element: <LandingPage /> },
  { path: ROUTES.PRICING, element: <PricingPage /> },
  { path: ROUTES.SIGNUP,  element: <SignUpPage /> },
  { path: ROUTES.LOGIN,   element: <LoginPage /> },

  // ── Payment callbacks ─────────────────────────────────────────────────────
  { path: ROUTES.CHECKOUT_SUCCESS, element: <CheckoutSuccessPage /> },
  { path: ROUTES.CHECKOUT_CANCEL,  element: <CheckoutCancelPage /> },

  // ── Onboarding (paid, track not required yet) ─────────────────────────────
  {
    path: ROUTES.ONBOARDING,
    element: <PaidRoute><OnboardingPage /></PaidRoute>,
  },
  {
    path: ROUTES.TRACKS,
    element: <PaidRoute><TrackSelectPage /></PaidRoute>,
  },

  // ── App (paid + track selected) ───────────────────────────────────────────
  {
    path: ROUTES.DASHBOARD,
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: ROUTES.LEARN,
    element: <ProtectedRoute><LearnPage /></ProtectedRoute>,
  },
  {
    path: '/learn/:dayId',
    element: <ProtectedRoute><LessonPage /></ProtectedRoute>,
  },
  {
    path: ROUTES.PROGRESS,
    element: <ProtectedRoute><ProgressPage /></ProtectedRoute>,
  },
  {
    path: ROUTES.PROFILE,
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: ROUTES.CERTIFICATE,
    element: <ProtectedRoute><CertificatePage /></ProtectedRoute>,
  },

  // ── Fallback ──────────────────────────────────────────────────────────────
  { path: '*', element: <LandingPage /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}