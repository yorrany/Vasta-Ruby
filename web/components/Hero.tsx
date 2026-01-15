"use client"

import Link from "next/link"
import { Check, ArrowRight, Verified, ExternalLink, Github, Monitor, Calendar, Heart } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/60 pt-32 pb-24 md:pb-32 lg:pt-48">
      {/* Background radial gradients for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.05),transparent_50%)]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 md:flex-row md:items-center lg:gap-24">
        
        {/* Left Side: Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-vasta-primary/30 bg-vasta-primary/5 px-4 py-1.5 text-xs font-bold tracking-wide text-vasta-primary md:text-sm">
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vasta-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-vasta-primary"></span>
            </span>
            COMECE GRATUITAMENTE
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Sua expertise <br />
              <span className="gradient-title">merece destaque.</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-vasta-muted md:mx-0 md:text-xl leading-relaxed">
              Unifique sua presença digital. Compartilhe links, venda produtos e cresça sua audiência com uma única URL profissional.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:mx-auto sm:max-w-md md:mx-0">
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-700 bg-slate-900/40 p-2 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center px-4 py-2">
                    <span className="text-sm font-medium text-slate-500">vasta.pro/</span>
                    <input
                        placeholder="seu-nome"
                        className="flex-1 bg-transparent px-1 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-700">
                    Criar grátis <ArrowRight className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-vasta-muted md:justify-start">
                <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Plano Grátis</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Sem cartão de crédito</span>
                </div>
            </div>
          </div>
        </div>

        {/* Right Side: Phone Mockup */}
        <div className="flex flex-1 justify-center lg:justify-end">
          <div className="relative group">
            {/* Glow behind phone */}
            <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-vasta-primary/20 to-vasta-accent/20 opacity-50 blur-2xl transition-opacity group-hover:opacity-75" />
            
            <div className="relative h-[650px] w-[320px] rounded-[3rem] border-8 border-slate-900 bg-slate-950 shadow-2xl">
              
              {/* Inner screen content */}
              <div className="h-full w-full overflow-hidden rounded-[2.5rem] bg-[#0c0f1d]">
                
                {/* Banner */}
                <div className="h-32 w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative">
                   <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0c0f1d] to-transparent" />
                </div>

                {/* Profile Info */}
                <div className="-mt-10 flex flex-col items-center px-6">
                    <div className="h-20 w-20 rounded-full border-4 border-[#0c0f1d] bg-slate-800 flex items-center justify-center overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L9 20L12 12L20 9L4 4Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-1.5">
                        <span className="text-base font-bold text-white">@seunome</span>
                        <Verified className="h-4 w-4 text-blue-500 fill-blue-500/20" />
                    </div>
                    <p className="mt-2 text-center text-xs font-medium leading-relaxed text-slate-300">
                        Designer de Produtos & Criador <br /> de Conteúdo.
                    </p>
                </div>

                {/* Search / Links */}
                <div className="mt-8 space-y-3 px-6">
                    <button className="flex w-full items-center gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 px-4 py-3 text-left transition-all hover:bg-slate-800/80">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="text-xs font-semibold text-white">Portfólio no Behance</span>
                    </button>
                    
                    <button className="flex w-full items-center gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 px-4 py-3 text-left transition-all hover:bg-slate-800/80">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                            <Github className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="text-xs font-semibold text-white">Projetos GitHub</span>
                    </button>

                    <button className="flex w-full items-center gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 px-4 py-3 text-left transition-all hover:bg-slate-800/80">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                            <Calendar className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="text-xs font-semibold text-white">Agendar Consultoria</span>
                        <ArrowRight className="ml-auto h-3 w-3 text-slate-600" />
                    </button>
                </div>

                {/* Products Section */}
                <div className="mt-8 px-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Produtos & Ofertas</span>
                        <Heart className="h-3 w-3 text-slate-600" />
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                        <div className="min-w-[130px] flex-shrink-0 rounded-[1.5rem] bg-slate-900/40 border border-slate-800/60 p-2 transition-transform hover:scale-105">
                             <div className="h-24 w-full rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                <Monitor className="h-8 w-8 text-indigo-400/50" />
                             </div>
                             <div className="mt-2 text-center">
                                <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full bg-slate-800 inline-block mb-1">R$ 197</div>
                             </div>
                        </div>

                        <div className="min-w-[130px] flex-shrink-0 rounded-[1.5rem] bg-slate-900/40 border border-slate-800/60 p-2 transition-transform hover:scale-105">
                             <div className="h-24 w-full rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
                                <Calendar className="h-8 w-8 text-pink-400/50" />
                             </div>
                             <div className="mt-2 text-center">
                                <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full bg-slate-800 inline-block mb-1">R$ 47</div>
                             </div>
                        </div>
                    </div>
                </div>

              </div>

              {/* Speaker/Camera notch */}
              <div className="absolute top-0 left-1/2 mt-3 h-6 w-32 -translate-x-1/2 rounded-full bg-slate-950" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
