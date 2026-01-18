"use client"

import { Check, CreditCard, Zap, Shield, Star, Clock } from "lucide-react"

export default function BillingPage() {
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-vasta-text">Assinatura e Cobrança</h1>
        <p className="text-sm text-vasta-muted">Gerencie seu plano e veja seu histórico de pagamentos.</p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-black text-white rounded-[2rem] p-8 relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
         {/* Glow effect */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-vasta-primary/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold mb-4 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Plano Atual
                </div>
                <h2 className="text-3xl font-black mb-2">Vasta Free</h2>
                <p className="text-gray-400 text-sm max-w-md">Você está no plano gratuito. Faça upgrade para desbloquear taxas reduzidas e recursos exclusivos.</p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                    <span>Renovação</span>
                    <span>Vitalício</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 w-full h-full"></div>
                </div>
                <p className="text-[10px] text-right text-emerald-500 font-bold">Ativo</p>
            </div>
         </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="rounded-2xl border border-vasta-border bg-vasta-surface p-6 opacity-60 grayscale filter hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <h3 className="text-lg font-bold text-vasta-text mb-2">Free</h3>
              <p className="text-2xl font-black text-vasta-text mb-4">R$ 0<span className="text-sm font-normal text-vasta-muted">/mês</span></p>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> Links Ilimitados
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> Taxa de 5% por venda
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> Temas Básicos
                  </li>
              </ul>
              <button disabled className="w-full py-2 rounded-xl bg-vasta-surface-soft border border-vasta-border text-xs font-bold text-vasta-muted cursor-default">
                  Plano Atual
              </button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl border border-vasta-primary/50 bg-vasta-surface p-6 relative shadow-lg shadow-vasta-primary/5 scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1bg-gradient-to-r from-vasta-primary to-violet-600 text-white text-[10px] font-bold rounded-full shadow-md bg-vasta-primary">
                  RECOMENDADO
              </div>
              <h3 className="text-lg font-bold text-vasta-text mb-2 flex items-center gap-2">
                  Pro <Sparkles size={16} className="text-amber-400 fill-amber-400" />
              </h3>
              <p className="text-2xl font-black text-vasta-text mb-4">R$ 29<span className="text-sm font-normal text-vasta-muted">/mês</span></p>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-xs text-vasta-text">
                      <Check size={14} className="text-vasta-primary" /> Taxa reduzida de 2%
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-text">
                      <Check size={14} className="text-vasta-primary" /> Domínio Personalizado
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-text">
                      <Check size={14} className="text-vasta-primary" /> Temas Premium
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-text">
                      <Check size={14} className="text-vasta-primary" /> Analytics Avançado
                  </li>
              </ul>
              <button className="w-full py-2 rounded-xl bg-vasta-text text-vasta-bg text-xs font-bold hover:scale-105 transition-transform shadow-lg">
                  Fazer Upgrade
              </button>
          </div>

          {/* Business Plan */}
          <div className="rounded-2xl border border-vasta-border bg-vasta-surface p-6 hover:border-vasta-text/20 transition-colors">
              <h3 className="text-lg font-bold text-vasta-text mb-2">Business</h3>
              <p className="text-2xl font-black text-vasta-text mb-4">R$ 79<span className="text-sm font-normal text-vasta-muted">/mês</span></p>
              <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> Taxa 0% (apenas gateway)
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> Múltiplos membros
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> API de Integração
                  </li>
                  <li className="flex items-center gap-2 text-xs text-vasta-muted">
                      <Check size={14} className="text-vasta-text" /> Suporte Prioritário
                  </li>
              </ul>
              <button className="w-full py-2 rounded-xl bg-vasta-surface-soft hover:bg-vasta-text hover:text-vasta-bg border border-vasta-border text-xs font-bold text-vasta-text transition-all">
                  Contactar Vendas
              </button>
          </div>
      </div>

      {/* History */}
      <div className="pt-8">
          <h3 className="text-lg font-bold text-vasta-text mb-4">Histórico de Cobrança</h3>
          <div className="rounded-2xl border border-vasta-border bg-vasta-surface overflow-hidden">
             <div className="p-8 text-center flex flex-col items-center justify-center text-vasta-muted">
                 <Clock className="w-8 h-8 mb-3 opacity-50" />
                 <p className="text-sm font-medium">Nenhuma fatura gerada</p>
                 <p className="text-xs opacity-70">Suas faturas aparecerão aqui.</p>
             </div>
          </div>
      </div>

    </div>
  )
}

function Sparkles({ className, size }: { className?: string, size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        </svg>
    )
}
