import { InfoPageShell } from "../../components/InfoPageShell"

export default function BlogPage() {
    const posts = [
        { title: "Como duplicar suas vendas no Instagram", date: "Jan 12, 2026", category: "Vendas" },
        { title: "A importância do Checkout Transparente", date: "Jan 10, 2026", category: "Dicas" },
        { title: "Lançamento: Novos temas para sua Bio", date: "Jan 05, 2026", category: "Produto" }
    ]

    return (
        <InfoPageShell>
            <div className="mx-auto max-w-6xl px-4 py-20">
                <header className="mb-20">
                    <h1 className="text-5xl font-serif font-black text-white mb-6">Nosso Blog</h1>
                    <p className="text-xl text-vasta-muted">Conteúdo de valor para o seu negócio digital.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {posts.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-video rounded-3xl bg-slate-800 mb-6 overflow-hidden ring-1 ring-slate-700">
                                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <span className="text-vasta-primary font-bold text-xs uppercase tracking-widest">{post.category}</span>
                            <h3 className="text-xl font-bold text-white mt-2 group-hover:text-vasta-primary transition-colors">{post.title}</h3>
                            <p className="text-vasta-muted text-sm mt-3">{post.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPageShell>
    )
}
