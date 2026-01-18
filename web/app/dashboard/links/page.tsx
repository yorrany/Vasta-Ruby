"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus, Loader2 } from "lucide-react"
import { createClient } from "../../../lib/supabase"
import { useAuth } from "../../../lib/AuthContext"
import { LinkModal } from "../../../components/links/LinkModal"

type LinkItem = {
  id: number
  title: string
  url: string
  is_active: boolean
  display_order: number
}

interface SortableItemProps {
  link: LinkItem
  toggleActive: (id: number, currentState: boolean) => void
  onEdit: (link: LinkItem) => void
}

function SortableLinkItem({ link, toggleActive, onEdit }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 rounded-2xl border border-vasta-border bg-vasta-surface/50 p-4 transition-all hover:bg-vasta-surface ${
        isDragging ? "shadow-2xl brightness-110 scale-[1.02]" : "shadow-sm"
      } ${!link.is_active ? "opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-vasta-muted transition-colors hover:text-vasta-text p-2 -ml-2 rounded-lg hover:bg-vasta-surface-soft"
      >
        <GripVertical size={20} />
      </div>

      <div className="flex-1 space-y-0.5 min-w-0">
        <div className="font-semibold text-vasta-text truncate">{link.title}</div>
        <div className="text-xs text-vasta-muted truncate">{link.url}</div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button 
           onClick={() => onEdit(link)}
           className="rounded-lg bg-vasta-surface-soft px-3 py-1.5 text-xs font-medium text-vasta-text transition-colors hover:bg-vasta-border"
        >
          Editar
        </button>
        <button
          onClick={() => toggleActive(link.id, link.is_active)}
          className={`relative h-6 w-11 rounded-full p-1 transition-colors ${
            link.is_active
              ? "bg-emerald-500"
              : "bg-vasta-muted/30"
          }`}
        >
          <div
            className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              link.is_active ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default function LinksPage() {
  const { user } = useAuth()
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)

  const supabase = createClient()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const fetchLinks = async () => {
    if (!user) return
    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', user.id)
      .order('display_order', { ascending: true })
    
    if (data) setLinks(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchLinks()
  }, [user])

  const toggleActive = async (id: number, currentState: boolean) => {
    // Optimistic update
    setLinks(current =>
      current.map(link =>
        link.id === id ? { ...link, is_active: !currentState } : link
      )
    )

    // Server update
    await supabase.from('links').update({ is_active: !currentState }).eq('id', id)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        const newItems = arrayMove(items, oldIndex, newIndex)

        // Persist new order
        // We update the display_order for all affected items
        // Strategy: update locally, then sync entire list order to DB
        // Optimization: only update validation logic if needed, but for small lists (links < 20), Promise.all is fine.
        
        const updates = newItems.map((item, index) => ({
            id: item.id,
            display_order: index,
            // we have to be careful not to overwrite other fields if we use upsert, but update is safer loop
        }))

        // Fire and forget (or handle error quietly)
        updates.forEach(upd => {
            supabase.from('links').update({ display_order: upd.display_order }).eq('id', upd.id).then()
        })

        return newItems
      })
    }
  }

  const openNewLinkModal = () => {
    setEditingLink(null)
    setIsModalOpen(true)
  }

  const openEditModal = (link: LinkItem) => {
    setEditingLink(link)
    setIsModalOpen(true)
  }

  if (loading) {
     return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-vasta-primary" /></div>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-32 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vasta-text">Meus links</h1>
          <p className="text-sm text-vasta-muted">Organize e gerencie seus links públicos</p>
        </div>
        <button 
          onClick={openNewLinkModal}
          className="flex items-center justify-center gap-2 rounded-2xl bg-vasta-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-vasta-primary-soft shadow-lg shadow-vasta-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> Adicionar novo link
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-vasta-surface-soft/50 rounded-2xl w-fit">
        <button className="rounded-xl px-4 py-2 text-sm font-medium bg-vasta-surface text-vasta-text shadow-sm transition-all border border-vasta-border">
          Todos ({links.length})
        </button>
        <button className="rounded-xl px-4 py-2 text-sm font-medium text-vasta-muted hover:text-vasta-text transition-all">
          Ativos ({links.filter(l => l.is_active).length})
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4">
          <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
            {links.map(link => (
              <SortableLinkItem 
                 key={link.id} 
                 link={link} 
                 toggleActive={toggleActive} 
                 onEdit={openEditModal}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      {links.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-vasta-border py-20 text-center bg-vasta-surface/30">
          <div className="h-16 w-16 rounded-full bg-vasta-surface-soft flex items-center justify-center mb-4 text-vasta-muted">
             <Plus size={32} />
          </div>
          <h3 className="font-bold text-vasta-text mb-1">Crie seu primeiro link</h3>
          <p className="text-sm text-vasta-muted max-w-xs mx-auto mb-6">Compartilhe seu Instagram, LinkedIn, loja ou qualquer outro site.</p>
          <button 
             onClick={openNewLinkModal}
             className="text-sm font-bold text-vasta-primary hover:underline"
          >
             Adicionar link agora
          </button>
        </div>
      )}

      <LinkModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        linkToEdit={editingLink}
        onSuccess={fetchLinks}
      />
    </div>
  )
}

