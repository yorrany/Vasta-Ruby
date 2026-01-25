"use client"

import { useState, useEffect, useMemo } from "react"
import { X, Loader2, Save, Check, Search, Trash2 } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { useAuth } from "../../lib/AuthContext"

interface CollectionEditModalProps {
    isOpen: boolean
    onClose: () => void
    collectionLink: {
        id: number
        title: string
        url: string
    } | null
    onSuccess: () => void
}

interface Link {
    id: number
    title: string
    url: string
    icon?: string
}

export function CollectionEditModal({ isOpen, onClose, collectionLink, onSuccess }: CollectionEditModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [currentLinkIds, setCurrentLinkIds] = useState<number[]>([])
    const [availableLinks, setAvailableLinks] = useState<Link[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingLinks, setLoadingLinks] = useState(true)

    const { user } = useAuth()
    const supabase = createClient()

    useEffect(() => {
        if (isOpen && collectionLink) {
            // Parse collection data
            try {
                const data = JSON.parse(collectionLink.url.replace('#collection:', ''))
                setTitle(collectionLink.title)
                setDescription(data.description || '')
                setCurrentLinkIds(data.links || [])
            } catch {
                setTitle('')
                setDescription('')
                setCurrentLinkIds([])
            }

            fetchAvailableLinks()
        }
    }, [isOpen, collectionLink])

    const fetchAvailableLinks = async () => {
        if (!user) return
        setLoadingLinks(true)

        try {
            const { data, error } = await supabase
                .from('links')
                .select('id, title, url, icon')
                .eq('profile_id', user.id)
                .eq('is_active', true)
                .not('url', 'like', '#collection:%')
                .not('url', 'like', '#form:%')
                .not('url', 'like', 'header://%')
                .not('url', 'like', 'text://%')
                .order('display_order', { ascending: true })

            if (error) throw error
            setAvailableLinks(data || [])
        } catch (error) {
            console.error('Error fetching links:', error)
            alert('Erro ao carregar links')
        } finally {
            setLoadingLinks(false)
        }
    }

    const currentLinks = useMemo(() => {
        return availableLinks.filter(link => currentLinkIds.includes(link.id))
    }, [availableLinks, currentLinkIds])

    const otherLinks = useMemo(() => {
        return availableLinks.filter(link => !currentLinkIds.includes(link.id))
    }, [availableLinks, currentLinkIds])

    const filteredOtherLinks = otherLinks.filter(link =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const removeLink = (linkId: number) => {
        setCurrentLinkIds(prev => prev.filter(id => id !== linkId))
    }

    const addLink = (linkId: number) => {
        setCurrentLinkIds(prev => [...prev, linkId])
    }

    const handleSave = async () => {
        if (!collectionLink || !user) return

        if (!title.trim()) {
            alert('Título é obrigatório')
            return
        }

        if (currentLinkIds.length === 0) {
            if (!confirm('Salvar esta coleção sem links irá excluí-la. Deseja continuar?')) {
                return
            }

            setLoading(true)
            try {
                const { error } = await supabase
                    .from('links')
                    .delete()
                    .eq('id', collectionLink.id)

                if (error) throw error

                window.dispatchEvent(new Event('vasta:link-update'))
                onSuccess()
                onClose()
            } catch (error) {
                console.error('Error deleting collection:', error)
                alert('Erro ao excluir coleção')
            } finally {
                setLoading(false)
            }
            return
        }

        setLoading(true)

        try {
            const collectionData = {
                description: description.trim(),
                links: currentLinkIds
            }

            const newUrl = `#collection:${JSON.stringify(collectionData)}`

            const { error } = await supabase
                .from('links')
                .update({
                    title: title.trim(),
                    url: newUrl
                })
                .eq('id', collectionLink.id)

            if (error) throw error

            window.dispatchEvent(new Event('vasta:link-update'))
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error updating collection:', error)
            alert('Erro ao salvar coleção')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !collectionLink) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-3xl max-h-[90vh] bg-vasta-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-vasta-border">
                {/* Header */}
                <div className="p-6 border-b border-vasta-border flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-vasta-text">Editar Coleção</h2>
                        <p className="text-sm text-vasta-muted mt-1">
                            Gerencie os links desta coleção
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-vasta-surface-soft rounded-full transition-colors"
                    >
                        <X size={20} className="text-vasta-muted" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-vasta-text mb-2">
                            Título da Coleção
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Meus Projetos Favoritos"
                            className="w-full rounded-xl px-4 py-3 bg-vasta-bg border border-vasta-border text-vasta-text placeholder:text-vasta-muted focus:outline-none focus:ring-2 focus:ring-vasta-primary"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-vasta-text mb-2">
                            Descrição (opcional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva sua coleção..."
                            rows={2}
                            className="w-full rounded-xl px-4 py-3 bg-vasta-bg border border-vasta-border text-vasta-text placeholder:text-vasta-muted focus:outline-none focus:ring-2 focus:ring-vasta-primary resize-none"
                        />
                    </div>

                    {/* Current Links */}
                    <div>
                        <label className="block text-sm font-semibold text-vasta-text mb-3">
                            Links na Coleção ({currentLinks.length})
                        </label>
                        {currentLinks.length === 0 ? (
                            <div className="text-center py-8 text-vasta-muted text-sm border border-dashed border-vasta-border rounded-xl">
                                Nenhum link adicionado ainda
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {currentLinks.map((link) => (
                                    <div
                                        key={link.id}
                                        className="flex items-center gap-3 p-3 bg-vasta-bg border border-vasta-border rounded-xl hover:bg-vasta-surface-soft transition-colors"
                                    >
                                        {link.icon && <span className="text-lg">{link.icon}</span>}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-vasta-text truncate text-sm">
                                                {link.title}
                                            </div>
                                            <div className="text-xs text-vasta-muted truncate">
                                                {link.url}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeLink(link.id)}
                                            className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                                            title="Remover da coleção"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Available Links to Add */}
                    <div>
                        <label className="block text-sm font-semibold text-vasta-text mb-3">
                            Adicionar Links
                        </label>

                        {/* Search */}
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vasta-muted" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar links..."
                                className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-vasta-bg border border-vasta-border text-vasta-text placeholder:text-vasta-muted focus:outline-none focus:ring-2 focus:ring-vasta-primary text-sm"
                            />
                        </div>

                        {loadingLinks ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="animate-spin text-vasta-muted" size={24} />
                            </div>
                        ) : filteredOtherLinks.length === 0 ? (
                            <div className="text-center py-8 text-vasta-muted text-sm border border-dashed border-vasta-border rounded-xl">
                                {searchQuery ? 'Nenhum link encontrado' : 'Todos os links já foram adicionados'}
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {filteredOtherLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => addLink(link.id)}
                                        className="w-full flex items-center gap-3 p-3 bg-vasta-bg border border-vasta-border rounded-xl hover:bg-vasta-surface-soft hover:border-vasta-primary/30 transition-colors text-left"
                                    >
                                        {link.icon && <span className="text-lg">{link.icon}</span>}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-vasta-text truncate text-sm">
                                                {link.title}
                                            </div>
                                            <div className="text-xs text-vasta-muted truncate">
                                                {link.url}
                                            </div>
                                        </div>
                                        <Check size={16} className="text-vasta-primary shrink-0" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-vasta-border flex gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-xl font-bold text-sm text-vasta-text bg-vasta-surface-soft hover:bg-vasta-border transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading || !title.trim()}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-vasta-primary hover:bg-vasta-primary-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-vasta-primary/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Salvar Coleção
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
