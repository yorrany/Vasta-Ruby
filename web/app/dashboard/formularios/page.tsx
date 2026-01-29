"use client"

import { useState, useEffect } from "react"
import {
  FileText, Loader2, Mail, Calendar, Eye, EyeOff,
  Trash2, Search, Filter, Download, CheckCircle2, XCircle,
  Archive, RotateCcw, AlertTriangle
} from "lucide-react"
import { createClient } from "../../../lib/supabase/client"
import { useAuth } from "../../../lib/AuthContext"
import { ConfirmModal } from "../../../components/ui/ConfirmModal"

interface FormSubmission {
  id: number
  form_id: number
  data: Record<string, any>
  submitted_at: string
  read: boolean
  archived: boolean
  form?: {
    title: string
  }
}

interface Form {
  id: number
  title: string
  description?: string
  destination_email?: string
  fields: any[]
  created_at: string
  _count?: {
    submissions: number
  }
}

export default function FormulariosPage() {
  const { user } = useAuth()
  const supabase = createClient()
  const [forms, setForms] = useState<Form[]>([])
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedForm, setSelectedForm] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterUnread, setFilterUnread] = useState(false)
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active')

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    submissionId: number | null
  }>({ isOpen: false, submissionId: null })
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchForms()
      fetchSubmissions()
    }
  }, [user])

  const fetchForms = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setForms(data || [])
    } catch (error) {
      console.error("Error fetching forms:", error)
    }
  }

  const fetchSubmissions = async (formId?: number) => {
    if (!user) return
    try {
      // Fetch submissions
      let query = supabase
        .from('form_submissions')
        .select('*')
        .eq('profile_id', user.id)
        .order('submitted_at', { ascending: false })

      if (formId) {
        query = query.eq('form_id', formId)
      }

      const { data: submissionsData, error: submissionsError } = await query

      if (submissionsError) throw submissionsError

      // Fetch forms to get titles
      const formIds = [...new Set((submissionsData || []).map((s: any) => s.form_id))]
      const { data: formsData, error: formsError } = await supabase
        .from('forms')
        .select('id, title, fields')
        .in('id', formIds)

      if (formsError) throw formsError

      // Map forms by id
      const formsMap = new Map((formsData || []).map((f: any) => [f.id, f]))

      // Combine data
      const transformedData = (submissionsData || []).map((sub: any) => ({
        ...sub,
        form: formsMap.get(sub.form_id) || { title: 'Formulário' }
      }))

      setSubmissions(transformedData)
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: number, read: boolean) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ read })
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, read } : s
      ))
    } catch (error) {
      console.error("Error updating submission:", error)
    }
  }

  const archiveSubmission = async (id: number) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ archived: true })
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, archived: true } : s
      ))
    } catch (error) {
      console.error("Error archiving submission:", error)
      alert("Erro ao arquivar submissão")
    }
  }

  const unarchiveSubmission = async (id: number) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ archived: false })
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => prev.map(s =>
        s.id === id ? { ...s, archived: false } : s
      ))
    } catch (error) {
      console.error("Error unarchiving submission:", error)
      alert("Erro ao restaurar submissão")
    }
  }

  const requestDelete = (id: number) => {
    setConfirmModal({ isOpen: true, submissionId: id })
  }

  const handleDeleteConfirm = async () => {
    if (!confirmModal.submissionId) return

    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', confirmModal.submissionId)

      if (error) throw error

      setSubmissions(prev => prev.filter(s => s.id !== confirmModal.submissionId))
      setConfirmModal({ isOpen: false, submissionId: null })
    } catch (error) {
      console.error("Error deleting submission:", error)
      alert("Erro ao excluir submissão")
    } finally {
      setActionLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    // Filter by view mode (active vs archived)
    // Note: If archived field is missing (old data), treat as active (false)
    const isArchived = !!submission.archived
    if (viewMode === 'active' && isArchived) return false
    if (viewMode === 'archived' && !isArchived) return false

    if (selectedForm && submission.form_id !== selectedForm) return false
    if (filterUnread && submission.read) return false
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const formTitle = (submission.form as any)?.title?.toLowerCase() || ''
      const dataStr = JSON.stringify(submission.data).toLowerCase()
      if (!formTitle.includes(searchLower) && !dataStr.includes(searchLower)) {
        return false
      }
    }
    return true
  })

  const unreadCount = submissions.filter(s => !s.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-vasta-primary" size={32} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-vasta-text mb-2">Respostas</h1>
          <p className="text-vasta-muted">
            Visualize e gerencie todas as respostas recebidas dos seus formulários
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-vasta-border bg-vasta-surface-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileText className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-vasta-muted uppercase">Total de Formulários Ativos</p>
              <p className="text-2xl font-bold text-vasta-text">{forms.length}</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-vasta-border bg-vasta-surface-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-vasta-muted uppercase">Total de Envios</p>
              <p className="text-2xl font-bold text-vasta-text">{submissions.length}</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-vasta-border bg-vasta-surface-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Mail className="text-orange-500" size={20} />
            </div>
            <div>
              <p className="text-xs text-vasta-muted uppercase">Não Lidos</p>
              <p className="text-2xl font-bold text-vasta-text">{unreadCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex p-1 bg-vasta-surface-soft rounded-xl border border-vasta-border w-fit">
          <button
            onClick={() => setViewMode('active')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'active'
              ? 'bg-vasta-surface text-vasta-text shadow-sm'
              : 'text-vasta-muted hover:text-vasta-text'
              }`}
          >
            Caixa de Entrada
          </button>
          <button
            onClick={() => setViewMode('archived')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'archived'
              ? 'bg-vasta-surface text-vasta-text shadow-sm'
              : 'text-vasta-muted hover:text-vasta-text'
              }`}
          >
            <Archive size={16} />
            Arquivados
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vasta-muted" size={18} />
            <input
              type="text"
              placeholder="Buscar por formulário ou conteúdo..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-vasta-border bg-vasta-surface-soft pl-10 pr-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none"
            />
          </div>
          <select
            value={selectedForm || ''}
            onChange={e => setSelectedForm(e.target.value ? Number(e.target.value) : null)}
            className="rounded-xl border border-vasta-border bg-vasta-surface-soft px-4 py-3 text-sm text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none min-w-[200px]"
          >
            <option value="">Todos os formulários</option>
            {forms.map(form => (
              <option key={form.id} value={form.id}>{form.title}</option>
            ))}
          </select>
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`flex items-center gap-2 rounded-xl border border-vasta-border px-4 py-3 text-sm font-bold transition-all ${filterUnread
              ? 'bg-vasta-primary text-white border-vasta-primary'
              : 'bg-vasta-surface-soft text-vasta-text hover:bg-vasta-surface'
              }`}
          >
            <Filter size={16} />
            Não lidos
          </button>
        </div>
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="p-12 rounded-2xl border border-dashed border-vasta-border bg-vasta-surface-soft/50 text-center">
          <FileText className="mx-auto text-vasta-muted mb-4" size={48} />
          <h3 className="text-lg font-bold text-vasta-text mb-2">Nenhuma submissão encontrada</h3>
          <p className="text-sm text-vasta-muted">
            {submissions.length === 0
              ? "Ainda não há respostas nos seus formulários."
              : "Nenhuma resposta corresponde aos filtros selecionados."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSubmissions.map(submission => (
            <div
              key={submission.id}
              className={`p-5 rounded-2xl border transition-all ${submission.read
                ? 'border-vasta-border bg-vasta-surface-soft'
                : 'border-vasta-primary/30 bg-vasta-primary/5'
                }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-vasta-text">
                      {(submission.form as any)?.title || 'Formulário'}
                    </h3>
                    {!submission.read && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
                        Novo
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-vasta-muted">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(submission.submitted_at).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => markAsRead(submission.id, !submission.read)}
                    className={`p-2 rounded-lg transition-colors ${submission.read
                      ? 'text-vasta-muted hover:text-vasta-text hover:bg-vasta-surface-soft'
                      : 'text-vasta-primary hover:bg-vasta-primary/10'
                      }`}
                    title={submission.read ? 'Marcar como não lido' : 'Marcar como lido'}
                  >
                    {submission.read ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {viewMode === 'active' ? (
                    <button
                      onClick={() => archiveSubmission(submission.id)}
                      className="p-2 rounded-lg text-vasta-muted hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                      title="Arquivar"
                    >
                      <Archive size={18} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => unarchiveSubmission(submission.id)}
                        className="p-2 rounded-lg text-vasta-muted hover:text-green-500 hover:bg-green-500/10 transition-colors"
                        title="Restaurar"
                      >
                        <RotateCcw size={18} />
                      </button>
                      <button
                        onClick={() => requestDelete(submission.id)}
                        className="p-2 rounded-lg text-vasta-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Excluir permanentemente"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {Object.entries(submission.data).map(([key, value]) => {
                  // Find the label for this field
                  const formFields = (submission.form as any)?.fields || []
                  let label = key

                  // 1. Try exact ID match
                  const field = formFields.find((f: any) => f.id === key)
                  if (field) {
                    label = field.label
                  } else {
                    // 2. Try to parse "field-{formId}-{index}" pattern or "FIELD-{formId}-{index}"
                    // This handles auto-generated IDs if the saved ID wasn't used or normalized
                    const match = key.match(/field-\d+-(\d+)/i)
                    if (match && match[1]) {
                      const index = parseInt(match[1], 10)
                      if (formFields[index]) {
                        label = formFields[index].label
                      }
                    }
                  }

                  return (
                    <div key={key} className="p-3 rounded-lg bg-vasta-surface border border-vasta-border/50">
                      <div className="text-xs font-bold text-vasta-muted uppercase mb-1">{label}</div>
                      <div className="text-sm text-vasta-text">
                        {typeof value === 'string' ? value : JSON.stringify(value)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}


      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleDeleteConfirm}
        title="Excluir submissão permanentemente?"
        message="Esta ação não poderá ser desfeita e a submissão será removida do banco de dados."
        confirmText="Excluir"
        variant="danger"
        loading={actionLoading}
      />
    </div>
  )
}
