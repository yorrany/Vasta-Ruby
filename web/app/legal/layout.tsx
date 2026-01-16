import { InfoPageShell } from "../../components/InfoPageShell"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <InfoPageShell>
            <div className="mx-auto max-w-4xl px-4 py-12">
                <article className="prose prose-invert prose-slate max-w-none">
                    {children}
                </article>
            </div>
        </InfoPageShell>
    )
}
