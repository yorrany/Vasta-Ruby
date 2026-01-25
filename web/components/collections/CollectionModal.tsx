"use client"

import { useState } from "react"
import { X, Loader2, Save, ArrowLeft, Plus, Trash2, Link as LinkIcon } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { useAuth } from "../../lib/AuthContext"

interface CollectionModalProps {
  isOpen: boolean
  onClose?: () => void
  onSuccess: () => void
  onBack?: () => void
  embedded?: boolean // If true, don't render overlay
}

interface CollectionItem {
  id: string
  title: string
  url: string
  description?: string
}

export function CollectionModal({ isOpen, onClose, onSuccess, onBack, embedded = false }: CollectionModalProps) {
  const [collectionTitle, setCollectionTitle] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  const [items, setItems] = useState<CollectionItem[]>([
    { id: '1', title: '', url: '', description: '' }
  ])
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth()
  const supabase = createClient()

  const addItem = () => {
    const newItem: CollectionItem = {
      id: Date.now().toString(),
      title: '',
      url: '',
      description: ''
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, updates: Partial<CollectionItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item))
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    try {
      // Validate items
      const validItems = items.filter(item => item.title && item.url)
      if (validItems.length === 0) {
        alert("Adicione pelo menos um item válido à coleção.")
        setLoading(false)
        return
      }

      // Get max order
      const { data: maxOrderData } = await supabase
        .from('links')
        .select('display_order')
        .eq('profile_id', user.id)
        .order('display_order', { ascending: false })
        .limit(1)

      const nextOrder = (maxOrderData?.[0]?.display_order ?? 0) + 1

      // Save collection as a special link
      // For MVP, we'll save the first item as the main link and store collection data separately
      // TODO: Create a collections table for better structure
      const { error } = await supabase
        .from('links')
        .insert({
          profile_id: user.id,
          title: collectionTitle || 'Coleção',
          url: `#collection:${Date.now()}`, // Special URL pattern
          icon: '📚',
          is_active: true,
          display_order: nextOrder,
        })

      if (error) throw error

      // TODO: Create a collections table to store collection items
      // For now, we'll create individual links for each item in the collection
      // Or store collection metadata in a separate table
      
      window.dispatchEvent(new CustomEvent('vasta:link-update'))
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving collection:", error)
      alert("Erro ao salvar coleção. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-10 duration-200 fade-in">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-vasta-muted hover:text-vasta-text transition-colors mb-4 w-fit"
        >
          <ArrowLeft size={16} />
          Voltar para galeria
        </button>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-bold text-vasta-text mb-6">Criar Coleção</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">
              Título da Coleção
            </label>
            <input
              type="text"
              required
              value={collectionTitle}
              onChange={e => setCollectionTitle(e.target.value)}
              placeholder="Ex: Meus Projetos Favoritos"
              className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">
              Descrição (opcional)
            </label>
            <textarea
              value={collectionDescription}
              onChange={e => setCollectionDescription(e.target.value)}
              placeholder="Descreva sua coleção..."
              rows={3}
              className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold text-vasta-muted uppercase">
                Itens da Coleção
              </label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 text-xs font-bold text-vasta-primary hover:text-vasta-primary-soft transition-colors"
              >
                <Plus size={14} />
                Adicionar Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="p-4 rounded-xl border border-vasta-border bg-vasta-surface-soft space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-vasta-muted uppercase">Item {index + 1}</span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-vasta-muted hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-vasta-muted mb-1">Título</label>
                    <input
                      type="text"
                      required
                      value={item.title}
                      onChange={e => updateItem(item.id, { title: e.target.value })}
                      placeholder="Nome do item"
                      className="w-full rounded-lg border border-vasta-border bg-vasta-surface px-3 py-2 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-vasta-muted mb-1">URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-vasta-muted" size={14} />
                      <input
                        type="url"
                        required
                        value={item.url}
                        onChange={e => updateItem(item.id, { url: e.target.value })}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-vasta-border bg-vasta-surface px-3 pl-9 py-2 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-vasta-muted mb-1">Descrição (opcional)</label>
                    <input
                      type="text"
                      value={item.description || ''}
                      onChange={e => updateItem(item.id, { description: e.target.value })}
                      placeholder="Breve descrição do item"
                      className="w-full rounded-lg border border-vasta-border bg-vasta-surface px-3 py-2 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
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
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Criar Coleção</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
