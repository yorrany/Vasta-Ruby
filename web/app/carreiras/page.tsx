import { InfoPageShell } from "../../components/InfoPageShell"

export default function CareersPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-5xl px-4 py-20 text-center">
                <div className="mb-20">
                    <h1 className="text-5xl font-serif font-black text-white mb-6">Venha construir o futuro do Bio-Commerce</h1>
                    <p className="text-xl text-vasta-muted max-w-2xl mx-auto">
                        Somos um time remoto, apaixonado por tecnologia e focado em transformar a vida de milhares de empreendedores digitais.
                    </p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-12">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-8 mb-8">
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-white">Full Stack Engineer</h3>
                            <p className="text-vasta-muted text-sm mt-1">Remoto • Pleno/Sênior</p>
                        </div>
                        <button className="bg-vasta-primary text-white px-6 py-2 rounded-full font-bold">Ver Vaga</button>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-8 mb-8">
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-white">Product Designer (UX/UI)</h3>
                            <p className="text-vasta-muted text-sm mt-1">Remoto • Pleno</p>
                        </div>
                        <button className="bg-vasta-primary text-white px-6 py-2 rounded-full font-bold">Ver Vaga</button>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-vasta-muted">Não encontrou sua vaga? Mande seu currículo para <span className="text-white font-bold">carreiras@vasta.pro</span></p>
                    </div>
                </div>
            </div>
        </InfoPageShell>
    )
}
