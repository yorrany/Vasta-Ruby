"use client"

import { ArrowLeft, Instagram, Loader2, Play } from "lucide-react"
import { initiateInstagramAuth } from "@/actions/instagram-auth"

interface IntegrationViewProps {
  type: 'instagram' | 'tiktok' | 'youtube'
  onBack: () => void
  onSuccess: () => void
}

// Simple icon components for TikTok and YouTube
const TikTokIcon = ({ className }: { className?: string }) => (
  <span className={`font-bold text-white ${className}`} style={{ fontSize: '24px' }}>T</span>
)

const YouTubeIcon = ({ className }: { className?: string }) => (
  <Play className={className} size={32} fill="currentColor" />
)

export function IntegrationView({ type, onBack, onSuccess }: IntegrationViewProps) {
  const handleConnect = async () => {
    try {
      if (type === 'instagram') {
        const url = await initiateInstagramAuth()
        if (url) {
          window.location.href = url
        }
      } else {
        // TikTok e YouTube ainda não implementados
        alert(`${type === 'tiktok' ? 'TikTok' : 'YouTube'} integração em breve!`)
      }
    } catch (error: any) {
      alert(error.message || 'Erro ao iniciar conexão.')
    }
  }

  const getIntegrationInfo = () => {
    switch (type) {
      case 'instagram':
        return {
          name: 'Instagram',
          icon: Instagram,
          description: 'Conecte sua conta do Instagram para exibir seus posts e reels automaticamente no seu perfil.',
          color: 'from-yellow-500 via-red-500 to-purple-500',
          action: 'Conectar com Instagram'
        }
      case 'tiktok':
        return {
          name: 'TikTok',
          icon: TikTokIcon,
          description: 'Compartilhe seus TikToks no seu perfil.',
          color: 'bg-black',
          action: 'Conectar com TikTok'
        }
      case 'youtube':
        return {
          name: 'YouTube',
          icon: YouTubeIcon,
          description: 'Compartilhe vídeos do YouTube no seu perfil.',
          color: 'bg-red-600',
          action: 'Conectar com YouTube'
        }
    }
  }

  const info = getIntegrationInfo()
  const Icon = info.icon

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-10 duration-200 fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-vasta-muted hover:text-vasta-text transition-colors mb-4 w-fit"
      >
        <ArrowLeft size={16} />
        Voltar para galeria
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className={`h-20 w-20 rounded-2xl ${type === 'instagram' ? `bg-gradient-to-tr ${info.color}` : info.color} flex items-center justify-center shadow-lg`}>
          {type === 'instagram' ? (
            <Icon className="text-white" size={32} />
          ) : (
            <Icon className="text-white" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-vasta-text mb-2">Conectar {info.name}</h2>
          <p className="text-sm text-vasta-muted max-w-md">
            {info.description}
          </p>
        </div>

        <button
          onClick={handleConnect}
          className="flex items-center justify-center gap-2 rounded-xl bg-vasta-primary text-white py-4 px-8 text-sm font-bold hover:bg-vasta-primary-soft transition-all shadow-lg shadow-vasta-primary/20"
        >
          {type === 'instagram' ? (
            <Icon size={18} />
          ) : (
            <Icon />
          )}
          {info.action}
        </button>

        {type === 'instagram' && (
          <div className="mt-8 p-4 rounded-xl bg-vasta-surface-soft border border-vasta-border text-left max-w-md">
            <p className="text-xs text-vasta-muted">
              <strong className="text-vasta-text">Como funciona:</strong>
              <br />
              Você será redirecionado para o Instagram para autorizar a conexão. Após autorizar, seus posts e reels serão exibidos automaticamente no seu perfil.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
