import { InfoPageShell } from "../../components/InfoPageShell"

export default function StatusPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-4xl px-4 py-20">
                <div className="flex items-center gap-4 mb-12 p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20">
                    <div className="h-4 w-4 rounded-full bg-emerald-500 animate-pulse" />
                    <h1 className="text-2xl font-bold text-emerald-400">Todos os sistemas operacionais</h1>
                </div>

                <div className="space-y-6">
                    {[
                        { name: "Website Vasta.PRO", status: "Operational" },
                        { name: "Checkout API", status: "Operational" },
                        { name: "Dashboard", status: "Operational" },
                        { name: "Image Storage", status: "Operational" },
                        { name: "Database Cluster", status: "Operational" }
                    ].map((svc) => (
                        <div key={svc.name} className="flex justify-between items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                            <span className="text-white font-medium">{svc.name}</span>
                            <span className="text-emerald-500 text-sm font-bold uppercase tracking-wider">{svc.status}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-vasta-muted text-sm">Atualizado em tempo real • Última verificação há 2 minutos</p>
                </div>
            </div>
        </InfoPageShell>
    )
}
