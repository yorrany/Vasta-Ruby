"use client"

import { useState, useEffect } from "react"
import { Check, X, Loader2 } from "lucide-react"
import { useAuth } from "../lib/AuthContext"

type PlanFeature = {
  name: string
  included: boolean
}

type Plan = {
  code: string
  name: string
  monthly_price_cents: number
  transaction_fee_percent: number
  offer_limit: number | null
  admin_user_limit: number | null
  features: string[]
}

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/plans`);
        if (!res.ok) throw new Error("API Offline");
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        // Fallback with high fidelity plans if backend is offline
        setPlans([
          {
            code: "start",
            name: "Começo",
            monthly_price_cents: 0,
            transaction_fee_percent: 8,
            offer_limit: 3,
            admin_user_limit: null,
            features: ["Até 3 produtos", "Checkout transparente"]
          },
          {
            code: "pro",
            name: "Profissional",
            monthly_price_cents: 4700,
            transaction_fee_percent: 4,
            offer_limit: 10,
            admin_user_limit: null,
            features: ["Até 10 produtos", "Sem marca d'água"]
          },
          {
            code: "business",
            name: "Enterprise",
            monthly_price_cents: 19700,
            transaction_fee_percent: 1,
            offer_limit: null,
            admin_user_limit: null,
            features: ["Produtos ilimitados", "Suporte VIP", "Analytics avançado"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getUiFeatures = (plan: Plan): PlanFeature[] => {
    const isStart = plan.code === "start"
    const isPro = plan.code === "pro"
    
    return [
      { name: plan.offer_limit ? `Até ${plan.offer_limit} produtos` : "Produtos ilimitados", included: true },
      { name: "Checkout transparente", included: true },
      { name: "Bio escalável", included: true },
      { name: "Analytics básico", included: true },
      { name: "Suporte por e-mail", included: true },
      { name: "Sem marca d'água", included: !isStart && !isPro },
      { name: "Analytics avançado", included: !isStart && !isPro },
      { name: "Suporte VIP", included: !isStart && !isPro },
    ]
  }

  const { openAuthModal } = useAuth()

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
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-8 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-vasta-primary animate-spin" />
                <span className="ml-3 text-vasta-muted">Carregando planos...</span>
            </div>
          ) : (
            plans.map((plan, index) => {
              const price = billingCycle === "monthly" 
                ? plan.monthly_price_cents / 100 
                : (plan.monthly_price_cents * 0.8 * 12) / 1200
              
              const isPopular = plan.code === "pro"
              const uiFeatures = getUiFeatures(plan)

              return (
                <div
                  key={plan.code}
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  className={`animate-fade-in-up fill-mode-forwards opacity-0 relative flex flex-col rounded-[2.5rem] border p-10 transition-all duration-500 hover:scale-[1.02] ${isPopular
                      ? "border-vasta-primary/50 bg-slate-900/60 ring-1 ring-vasta-primary/20 shadow-2xl shadow-vasta-primary/10"
                      : "border-slate-800/60 bg-slate-950/40 hover:border-slate-700/80 hover:bg-slate-900/40"
                    }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-vasta-primary to-vasta-accent px-5 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                      Mais Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl font-black text-white tracking-tight uppercase opacity-90">{plan.name}</h3>
                    <div className="mt-5 flex items-baseline gap-1.5">
                      {plan.monthly_price_cents === 0 ? (
                        <span className="text-3xl font-black text-white tracking-tighter">Grátis</span>
                      ) : (
                        <>
                          <span className="text-lg font-bold text-vasta-muted">R$</span>
                          <span className="text-5xl font-black text-white tracking-tighter">{(billingCycle === "yearly" ? price : plan.monthly_price_cents / 100).toFixed(0)}</span>
                          <span className="text-sm font-bold text-vasta-muted">/mês</span>
                        </>
                      )}
                    </div>
                    <div className="mt-4 text-[10px] font-bold text-slate-400 bg-slate-800/40 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/50">
                      <div className="h-1.5 w-1.5 rounded-full bg-vasta-primary animate-pulse" />
                      Taxa: <span className="text-slate-100">{plan.transaction_fee_percent}%</span>
                    </div>
                  </div>

                  <div className="mb-10 flex-1 space-y-4">
                    {uiFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 text-sm">
                        {feature.included ? (
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Check className="h-3 w-3 text-emerald-500" />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700/50">
                            <X className="h-3 w-3 text-slate-600" />
                          </div>
                        )}
                        <span className={`font-medium ${feature.included ? "text-slate-300" : "text-slate-600 line-through decoration-slate-600/50"}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openAuthModal('signup', 'Começar grátis agora')}
                    className={`w-full rounded-[1.25rem] py-4 text-sm font-black transition-all duration-300 active:scale-[0.98] ${isPopular
                        ? "bg-gradient-to-r from-vasta-primary to-vasta-accent text-white hover:shadow-2xl hover:shadow-vasta-primary/40 shadow-xl shadow-vasta-primary/25"
                        : "bg-white text-black hover:bg-slate-100"
                      }`}
                  >
                    {plan.monthly_price_cents === 0 ? "Começar grátis" : "Criar minha loja"}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
