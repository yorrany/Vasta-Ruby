import { InfoPageShell } from "../../components/InfoPageShell"

export default function ExamplesPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-6xl px-4 py-20">
                <header className="text-center mb-20">
                    <h1 className="text-5xl font-serif font-black text-white mb-6">Inspire-se</h1>
                    <p className="text-xl text-vasta-muted">Veja como grandes nomes estão usando o Vasta para escalar seus negócios.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div key={idx} className="group relative rounded-[2rem] bg-slate-900 border border-slate-800 p-2 overflow-hidden hover:border-vasta-primary/50 transition-colors">
                            <div className="aspect-[9/16] rounded-[1.8rem] bg-slate-950 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <h3 className="text-lg font-bold text-white">Example Creator {idx}</h3>
                                    <p className="text-xs text-vasta-muted">Lifestyle & Education</p>
                                </div>
                                <div className="absolute inset-0 bg-slate-800 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPageShell>
    )
}
