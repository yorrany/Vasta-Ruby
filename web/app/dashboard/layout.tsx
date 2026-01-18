"use client"

import { useState, createContext, useContext, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Menu, X, GripVertical, Image as ImageIcon } from "lucide-react"
import { createClient } from "../../lib/supabase"
import { useAuth } from "../../lib/AuthContext"

// Types for Appearance
export type LinkStyle = 'glass' | 'solid' | 'outline'
export type SiteTheme = 'adaptive' | 'dark' | 'light'

interface AppearanceSettings {
  profileImage: string | null
  coverImage: string | null
  accentColor: string
  bgColor: string | null
  typography: string
  linkStyle: LinkStyle
  theme: SiteTheme
  username: string
  bio: string
}

interface AppearanceContextType {
  settings: AppearanceSettings
  updateSettings: (newSettings: Partial<AppearanceSettings>) => void
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined)

export const useAppearance = () => {
  const context = useContext(AppearanceContext)
  if (!context) throw new Error("useAppearance must be used within AppearanceProvider")
  return context
}

type Props = {
  children: ReactNode
}

const navItems = [
  { href: "/dashboard", label: "Início", exact: true },
  { href: "/dashboard/links", label: "Links" },
  { href: "/dashboard/aparencia", label: "Aparência" },
  { href: "/dashboard/minha-loja", label: "Minha Loja" },
  { href: "/dashboard/vendas", label: "Vendas" }
]

function SidebarLink({ href, label, exact }: { href: string; label: string; exact?: boolean }) {
  const pathname = usePathname()
  const active = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`flex items-center rounded-xl px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-vasta-primary/10 text-vasta-primary font-medium"
          : "text-vasta-muted hover:bg-vasta-surface-soft hover:text-vasta-text"
      }`}
    >
      {label}
    </Link>
  )
}

import AuthGuard from "../../components/auth/AuthGuard"

export default function DashboardLayout({ children }: Props) {
  const { user } = useAuth()
  const supabase = createClient()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Default settings
  const defaultSettings: AppearanceSettings = {
    profileImage: null,
    coverImage: null,
    accentColor: "#6366F1",
    bgColor: null,
    typography: "Inter",
    linkStyle: "glass",
    theme: "adaptive",
    username: "seunome",
    bio: "Sua bio inspiradora"
  }

  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings)

  // Fetch initial settings
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (data) {
        setSettings({
            profileImage: data.profile_image,
            coverImage: data.cover_image,
            accentColor: data.accent_color || "#6366F1",
            bgColor: data.bg_color,
            typography: data.typography || "Inter",
            linkStyle: (data.link_style as LinkStyle) || "glass",
            theme: (data.theme as SiteTheme) || "adaptive",
            username: data.username || "seunome",
            bio: data.bio || ""
        })
      }
    }
    fetchProfile()
  }, [user])

  const updateSettings = async (newSettings: Partial<AppearanceSettings>) => {
    // Optimistic UI update
    setSettings(prev => ({ ...prev, ...newSettings }))
    
    if (!user) return

    // Map frontend settings to DB columns (snake_case)
    const updates: any = {}
    if (newSettings.profileImage !== undefined) updates.profile_image = newSettings.profileImage
    if (newSettings.coverImage !== undefined) updates.cover_image = newSettings.coverImage
    if (newSettings.accentColor !== undefined) updates.accent_color = newSettings.accentColor
    if (newSettings.bgColor !== undefined) updates.bg_color = newSettings.bgColor
    if (newSettings.typography !== undefined) updates.typography = newSettings.typography
    if (newSettings.linkStyle !== undefined) updates.link_style = newSettings.linkStyle
    if (newSettings.theme !== undefined) updates.theme = newSettings.theme
    if (newSettings.username !== undefined) updates.username = newSettings.username
    if (newSettings.bio !== undefined) updates.bio = newSettings.bio

    await supabase.from('profiles').update(updates).eq('id', user.id)
  }

  return (
    <AuthGuard>
      <AppearanceContext.Provider value={{ settings, updateSettings }}>
        <div className="flex h-screen bg-vasta-bg text-vasta-text overflow-hidden">
          
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside 
            className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-vasta-border bg-vasta-surface transition-transform duration-300 md:relative md:translate-x-0 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-vasta-primary to-vasta-accent shadow-lg shadow-vasta-primary/20">
                    <span className="text-xs font-bold text-white">V</span>
                  </div>
                  <span className="text-sm font-bold text-vasta-text tracking-tight">vasta.pro</span>
                </div>
                <button 
                    className="text-vasta-muted hover:text-vasta-text md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="px-4">
              <div className="rounded-2xl bg-vasta-surface-soft p-4 text-xs border border-vasta-border/50">
                <div className="text-vasta-muted font-medium">Seu link</div>
                <div className="mt-1 text-sm font-bold text-vasta-text">@{settings.username}</div>
                <button className="mt-3 w-full rounded-full bg-vasta-bg border border-vasta-border py-1.5 text-xs font-medium text-vasta-text hover:bg-vasta-border/50 transition-colors">
                  Copiar link
                </button>
                <button className="mt-2 w-full rounded-full bg-gradient-to-r from-vasta-primary to-vasta-accent py-1.5 text-xs font-bold text-white shadow-md shadow-vasta-primary/20 hover:shadow-lg transition-all">
                  Compartilhar
                </button>
              </div>
            </div>
            <nav className="mt-6 flex flex-1 flex-col gap-1 px-4 text-sm">
              {navItems.map(item => (
                 <SidebarLink key={item.href} href={item.href} label={item.label} exact={item.exact} />
              ))}
              <div className="my-2 h-px bg-vasta-border/50 mx-2" />
              <SidebarLink href="/" label="Voltar para o site" />
            </nav>
            <div className="border-t border-vasta-border px-4 py-4 text-xs text-vasta-muted">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-vasta-text">@{settings.username}</div>
                  <div className="text-[11px] text-vasta-muted">Plano Free ativo</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex flex-1 flex-col min-w-0 bg-vasta-bg">
            <header className="flex items-center justify-between border-b border-vasta-border bg-vasta-surface/80 backdrop-blur-md px-4 py-3 md:px-6 z-30">
              <div className="flex items-center gap-4">
                  <button 
                    className="text-vasta-muted hover:text-vasta-text md:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <div className="text-sm font-bold text-vasta-text">Dashboard</div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="hidden sm:inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                  Pagamentos ativos
                </span>
                <button className="flex items-center gap-2 rounded-full bg-vasta-surface-soft border border-vasta-border px-3 py-1 text-vasta-text hover:bg-vasta-border/50 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="hidden sm:inline font-medium">@{settings.username}</span>
                </button>
              </div>
            </header>
            
            <main className="flex flex-1 overflow-hidden relative">
              <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 custom-scrollbar">
                {children}
              </div>
              
              {/* Preview Panel */}
              <aside className="hidden w-80 border-l border-vasta-border bg-vasta-surface-soft/30 px-6 py-8 xl:block overflow-y-auto custom-scrollbar">
                <div className="text-xs font-bold uppercase tracking-wider text-vasta-muted mb-6">
                  Preview ao vivo
                </div>
                
                <PreviewMockup settings={settings} />
              </aside>
            </main>
          </div>
        </div>
      </AppearanceContext.Provider>
    </AuthGuard>
  )
}

function PreviewMockup({ settings }: { settings: AppearanceSettings }) {
  const { user } = useAuth()
  const supabase = createClient()
  const [links, setLinks] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
       if (!user) return
       
       // Fetch Links
       const { data: linksData } = await supabase
         .from('links')
         .select('*')
         .eq('profile_id', user.id)
         .eq('is_active', true)
         .order('display_order', { ascending: true })
        
       if (linksData) setLinks(linksData)

       // Fetch Products
       const { data: productsData } = await supabase
         .from('products')
         .select('*')
         .eq('profile_id', user.id)
         .order('created_at', { ascending: false })
         .limit(4) // Limit for preview
        
       if (productsData) setProducts(productsData)
       setLoading(false)
    }

    fetchData()

    // Real-time simple subscription for updates (Optional improvement)
    const channel = supabase.channel('preview-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'links', filter: `profile_id=eq.${user?.id}` }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products', filter: `profile_id=eq.${user?.id}` }, () => fetchData())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  return (
    <div className="flex justify-center sticky top-0">
      <div 
        className="relative h-[600px] w-[300px] rounded-[3.5rem] border-8 border-vasta-surface shadow-2xl overflow-hidden transition-all duration-500 overflow-y-auto custom-scrollbar"
        style={{ 
          fontFamily: settings.typography,
          backgroundColor: settings.bgColor || (settings.theme === 'light' ? '#FAFAF9' : '#0B0E14'), 
          color: settings.theme === 'light' ? '#1C1917' : '#F3F4F6'
        }}
      >
          {/* Cover */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-vasta-surface-soft overflow-hidden shrink-0">
            {settings.coverImage ? (
              <img src={settings.coverImage} className="h-full w-full object-cover" alt="Cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-vasta-primary/20 to-vasta-accent/20" />
            )}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative z-10 p-4 flex flex-col items-center pt-20">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full border-4 shadow-xl overflow-hidden shrink-0"
                  style={{ borderColor: settings.bgColor || (settings.theme === 'light' ? '#FAFAF9' : '#0B0E14') }}
            >
              {settings.profileImage ? (
                <img src={settings.profileImage} className="h-full w-full object-cover" alt="Avatar" />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-tr from-vasta-primary to-vasta-accent">
                    <span className="text-xl font-bold text-white uppercase">{settings.username.slice(0,2)}</span>
                </div>
              )}
            </div>

            <div className="text-center mt-3 mb-6">
                <h2 className="text-base font-bold">@{settings.username}</h2>
                <p className="text-[10px] opacity-60 mt-1 max-w-[200px] leading-relaxed">{settings.bio}</p>
            </div>

            {/* Links */}
            <div className="w-full space-y-3">
              {links.map((link) => (
                <div 
                  key={link.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all shadow-sm ${
                    settings.linkStyle === 'glass' 
                      ? 'bg-white/10 backdrop-blur-md border border-white/20' 
                      : settings.linkStyle === 'solid'
                      ? 'text-white border-transparent'
                      : 'bg-transparent border-2'
                  }`}
                  style={{ 
                    borderColor: (settings.linkStyle === 'outline' || settings.linkStyle === 'glass') ? settings.accentColor : 'transparent',
                    backgroundColor: settings.linkStyle === 'solid' ? settings.accentColor : undefined,
                    color: settings.linkStyle === 'solid' ? '#fff' : (settings.linkStyle === 'outline' ? settings.accentColor : 'inherit'),
                    boxShadow: settings.linkStyle === 'glass' ? `0 0 15px ${settings.accentColor}33` : undefined
                  }}
                >
                    <div className="flex-1 text-center text-xs font-bold truncate px-2">
                      {link.title}
                    </div>
                </div>
              ))}
              {links.length === 0 && !loading && (
                 <div className="text-center py-4 opacity-50 text-[10px] uppercase font-bold tracking-widest">
                    Sem links
                 </div>
              )}
            </div>

            {/* Store Preview */}
            {products.length > 0 && (
              <div className="w-full mt-8">
                  <h3 className="text-center text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3">Loja</h3>
                  <div className="grid gap-2">
                      {products.map(p => (
                        <div key={p.id} className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
                               {p.image_url && <img src={p.image_url} className="h-full w-full object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="text-[10px] font-bold truncate">{p.title}</p>
                               <p className="text-[10px] opacity-70">
                                  {p.price > 0 ? `R$ ${p.price.toFixed(2)}` : 'Grátis'}
                               </p>
                            </div>
                        </div>
                      ))}
                  </div>
              </div>
            )}
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-vasta-surface rounded-b-3xl z-50 shadow-inner" />
      </div>
    </div>
  )
}


