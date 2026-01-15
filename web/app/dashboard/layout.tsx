"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  children: ReactNode
}

const navItems = [
  { href: "/dashboard/links", label: "Links" },
  { href: "/dashboard/aparencia", label: "Aparência" },
  { href: "/dashboard/minha-loja", label: "Minha Loja" },
  { href: "/dashboard/vendas", label: "Vendas" }
]

function SidebarLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center rounded-xl px-3 py-2 text-sm ${
        active
          ? "bg-vasta-primary/20 text-white"
          : "text-vasta-muted hover:bg-slate-900 hover:text-white"
      }`}
    >
      {label}
    </Link>
  )
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-vasta-bg text-vasta-text">
      <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-950/90">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-vasta-primary to-vasta-accent">
            <span className="text-xs font-semibold text-white">V</span>
          </div>
          <span className="text-sm font-semibold text-vasta-text">vasta.pro</span>
        </div>
        <div className="px-4">
          <div className="rounded-2xl bg-slate-900/90 p-4 text-xs">
            <div className="text-vasta-muted">Seu link</div>
            <div className="mt-1 text-sm font-semibold text-white">@seunome</div>
            <button className="mt-3 w-full rounded-full bg-slate-800 py-1.5 text-xs font-medium text-vasta-text">
              Copiar link
            </button>
            <button className="mt-2 w-full rounded-full bg-gradient-to-r from-vasta-primary to-vasta-accent py-1.5 text-xs font-semibold text-white">
              Compartilhar
            </button>
          </div>
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-4 text-sm">
          {navItems.map(item => (
            <SidebarLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="border-t border-slate-800 px-4 py-4 text-xs text-vasta-muted">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">@seunome</div>
              <div className="text-[11px] text-vasta-muted">Plano Free ativo</div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="text-sm font-semibold text-white">Dashboard</div>
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-400">
              Pagamentos ativos
            </span>
            <button className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-vasta-text">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>@seunome</span>
            </button>
          </div>
        </header>
        <main className="flex flex-1">
          <div className="flex-1 px-6 py-6">{children}</div>
          <aside className="hidden w-80 border-l border-slate-800 bg-slate-950/90 px-4 py-6 md:block">
            <div className="text-xs font-semibold uppercase tracking-wide text-vasta-muted">
              Preview
            </div>
            <div className="mt-4 flex justify-center">
              <div className="relative h-96 w-52 rounded-[2.2rem] bg-gradient-to-b from-slate-800 to-slate-950 p-2 shadow-card">
                <div className="h-full w-full rounded-[1.8rem] bg-slate-950 p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-vasta-primary to-vasta-accent" />
                    <div className="text-xs font-medium text-white">@seunome</div>
                    <div className="text-[11px] text-vasta-muted">
                      Sua bio aparece aqui para seus visitantes
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-xl bg-slate-900/80 px-3 py-2 text-[11px] text-vasta-text">
                      Link principal
                    </div>
                    <div className="rounded-xl bg-slate-900/80 px-3 py-2 text-[11px] text-vasta-text">
                      Link secundário
                    </div>
                  </div>
                  <div className="mt-4 text-[11px] font-semibold text-vasta-muted">
                    Produtos
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="flex-1 rounded-xl bg-slate-900/80 p-2">
                      <div className="h-10 rounded-lg bg-slate-800" />
                      <div className="mt-1 text-[10px] text-vasta-text">Produto</div>
                      <div className="text-[11px] font-semibold text-white">R$ 99</div>
                    </div>
                    <div className="flex-1 rounded-xl bg-slate-900/80 p-2">
                      <div className="h-10 rounded-lg bg-slate-800" />
                      <div className="mt-1 text-[10px] text-vasta-text">Serviço</div>
                      <div className="text-[11px] font-semibold text-white">R$ 197</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

