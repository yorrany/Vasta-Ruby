import { InfoPageShell } from "../../components/InfoPageShell"
import { Search } from "lucide-react"

export default function HelpPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-4xl px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-black text-white mb-8">Central de Ajuda</h1>
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                        <input 
                            type="text" 
                            placeholder="Como podemos te ajudar hoje?"
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-vasta-primary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-4">Primeiros Passos</h3>
                        <ul className="space-y-3 text-vasta-muted text-sm">
                            <li className="hover:text-vasta-primary cursor-pointer">Como criar sua conta</li>
                            <li className="hover:text-vasta-primary cursor-pointer">Personalizando seu perfil</li>
                            <li className="hover:text-vasta-primary cursor-pointer">Adicionando seu primeiro produto</li>
                        </ul>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-4">Pagamentos</h3>
                        <ul className="space-y-3 text-vasta-muted text-sm">
                            <li className="hover:text-vasta-primary cursor-pointer">Taxas e cobranças</li>
                            <li className="hover:text-vasta-primary cursor-pointer">Configurando o Stripe</li>
                            <li className="hover:text-vasta-primary cursor-pointer">Prazos de recebimento</li>
                        </ul>
                    </div>
                </div>
            </div>
        </InfoPageShell>
    )
}
