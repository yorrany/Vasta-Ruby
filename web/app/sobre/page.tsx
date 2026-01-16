import { InfoPageShell } from "../../components/InfoPageShell"

export default function AboutPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-4xl px-4 py-20 text-center">
                <h1 className="text-5xl font-serif font-black text-white mb-6">Unificando sua presença digital</h1>
                <p className="text-xl text-vasta-muted mb-12 max-w-2xl mx-auto">
                    O Vasta nasceu com a missão de simplificar a monetização para criadores de conteúdo e profissionais liberais através de uma bio inteligente e poderosa.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <div className="text-3xl mb-4">🚀</div>
                        <h3 className="text-lg font-bold text-white mb-2">Missão</h3>
                        <p className="text-sm text-vasta-muted">Capacitar profissionais a venderem seus produtos digitais em segundos.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <div className="text-3xl mb-4">💎</div>
                        <h3 className="text-lg font-bold text-white mb-2">Visão</h3>
                        <p className="text-sm text-vasta-muted">Ser a plataforma líder em Bio-Commerce no mercado brasileiro.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                        <div className="text-3xl mb-4">🤝</div>
                        <h3 className="text-lg font-bold text-white mb-2">Valores</h3>
                        <p className="text-sm text-vasta-muted">Transparência, inovação constante e foco total no sucesso do cliente.</p>
                    </div>
                </div>
            </div>
        </InfoPageShell>
    )
}
