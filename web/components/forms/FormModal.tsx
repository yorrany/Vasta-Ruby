"use client"

import { useState, useRef } from "react"
import { X, Loader2, Save, ArrowLeft, FileText, Mail, Phone, MessageSquare } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { useAuth } from "../../lib/AuthContext"

interface FormModalProps {
  isOpen: boolean
  onClose?: () => void
  onSuccess: () => void
  onBack?: () => void
  embedded?: boolean // If true, don't render overlay
}

type FormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select'

interface FormField {
  id: string
  label: string
  type: FormFieldType
  required: boolean
  placeholder?: string
  options?: string[] // Para select
}

export function FormModal({ isOpen, onClose, onSuccess, onBack, embedded = false }: FormModalProps) {
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', label: 'Nome', type: 'text', required: true, placeholder: 'Seu nome completo' }
  ])
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth()
  const supabase = createClient()

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: 'Novo Campo',
      type: 'text',
      required: false
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    try {
      // Get max order
      const { data: maxOrderData } = await supabase
        .from('links')
        .select('display_order')
        .eq('profile_id', user.id)
        .order('display_order', { ascending: false })
        .limit(1)

      const nextOrder = (maxOrderData?.[0]?.display_order ?? 0) + 1

      // Save form as a special link with form data in a JSON field or separate table
      // For MVP, we'll save it as a link with a special URL pattern and metadata
      const formData = {
        title: formTitle,
        description: formDescription,
        fields: fields
      }

      const { error } = await supabase
        .from('links')
        .insert({
          profile_id: user.id,
          title: formTitle || 'Formulário',
          url: `#form:${Date.now()}`, // Special URL pattern for forms
          icon: '📝',
          is_active: true,
          display_order: nextOrder,
          // Store form data in a JSON field if available, or we'll need to create a forms table
        })

      if (error) throw error

      // TODO: Create a forms table to store form configuration
      // For now, we'll use a simple approach with links table
      
      window.dispatchEvent(new CustomEvent('vasta:link-update'))
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving form:", error)
      alert("Erro ao salvar formulário. Tente novamente.")
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
        <h2 className="text-xl font-bold text-vasta-text mb-6">Criar Formulário</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">
              Título do Formulário
            </label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              placeholder="Ex: Formulário de Contato"
              className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-vasta-muted uppercase mb-1.5">
              Descrição (opcional)
            </label>
            <textarea
              value={formDescription}
              onChange={e => setFormDescription(e.target.value)}
              placeholder="Descreva o propósito deste formulário..."
              rows={3}
              className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold text-vasta-muted uppercase">
                Campos do Formulário
              </label>
              <button
                type="button"
                onClick={addField}
                className="text-xs font-bold text-vasta-primary hover:text-vasta-primary-soft transition-colors"
              >
                + Adicionar Campo
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 rounded-xl border border-vasta-border bg-vasta-surface-soft space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={e => updateField(field.id, { label: e.target.value })}
                      placeholder="Nome do campo"
                      className="flex-1 rounded-lg border border-vasta-border bg-vasta-surface px-3 py-2 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
                    />
                    <select
                      value={field.type}
                      onChange={e => updateField(field.id, { type: e.target.value as FormFieldType })}
                      className="rounded-lg border border-vasta-border bg-vasta-surface px-3 py-2 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
                    >
                      <option value="text">Texto</option>
                      <option value="email">Email</option>
                      <option value="tel">Telefone</option>
                      <option value="textarea">Texto Longo</option>
                      <option value="select">Seleção</option>
                    </select>
                    <label className="flex items-center gap-2 text-xs text-vasta-muted">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={e => updateField(field.id, { required: e.target.checked })}
                        className="rounded"
                      />
                      Obrigatório
                    </label>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        className="text-vasta-muted hover:text-red-500 transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  {field.type === 'select' && (
                    <div>
                      <input
                        type="text"
                        value={field.options?.join(', ') || ''}
                        onChange={e => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        placeholder="Opções separadas por vírgula (Ex: Opção 1, Opção 2)"
                        className="w-full rounded-lg border border-vasta-border bg-vasta-surface px-3 py-2 text-xs text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
                      />
                    </div>
                  )}
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
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Criar Formulário</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
