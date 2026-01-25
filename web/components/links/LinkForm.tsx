"use client"

import { useState, useEffect } from "react"
import { Loader2, Save } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { useAuth } from "../../lib/AuthContext"

interface LinkFormProps {
    initialTitle?: string
    initialUrl?: string
    linkId?: number
    platform?: string
    onSuccess: () => void
    onCancel?: () => void
}

interface PlatformConfig {
    label: string
    prefix: string
    placeholder: string
    noUrl?: boolean
}

const PLATFORMS: Record<string, PlatformConfig> = {
    instagram: { label: 'Usuário', prefix: 'https://instagram.com/', placeholder: 'usuario' },
    tiktok: { label: 'Usuário', prefix: 'https://tiktok.com/@', placeholder: 'usuario' },
    twitter: { label: 'Usuário', prefix: 'https://x.com/', placeholder: 'usuario' },
    youtube: { label: 'Usuário', prefix: 'https://youtube.com/@', placeholder: 'canal' },
    linkedin: { label: 'Perfil', prefix: 'https://linkedin.com/in/', placeholder: 'usuario' },
    whatsapp: { label: 'Número', prefix: 'https://wa.me/', placeholder: '5511999999999' },
    email: { label: 'Email', prefix: 'mailto:', placeholder: 'nome@exemplo.com' },
    spotify: { label: 'Link', prefix: 'https://open.spotify.com/', placeholder: 'Link do Spotify' },
    header: { label: 'Texto do Cabeçalho', prefix: 'header://', placeholder: 'Seu Cabeçalho', noUrl: true },
    text: { label: 'Texto', prefix: 'text://', placeholder: 'Seu texto aqui', noUrl: true },
}

export function LinkForm({ initialTitle = "", initialUrl = "", linkId, platform, onSuccess, onCancel }: LinkFormProps) {
    const [title, setTitle] = useState(initialTitle)
    const [url, setUrl] = useState(initialUrl)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const supabase = createClient()

    // Get config for current platform
    const platformConfig = platform ? PLATFORMS[platform] : null

    // Initialize logic
    useEffect(() => {
        // If it's a generic link and empty, set https:// default
        if (!platform && !initialUrl && !url) {
            setUrl('https://')
        }
        // If platform exists, maybe set title default?
        if (platform && !initialTitle && !title) {
            if (platform === 'header') setTitle('Novo Título')
            else if (platform === 'text') setTitle('Novo Texto')
            else setTitle(platform.charAt(0).toUpperCase() + platform.slice(1))
        }
    }, [platform, initialUrl])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        setLoading(true)

        try {
            let finalUrl = url.trim()

            // Smart URL construction
            if (platformConfig) {
                if (platformConfig.noUrl) {
                    finalUrl = platformConfig.prefix // e.g. 'header://'
                } else {
                    // Remove prefix if user pasted full URL (basic check)
                    // e.g. user pasted https://instagram.com/user -> we want just 'user' logic or handle it gracefully
                    // Easier: Only prepend if it doesn't look like a URL
                    if (platform === 'email') {
                        if (!finalUrl.startsWith('mailto:')) finalUrl = `mailto:${finalUrl}`
                    } else {
                        const isUrl = finalUrl.startsWith('http') || finalUrl.includes('.com')
                        if (!isUrl) {
                            // Clean @ if present for some platforms
                            if ((platform === 'tiktok' || platform === 'youtube' || platform === 'twitter' || platform === 'instagram') && finalUrl.startsWith('@')) {
                                finalUrl = finalUrl.substring(1)
                            }
                            finalUrl = `${platformConfig.prefix}${finalUrl}`
                        }
                    }
                }
            } else {
                // Generic Link: Ensure protocol
                if (!finalUrl.startsWith('http') && !finalUrl.startsWith('mailto:')) {
                    finalUrl = `https://${finalUrl}`
                }
            }

            if (linkId) {
                // Update
                const { error } = await supabase
                    .from('links')
                    .update({ title, url: finalUrl })
                    .eq('id', linkId)

                if (error) throw error
            } else {
                // Create
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
                        url: finalUrl,
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
                <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">
                    {platformConfig?.noUrl ? (platform === 'header' ? 'Texto do Título' : 'Conteúdo') : 'Título'}
                </label>
                <input
                    type="text"
                    required
                    placeholder={platformConfig?.placeholder || "Ex: Meu Link"}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                />
            </div>

            {!platformConfig?.noUrl && (
                <div>
                    <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">
                        {platformConfig?.label || 'URL'}
                    </label>
                    <div className="relative">
                        {platformConfig ? (
                            <div className="flex items-center">
                                <input
                                    type={platform === 'email' ? "email" : "text"}
                                    required
                                    placeholder={platformConfig.placeholder}
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                required
                                placeholder="https://..."
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                            />
                        )}
                    </div>
                    {platformConfig && (
                        <p className="text-[10px] text-vasta-muted mt-1.5 ml-1">
                            Digite apenas o {platformConfig.label.toLowerCase()}.
                        </p>
                    )}
                </div>
            )}

            <div className="pt-4">
                {/* Cancel button removed as requested */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-vasta-primary text-white py-3 text-sm font-bold hover:bg-vasta-primary-soft transition-all shadow-lg shadow-vasta-primary/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Salvar</>}
                </button>
            </div>
        </form>
    )
}
