"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PublicProfile } from "../components/profile/PublicProfile"

export default function NotFound() {
  const pathname = usePathname()

  // Simple heuristic: if path is like /username (1 segment, no extension), try profile.
  // Ignore /dashboard, /auth, /api, etc. if they ever fall through (unlikely if they exist).
  // Also ignore /404 itself.
  
  const segments = pathname?.split('/').filter(Boolean) || []
  const potentialUsername = segments.length === 1 ? segments[0] : null
  
  const isIgnored = ['dashboard', 'auth', 'login', 'signup', '404', 'favicon.ico'].includes(potentialUsername || '')

  if (potentialUsername && !isIgnored) {
      return <PublicProfile username={potentialUsername} />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-vasta-bg text-center">
      <h2 className="mb-4 text-2xl font-bold text-vasta-text">Página não encontrada</h2>
      <p className="mb-8 text-vasta-muted">O endereço que você digitou não existe.</p>
      <Link
        href="/"
        className="rounded-xl bg-vasta-text px-6 py-3 font-bold text-vasta-bg hover:opacity-90 transition-opacity"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
