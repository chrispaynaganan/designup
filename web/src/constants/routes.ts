// Typed route paths — import these instead of hardcoding strings

export const ROUTES = {
  // Public
  HOME:              '/',
  PRICING:           '/pricing',
  SIGNUP:            '/signup',
  LOGIN:             '/login',

  // Payment callbacks
  CHECKOUT_SUCCESS:  '/checkout/success',
  CHECKOUT_CANCEL:   '/checkout/cancel',

  // Onboarding (protected)
  ONBOARDING:        '/onboarding',
  TRACKS:            '/tracks',

  // App (protected)
  DASHBOARD:         '/dashboard',
  LEARN:             '/learn',
  LESSON:            (dayId: number | string) => `/learn/${dayId}`,
  PROGRESS:          '/progress',
  PROFILE:           '/profile',
  CERTIFICATE:       '/certificate',
} as const