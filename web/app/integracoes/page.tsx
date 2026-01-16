import { InfoPageShell } from "../../components/InfoPageShell"

export default function IntegrationsPage() {
    const integrations = ["Stripe", "WhatsApp", "Mailchimp", "Discord", "Pixel Meta", "Google Analytics", "Zapier", "Hotmart"]

    return (
        <InfoPageShell>
            <div className="mx-auto max-w-6xl px-4 py-20 text-center">
                <h1 className="text-5xl font-serif font-black text-white mb-6">Conexões que aceleram</h1>
                <p className="text-xl text-vasta-muted mb-20 max-w-2xl mx-auto">
                    Conecte o Vasta com as ferramentas que você já usa e automatize seu fluxo de vendas.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {integrations.map((name) => (
                        <div key={name} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer group">
                            <div className="h-12 w-12 bg-slate-800 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-white text-sm">{name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPageShell>
    )
}
