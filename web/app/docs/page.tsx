import { InfoPageShell } from "../../components/InfoPageShell"

export default function DocsPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-6xl px-4 py-20 flex gap-12">
                <aside className="w-64 hidden md:block">
                    <nav className="sticky top-32 space-y-8">
                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Geral</h4>
                            <ul className="space-y-2 text-sm text-vasta-muted">
                                <li className="text-vasta-primary font-bold">Introdução</li>
                                <li>Arquitetura</li>
                                <li>Segurança</li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 max-w-3xl">
                    <h1 className="text-4xl font-black text-white mb-6">Introdução ao Vasta</h1>
                    <p className="text-xl text-vasta-muted mb-8">
                        Bem-vindo à documentação oficial do Vasta. Aprenda como extrair o máximo potencial da nossa plataforma.
                    </p>
                    <div className="prose prose-invert max-w-none text-slate-400 space-y-6">
                        <p>O Vasta é uma plataforma completa de Bio-Commerce que permite unificar sua presença digital em um único link otimizado para conversão.</p>
                        <h2 className="text-2xl font-bold text-white pt-8">Conceitos Básicos</h2>
                        <p>Diferente de agregadores de links comuns, o Vasta foca na funcionalidade de venda direta, checkout transparente e análise de dados avançada.</p>
                    </div>
                </main>
            </div>
        </InfoPageShell>
    )
}
