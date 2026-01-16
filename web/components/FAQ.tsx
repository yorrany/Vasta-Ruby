"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"

const faqs = [
  {
    question: "O vasta.pro é gratuito?",
    answer:
      "Sim! Você terá sempre uma página base gratuita com todos os recursos essenciais. Futuramente, lançaremos um marketplace com widgets premium opcionais para quem desejar recursos avançados como estatísticas detalhadas, integrações extras e mais personalização.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sem dúvida. Não acreditamos em fidelidade forçada. Você pode cancelar sua assinatura Pro ou Business a qualquer momento diretamente pelo seu painel, sem burocracia ou necessidade de falar com suporte.",
  },
  {
    question: "Como recebo meus pagamentos?",
    answer:
      "Utilizamos a Stripe, a maior processadora de pagamentos do mundo, para garantir segurança total. O dinheiro das suas vendas vai diretamente para sua conta bancária cadastrada, com repasses automáticos.",
  },
  {
    question: "O que acontece se eu atingir o limite do plano Grátis?",
    answer:
      "Nós avisaremos você quando estiver próximo do limite. Caso o limite seja atingido, você poderá optar por fazer um upgrade para continuar vendendo sem interrupções ou aguardar o próximo ciclo mensal.",
  },
  {
    question: "Preciso de cartão de crédito para criar minha conta?",
    answer:
      "Não. Você pode criar sua conta gratuita e começar a montar sua página imediatamente sem informar nenhum dado de pagamento. Só pediremos cartão caso decida assinar um plano pago.",
  },
  {
    question: "Quais recursos estão incluídos na versão gratuita?",
    answer:
      "O plano gratuito inclui sua página personalizada (vasta.pro/voce), links ilimitados, venda de até 3 produtos digitais com taxa de 8%, personalização básica de tema e acesso à comunidade.",
  },
  {
    question: "O que é o Marketplace de Widgets?",
    answer:
      "É uma loja de complementos onde você pode adquirir funcionalidades extras para sua página, como contador regressivo, captura de email, integração com pixel do Facebook, entre outros, pagando apenas pelo que usar.",
  },
  {
    question: "Posso usar meu domínio próprio?",
    answer:
      "Sim! Nos planos Pro e Business você pode conectar seu domínio (ex: seunome.com.br) para que sua página fique totalmente white-label, fortalecendo ainda mais sua marca pessoal.",
  },
  {
    question: "Como o vasta.pro ganha dinheiro?",
    answer:
      "Nossa receita vem das assinaturas dos planos Pro/Business e de uma pequena taxa sobre as transações realizadas no plano gratuito. Isso nos permite manter a plataforma segura, rápida e em constante evolução.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative border-b border-slate-800/60 bg-vasta-bg py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/50 px-3 py-1 text-xs text-vasta-muted">
            <HelpCircle className="h-3 w-3" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
            Dúvidas? Nós respondemos
          </h2>
          <p className="mt-4 text-vasta-muted">
            Tudo que você precisa saber sobre o vasta.pro
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                    ? "border-slate-700 bg-slate-900/60 shadow-lg"
                    : "border-slate-800 bg-slate-950/30 hover:border-slate-700/80"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left md:p-6"
                >
                  <span
                    className={`text-sm font-medium transition-colors md:text-base ${isOpen ? "text-white" : "text-slate-300"
                      }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-vasta-primary" : ""
                      }`}
                  />
                </button>
                <div
                  className={`border-t border-slate-800/50 px-5 text-sm leading-relaxed text-vasta-muted transition-all duration-300 md:px-6 md:text-base ${isOpen ? "max-h-96 py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-900 p-6 border border-slate-800">
            <div className="rounded-full bg-slate-800 p-3">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Ainda tem dúvidas?</h4>
              <p className="text-sm text-vasta-muted">Fale com nosso time de suporte.</p>
            </div>
            <button className="ml-4 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-colors">
              Entrar em contato
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
