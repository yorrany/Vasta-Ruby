"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Vasta Start",
      price: 0,
      description: "Grátis para sempre",
      tax: "8%",
      features: [
        { name: "Até 3 produtos", included: true },
        { name: "1 usuário administrativo", included: true },
        { name: "Checkout transparente", included: true },
        { name: "Suporte por email", included: true },
        { name: "Analytics básico", included: true },
        { name: "Domínio personalizado", included: false },
        { name: "Sem marca d'água", included: false },
        { name: "Recuperação de carrinho", included: false },
      ],
    },
    {
      name: "Vasta Pro",
      price: billingCycle === "monthly" ? 49.90 : 39.90, // Example yearly discount logic
      description: "Perfeito para lojas em crescimento constante.",
      tax: "4%",
      popular: true,
      features: [
        { name: "Produtos ilimitados", included: true },
        { name: "1 usuário administrativo", included: true },
        { name: "Checkout transparente", included: true },
        { name: "Suporte por email", included: true },
        { name: "Analytics básico", included: true },
        { name: "Domínio próprio (seuloja.com.br)", included: true },
        { name: "Sem marca d'água", included: true },
        { name: "Recuperação de carrinho", included: true },
      ],
    },
    {
      name: "Vasta Business",
      price: billingCycle === "monthly" ? 99.90 : 79.90,
      description: "Para operações que precisam de escala e equipe.",
      tax: "1%",
      features: [
        { name: "Produtos ilimitados", included: true },
        { name: "1 usuário administrativo", included: true },
        { name: "Checkout transparente", included: true },
        { name: "Suporte por email", included: true },
        { name: "Analytics básico", included: true },
        { name: "Domínio próprio", included: true },
        { name: "Sem marca d'água", included: true },
        { name: "Recuperação de carrinho", included: true },
        { name: "Até 5 usuários administrativos", included: true },
        { name: "Suporte prioritário via WhatsApp", included: true },
        { name: "API de integração aberta", included: true },
        { name: "Gestão de múltiplos estoques", included: true },
      ],
    },
  ]

  return (
    <section id="precos" className="relative border-b border-slate-800/60 bg-slate-950/80 py-20 md:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-vasta-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="inline-block rounded-full border border-vasta-primary/30 bg-vasta-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-vasta-primary">
            Planos Flexíveis
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Escolha o plano ideal para sua escala
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vasta-muted">
            Comece grátis e evolua conforme suas vendas crescem. Sem fidelidade ou taxas escondidas.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/50 p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${billingCycle === "monthly"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-vasta-muted hover:text-white"
                }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all ${billingCycle === "yearly"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-vasta-muted hover:text-white"
                }`}
            >
              Anual
              <span className="absolute -right-3 -top-2 rounded-full bg-vasta-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[2rem] border p-8 transition-all hover:shadow-card ${plan.popular
                  ? "border-vasta-primary bg-slate-900/80 ring-1 ring-vasta-primary/50"
                  : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-vasta-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-white">Grátis para sempre</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-vasta-muted">R$</span>
                      <span className="text-4xl font-bold text-white">{plan.price.toFixed(2)}</span>
                      <span className="text-sm text-vasta-muted">/mês</span>
                    </>
                  )}
                </div>
                <div className="mt-2 text-xs font-medium text-slate-400 bg-slate-900/50 inline-block px-2 py-1 rounded-md border border-slate-800">
                  Taxa de transação: <span className="text-slate-200">{plan.tax}</span>
                </div>
                {plan.description && (
                  <p className="mt-4 text-sm text-vasta-muted">{plan.description}</p>
                )}
              </div>

              <div className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <Check className="h-2.5 w-2.5 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800">
                        <X className="h-2.5 w-2.5 text-slate-500" />
                      </div>
                    )}
                    <span className={feature.included ? "text-slate-300" : "text-slate-600 line-through decoration-slate-600/50"}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${plan.popular
                    ? "bg-gradient-to-r from-vasta-primary to-vasta-accent text-white hover:opacity-90 shadow-lg shadow-vasta-primary/25"
                    : "bg-slate-800 text-white hover:bg-slate-700 hover:text-white"
                  }`}
              >
                {plan.price === 0 ? "Começar agora" : "Criar minha loja agora"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
