"use client"

import { useState } from "react"
import { X, Trash2, Loader2 } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { LinkForm } from "./LinkForm"

type LinkItem = {
  id: number
  title: string
  url: string
  is_active: boolean
  display_order: number
}

interface LinkModalProps {
  isOpen: boolean
  onClose: () => void
  linkToEdit: LinkItem | null
  onSuccess: () => void
}

export function LinkModal({ isOpen, onClose, linkToEdit, onSuccess }: LinkModalProps) {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!linkToEdit?.id || !confirm("Tem certeza que deseja excluir este link?")) return
    setDeleteLoading(true)
    try {
      const { error } = await supabase.from('links').delete().eq('id', linkToEdit.id)
      if (error) throw error
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error deleting link:", error)
      alert("Erro ao excluir link.")
    } finally {
      setDeleteLoading(false)
    }
  }

  if (!isOpen || !linkToEdit) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-vasta-surface rounded-2xl border border-vasta-border shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-vasta-text">
            Editar Link
          </h2>
          <button onClick={onClose} className="text-vasta-muted hover:text-vasta-text transition-colors">
            <X size={20} />
          </button>
        </div>

        <LinkForm
          initialTitle={linkToEdit.title}
          initialUrl={linkToEdit.url}
          linkId={linkToEdit.id}
          onSuccess={() => {
            onSuccess()
            onClose()
          }}
          onCancel={onClose} // Optional, but nice to have 'Cancel' act as close
        />

        <div className="mt-4 pt-4 border-t border-vasta-border">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 py-3 text-sm font-bold hover:bg-red-500/20 transition-all disabled:opacity-50"
          >
            {deleteLoading ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
            Excluir Link
          </button>
        </div>
      </div>
    </div>
  )
}
