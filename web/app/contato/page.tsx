import { InfoPageShell } from "../../components/InfoPageShell"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-5xl px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-black text-white mb-6">Estamos aqui para ajudar</h1>
                    <p className="text-xl text-vasta-muted">Escolha o melhor canal para falar com nosso time.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-vasta-primary transition-colors text-center group">
                        <div className="bg-vasta-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Mail className="text-vasta-primary h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">E-mail</h3>
                        <p className="text-vasta-muted text-sm mb-4">Ideal para suporte técnico e questões detalhadas.</p>
                        <a href="mailto:contato@vasta.pro" className="text-vasta-primary font-bold">contato@vasta.pro</a>
                    </div>

                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-vasta-accent transition-colors text-center group">
                        <div className="bg-vasta-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare className="text-vasta-accent h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Chat Ao Vivo</h3>
                        <p className="text-vasta-muted text-sm mb-4">Segunda a Sexta, das 9h às 18h.</p>
                        <button className="bg-vasta-accent/20 text-vasta-accent px-6 py-2 rounded-full font-bold">Iniciar Chat</button>
                    </div>

                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500 transition-colors text-center group">
                        <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Phone className="text-emerald-500 h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                        <p className="text-vasta-muted text-sm mb-4">Para vendas e parcerias comerciais.</p>
                        <a href="https://wa.me/5592981015056" className="text-emerald-500 font-bold">(92) 98101-5056</a>
                    </div>
                </div>
            </div>
        </InfoPageShell>
    )
}
