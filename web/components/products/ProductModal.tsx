"use client"

import { useState, useRef } from "react"
import { X, Loader2, Save, Upload, Image as ImageIcon, DollarSign, Type } from "lucide-react"
import { createClient } from "../../lib/supabase/client"
import { useAuth } from "../../lib/AuthContext"

type Product = {
  id?: number
  title: string
  description: string
  price: number
  image_url: string | null
  file_url: string | null
  type: 'digital' | 'service' | 'physical'
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  productToEdit?: Product | null
  onSuccess: () => void
}

export function ProductModal({ isOpen, onClose, productToEdit, onSuccess }: ProductModalProps) {
  const [title, setTitle] = useState(productToEdit?.title || "")
  const [description, setDescription] = useState(productToEdit?.description || "")
  const [price, setPrice] = useState<string>(productToEdit?.price?.toString() || "")
  const [imageUrl, setImageUrl] = useState<string | null>(productToEdit?.image_url || null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const { user } = useAuth()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    if (file.size > 5 * 1024 * 1024) {
      alert("Imagem deve ter no máximo 5MB")
      return
    }

    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/products/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars') // Reusing avatars bucket for MVP, ideally separate 'products' bucket
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      setImageUrl(publicUrl)
    } catch (error) {
      console.error("Error uploading product image:", error)
      alert("Erro ao fazer upload da imagem.")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const numericPrice = parseFloat(price.replace(',', '.'))

    try {
      const productData = {
        title,
        description,
        price: isNaN(numericPrice) ? 0 : numericPrice,
        image_url: imageUrl,
        type: 'digital', // Default for now
        profile_id: user.id
      }

      if (productToEdit?.id) {
         const { error } = await supabase
           .from('products')
           .update(productData)
           .eq('id', productToEdit.id)
         if (error) throw error
      } else {
         const { error } = await supabase
           .from('products')
           .insert(productData)
         if (error) throw error
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Erro ao salvar produto.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-lg bg-vasta-surface rounded-[2rem] border border-vasta-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-vasta-border">
          <h2 className="text-xl font-bold text-vasta-text">
            {productToEdit ? 'Editar Produto' : 'Novo Produto Digital'}
          </h2>
          <button onClick={onClose} className="text-vasta-muted hover:text-vasta-text transition-colors p-2 hover:bg-vasta-surface-soft rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* Image Upload */}
          <div className="flex justify-center">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer w-full h-48 rounded-2xl bg-vasta-surface-soft border-2 border-dashed border-vasta-border hover:border-vasta-primary/50 transition-all flex flex-col items-center justify-center overflow-hidden"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Product" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-vasta-muted group-hover:text-vasta-primary transition-colors">
                  <div className="p-3 bg-vasta-bg rounded-full shadow-sm">
                    <ImageIcon size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Adicionar Capa</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-[1px]">
                  {uploadingImage ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-xs font-bold text-vasta-muted uppercase tracking-wider mb-2">Nome do Produto</label>
                <div className="relative">
                   <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-vasta-muted" size={16} />
                   <input 
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Ex: E-book de Receitas"
                    className="w-full rounded-xl bg-vasta-surface-soft border border-vasta-border py-3 pl-10 pr-4 text-sm font-medium text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                   />
                </div>
             </div>

             <div>
                <label className="block text-xs font-bold text-vasta-muted uppercase tracking-wider mb-2">Preço (R$)</label>
                <div className="relative">
                   <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-vasta-muted" size={16} />
                   <input 
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="29.90"
                    className="w-full rounded-xl bg-vasta-surface-soft border border-vasta-border py-3 pl-10 pr-4 text-sm font-medium text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all"
                   />
                </div>
             </div>

             <div>
                <label className="block text-xs font-bold text-vasta-muted uppercase tracking-wider mb-2">Descrição</label>
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Detalhes incríveis sobre seu produto..."
                    rows={4}
                    className="w-full rounded-xl bg-vasta-surface-soft border border-vasta-border p-4 text-sm font-medium text-vasta-text focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none transition-all resize-none"
                />
             </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-vasta-primary py-4 text-sm font-bold text-white shadow-lg shadow-vasta-primary/20 hover:bg-vasta-primary-soft hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Salvar Produto</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
