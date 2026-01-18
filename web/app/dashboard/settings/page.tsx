"use client"

import { useState, useEffect } from "react"
import { createClient } from "../../../lib/supabase"
import { useAuth } from "../../../lib/AuthContext"
import { User, Mail, Shield, AlertTriangle, Save, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  })

  useEffect(() => {
    if (user) {
        setFormData({
            fullName: user.user_metadata?.full_name || "",
            email: user.email || ""
        })
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setSuccessMsg("")

    // Update Auth Metadata
    const { error } = await supabase.auth.updateUser({
        data: { full_name: formData.fullName }
    })

    // Also update public profile table if needed (sync)
    // For now assuming Auth Metadata is primary for "Account Name"
    
    setLoading(false)
    if (error) {
        alert("Erro ao atualizar perfil")
    } else {
        setSuccessMsg("Perfil atualizado com sucesso!")
        setTimeout(() => setSuccessMsg(""), 3000)
    }
  }

  const sendPasswordReset = async () => {
    if (!user?.email) return
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/dashboard/settings`,
    })
    if (error) alert("Erro ao enviar email: " + error.message)
    else alert("Email de redefinição de senha enviado!")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-vasta-text">Configurações da Conta</h1>
        <p className="text-sm text-vasta-muted">Gerencie seus dados pessoais e segurança.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-vasta-surface border border-vasta-border rounded-2xl p-6 md:p-8">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-vasta-surface-soft rounded-lg">
                <User className="w-5 h-5 text-vasta-text" />
            </div>
            <h2 className="text-lg font-bold text-vasta-text">Dados Pessoais</h2>
         </div>

         <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
            <div className="space-y-2">
                <label className="text-xs font-bold text-vasta-text uppercase tracking-wider">Email</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-vasta-surface-soft/50 rounded-xl border border-vasta-border opacity-70 cursor-not-allowed">
                    <Mail size={16} className="text-vasta-muted" />
                    <span className="text-sm text-vasta-muted font-medium">{formData.email}</span>
                </div>
                <p className="text-[10px] text-vasta-muted">O email não pode ser alterado diretamente.</p>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-vasta-text uppercase tracking-wider">Nome Completo</label>
                <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-vasta-bg rounded-xl border border-vasta-border focus:border-vasta-primary focus:ring-1 focus:ring-vasta-primary outline-none text-sm transition-all"
                    placeholder="Seu nome"
                />
            </div>

            <div className="flex items-center gap-4">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-vasta-text text-vasta-bg font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Salvar Alterações
                </button>
                {successMsg && (
                    <span className="text-xs text-emerald-500 font-bold animate-in fade-in">{successMsg}</span>
                )}
            </div>
         </form>
      </div>

      {/* Security Section */}
      <div className="bg-vasta-surface border border-vasta-border rounded-2xl p-6 md:p-8">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-vasta-surface-soft rounded-lg">
                <Shield className="w-5 h-5 text-vasta-text" />
            </div>
            <h2 className="text-lg font-bold text-vasta-text">Segurança</h2>
         </div>

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-vasta-surface-soft/30 border border-vasta-border">
             <div>
                 <p className="text-sm font-bold text-vasta-text">Senha</p>
                 <p className="text-xs text-vasta-muted">Recomendamos usar uma senha forte e única.</p>
             </div>
             <button 
                onClick={sendPasswordReset}
                className="px-4 py-2 bg-vasta-surface-soft hover:bg-vasta-border border border-vasta-border rounded-lg text-xs font-bold text-vasta-text transition-colors"
             >
                Redefinir Senha
             </button>
         </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6 md:p-8">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-red-500">Zona de Perigo</h2>
         </div>

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                 <p className="text-sm font-bold text-vasta-text">Excluir Conta</p>
                 <p className="text-xs text-vasta-muted">Esta ação é irreversível. Todos os seus dados serão apagados.</p>
             </div>
             <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                onClick={() => alert("Entre em contato com o suporte para excluir sua conta.")}
             >
                Excluir minha conta
             </button>
         </div>
      </div>
    </div>
  )
}
