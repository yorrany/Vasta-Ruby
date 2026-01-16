"use client"

import { useState } from "react"
import { createClient } from "../../lib/supabase"
import { Github, Mail, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: "Erro ao enviar e-mail. Verifique os dados." })
    } else {
      setMessage({ type: 'success', text: "Link de acesso enviado! Verifique sua caixa de entrada." })
    }
    setLoading(false)
  }

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-vasta-bg px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.05),transparent_50%)]" />
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-vasta-primary to-vasta-accent shadow-lg shadow-vasta-primary/20">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4L9 20L12 12L20 9L4 4Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">vasta<span className="text-vasta-muted">.pro</span></span>
          </Link>
          <h1 className="mt-8 text-3xl font-black text-white">Bem-vindo de volta</h1>
          <p className="mt-2 text-vasta-muted">Acesse sua conta para gerenciar seu império digital.</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
                E-mail profissional
              </label>
              <div className="mt-2 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:border-vasta-primary focus:outline-none focus:ring-1 focus:ring-vasta-primary transition-all"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-vasta-primary to-vasta-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-vasta-primary/25 transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  Entrar com Link Mágico
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {message && (
              <div className={`rounded-xl p-4 text-center text-sm font-medium ${
                message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {message.text}
              </div>
            )}
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-vasta-bg px-4 text-slate-500 font-bold tracking-widest">Ou continue com</span>
            </div>
          </div>

          <div className="grid gap-4">
            <button 
              onClick={() => handleOAuthLogin('github')}
              className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
            >
              <Github className="h-5 w-5" />
              GitHub
            </button>
            <button 
                onClick={() => handleOAuthLogin('google')}
                className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4" // @vasta-ux-exception: Google Brand Color
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853" // @vasta-ux-exception: Google Brand Color
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05" // @vasta-ux-exception: Google Brand Color
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335" // @vasta-ux-exception: Google Brand Color
                />
              </svg>
              Google
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-vasta-muted">
          Não tem uma conta?{" "}
          <Link href="/#precos" className="font-bold text-white hover:underline">
            Crie sua página grátis
          </Link>
        </p>
      </div>
    </div>
  )
}
