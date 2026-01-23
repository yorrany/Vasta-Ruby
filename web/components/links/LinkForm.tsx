"use client"

import { useState } from "react"
import { Loader2, Save } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { useAuth } from "../../lib/AuthContext"

interface LinkFormProps {
    initialTitle?: string
    initialUrl?: string
    linkId?: number
    onSuccess: () => void
    onCancel?: () => void
}

export function LinkForm({ initialTitle = "", initialUrl = "", linkId, onSuccess, onCancel }: LinkFormProps) {
    const [title, setTitle] = useState(initialTitle)
    const [url, setUrl] = useState(initialUrl)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        setLoading(true)

        try {
            if (linkId) {
                // Update
                const { error } = await supabase
                    .from('links')
                    .update({ title, url })
                    .eq('id', linkId)

                if (error) throw error
            } else {
                // Create
                // First get the max order to append to the end
                const { data: maxOrderData } = await supabase
                    .from('links')
                    .select('display_order')
                    .eq('profile_id', user.id)
                    .order('display_order', { ascending: false })
                    .limit(1)

                const nextOrder = (maxOrderData?.[0]?.display_order ?? 0) + 1

                const { error } = await supabase
                    .from('links')
                    .insert({
                        profile_id: user.id,
                        title,
                        url,
                        is_active: true,
                        display_order: nextOrder
                    })

                if (error) throw error
            }
            window.dispatchEvent(new CustomEvent('vasta:link-update'))
            onSuccess()
        } catch (error) {
            console.error("Error saving link:", error)
            alert("Erro ao salvar link. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">Título</label>
                <input
                    type="text"
                    required
                    placeholder="Ex: Meu Portfólio"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">URL</label>
                <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                />
            </div>

            <div className="flex gap-3 pt-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-vasta-border bg-transparent text-vasta-text py-3 text-sm font-bold hover:bg-vasta-surface-soft transition-all disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-vasta-primary text-white py-3 text-sm font-bold hover:bg-vasta-primary-soft transition-all shadow-lg shadow-vasta-primary/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Salvar</>}
                </button>
            </div>
        </form>
    )
}
