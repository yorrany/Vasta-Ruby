"use client"

import { useState, useEffect } from "react"
import { X, Loader2, Save, Trash2 } from "lucide-react"
import { createClient } from "../../lib/supabase"
import { useAuth } from "../../lib/AuthContext"

type LinkItem = {
  id?: number
  title: string
  url: string
  is_active: boolean
  display_order?: number
}

interface LinkModalProps {
  isOpen: boolean
  onClose: () => void
  linkToEdit?: LinkItem | null
  onSuccess: () => void
}

export function LinkModal({ isOpen, onClose, linkToEdit, onSuccess }: LinkModalProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (linkToEdit) {
      setTitle(linkToEdit.title)
      setUrl(linkToEdit.url)
    } else {
      setTitle("")
      setUrl("")
    }
  }, [linkToEdit, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    try {
      if (linkToEdit?.id) {
        // Update
        const { error } = await supabase
          .from('links')
          .update({ title, url })
          .eq('id', linkToEdit.id)
        
        if (error) throw error
      } else {
        // Javascript trick to get the profile_id from Auth User ID
        // The RLS policy "Users can manage own links" checks auth.uid() = profile_id
        // But for INSERT we must explicitly provide profile_id. 
        // Wait, profile_id is uuid references profiles(id). profiles.id IS auth.users.id.
        // So we just pass user.id.
        
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
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving link:", error)
      alert("Erro ao salvar link. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!linkToEdit?.id || !confirm("Tem certeza que deseja excluir este link?")) return
    setLoading(true)
    try {
        const { error } = await supabase.from('links').delete().eq('id', linkToEdit.id)
        if (error) throw error
        onSuccess()
        onClose()
    } catch (error) {
        console.error("Error deleting link:", error)
        alert("Erro ao excluir link.")
    } finally {
        setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-vasta-surface rounded-2xl border border-vasta-border shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-vasta-text">
            {linkToEdit ? 'Editar Link' : 'Novo Link'}
          </h2>
          <button onClick={onClose} className="text-vasta-muted hover:text-vasta-text transition-colors">
            <X size={20} />
          </button>
        </div>

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
            {linkToEdit && (
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 py-3 text-sm font-bold hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                    <Trash2 size={18} />
                    Excluir
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
      </div>
    </div>
  )
}
