import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from '@/router'
import { useAuth } from '@/hooks/useAuth'
import './index.css'

function App() {
  // Bootstrap auth on mount — keeps store in sync with Supabase session
  useAuth()
  return <AppRouter />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)