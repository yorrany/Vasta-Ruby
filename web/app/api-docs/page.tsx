import { InfoPageShell } from "../../components/InfoPageShell"

export default function ApiDocsPage() {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-6xl px-4 py-20">
                <header className="mb-16">
                    <span className="text-vasta-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Para desenvolvedores</span>
                    <h1 className="text-5xl font-serif font-black text-white mb-6">API & Webhooks</h1>
                    <p className="text-xl text-vasta-muted max-w-2xl">
                        Automatize seu fluxo e conecte o Vasta ao seu ecossistema existente usando nossa API RESTful.
                    </p>
                </header>

                <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <div className="flex bg-slate-900 border-b border-slate-800 px-6 py-3 items-center justify-between">
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500/30" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                            <div className="h-3 w-3 rounded-full bg-green-500/30" />
                        </div>
                        <span className="text-xs text-slate-500 font-mono">GET /v1/profile</span>
                    </div>
                    <div className="p-8">
                        <pre className="font-mono text-sm text-emerald-400">
                            {`{
  "id": "vast_12345",
  "username": "yorrany",
  "status": "active",
  "plan": "enterprise",
  "branding": {
    "custom_domain": null,
    "white_label": true
  }
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </InfoPageShell>
    )
}
