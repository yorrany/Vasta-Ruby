"use client"

import Link from "next/link"
import { LayoutDashboard, ChevronRight } from "lucide-react"

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800/60 bg-vasta-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-vasta-primary to-vasta-accent shadow-lg shadow-vasta-primary/20">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L9 20L12 12L20 9L4 4Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">vasta<span className="text-vasta-muted">.pro</span></span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-vasta-muted md:flex">
          <Link href="#recursos" className="transition-colors hover:text-white">
            Recursos
          </Link>
          <Link href="#precos" className="transition-colors hover:text-white">
            Preços
          </Link>
          <Link href="#depoimentos" className="transition-colors hover:text-white">
            Depoimentos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden items-center gap-2 rounded-xl bg-vasta-primary/20 border border-vasta-primary/30 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-vasta-primary/30 sm:flex"
          >
            <LayoutDashboard className="h-4 w-4 text-vasta-primary" />
            Acessar Dashboard
          </Link>

          <button className="flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 py-1.5 pl-1.5 pr-3 text-sm font-medium text-white transition-all hover:bg-slate-800">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                Y
            </div>
            <span className="text-xs font-semibold">@yorrany</span>
            <ChevronRight className="h-3 w-3 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  )
}
