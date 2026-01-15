import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-slate-800 bg-slate-950 pt-16">
            <div className="mx-auto max-w-6xl px-4">

                {/* Newsletter Section */}
                <div className="mb-16 rounded-3xl bg-slate-900/50 border border-slate-800 p-8 md:p-12 relative overflow-hidden">

                    {/* Glow effect */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-vasta-primary/10 blur-[80px]" />

                    <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-md">
                            <h3 className="text-2xl font-bold text-white mb-2">Fique por dentro das novidades</h3>
                            <p className="text-vasta-muted">Receba dicas, atualizações e recursos exclusivos direto no seu e-mail.</p>
                        </div>
                        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-vasta-primary focus:outline-none focus:ring-1 focus:ring-vasta-primary"
                            />
                            <button className="rounded-xl bg-gradient-to-r from-vasta-primary to-vasta-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
                                Inscrever
                            </button>
                        </div>
                    </div>

                    {/* Trust badge example */}
                    <div className="mt-8 flex items-center gap-4 border-t border-slate-800/50 pt-4 md:mt-0 md:border-0 md:pt-0 md:absolute md:bottom-8 md:right-12 lg:right-16">
                        {/* Placeholder for trust badge if needed, strictly text for now based on image */}
                        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-medium text-white">Sucesso!</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-12 border-t border-slate-800 py-12 md:grid-cols-2 lg:grid-cols-6">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-vasta-primary to-vasta-accent">
                                <span className="text-xs font-semibold text-white">V</span>
                            </div>
                            <span className="text-lg font-bold text-white">VASTA.PRO</span>
                        </div>
                        <p className="mt-4 max-w-xs text-sm text-vasta-muted">
                            A plataforma de bio-links para profissionais. Unifique sua presença digital e venda mais.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a href="#" className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Produto</h4>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Recursos</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Preços</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Exemplos</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Integrações</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Empresa</h4>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Sobre nós</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Blog</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Carreiras</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Contato</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Recursos</h4>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Central de Ajuda</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Documentação</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Status</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">API</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-white">Legal</h4>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Privacidade</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Termos de Uso</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Padrão LGPD</Link>
                        <Link href="#" className="text-sm text-vasta-muted hover:text-vasta-primary">Cookies</Link>
                    </div>
                </div>

                <div className="border-t border-slate-800 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-vasta-muted">
                            YORRANY MARTINS BRAGA LTDA - CNPJ: 63.839.428/0001-04 - (92) 98101-5056
                        </p>
                        <div className="flex gap-6 text-xs text-vasta-muted">
                            <Link href="#" className="hover:text-white">Privacidade</Link>
                            <Link href="#" className="hover:text-white">Termos</Link>
                            <Link href="#" className="hover:text-white">LGPD</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
