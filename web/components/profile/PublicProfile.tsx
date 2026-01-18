"use client"

import { useEffect, useState } from "react"
import { createClient } from "../../lib/supabase"
import { Loader2, ExternalLink } from "lucide-react"

type LinkStyle = 'glass' | 'solid' | 'outline'
type SiteTheme = 'adaptive' | 'dark' | 'light'

interface ProfileData {
  username: string
  display_name: string
  bio: string
  profile_image: string
  cover_image: string
  theme: SiteTheme
  link_style: LinkStyle
  accent_color: string
  bg_color: string | null
  typography: string
}

interface LinkData {
  id: number
  title: string
  url: string
  icon: string | null
  is_active: boolean
}

interface PublicProfileProps {
  username: string
}

export function PublicProfile({ username }: PublicProfileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [links, setLinks] = useState<LinkData[]>([])
  // Products State
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
        setLoading(true)
        // 1. Get Profile by username
        // Note: We need to make sure username column is searchable.
        // It should be unique.
        
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single()
        
        if (profileError || !profileData) {
            console.error("Profile not found or error:", profileError)
            setError(true)
            setLoading(false)
            return
        }

        setProfile(profileData as ProfileData)

        // 2. Get Links
        const { data: linksData } = await supabase
            .from('links')
            .select('*')
            .eq('profile_id', profileData.id)
            .eq('is_active', true)
            .order('display_order', { ascending: true })

        if (linksData) setLinks(linksData)

        // 3. Get Products (Store)
        const { data: productsData } = await supabase
            .from('products')
            .select('*')
            .eq('profile_id', profileData.id)
            .eq('status', 'active')
            .order('created_at', { ascending: false })

        if (productsData) setProducts(productsData)
        
        // 4. Increment View Count (Fire & Forget)
        // Ideally handled by backend function to avoid spam, but client-side is fine for MVP
        // supabase.rpc('increment_page_view', { page_id: ... })
        
        setLoading(false)
    }

    if (username) fetchData()
  }, [username])

  if (loading) {
     return <div className="flex h-screen items-center justify-center bg-vasta-bg text-vasta-primary"><Loader2 className="h-10 w-10 animate-spin" /></div>
  }

  if (error || !profile) {
      return (
        <div className="flex h-screen flex-col items-center justify-center bg-vasta-bg text-center p-4">
            <h1 className="text-4xl font-bold text-vasta-text mb-2">404</h1>
            <p className="text-vasta-muted">Perfil não encontrado.</p>
        </div>
      )
  }

  // Styles Injection
  const {
      theme,
      link_style,
      accent_color,
      bg_color,
      typography,
      cover_image,
      profile_image
  } = profile

  const isDark = theme === 'dark'
  
  // Dynamic Styles
  const pageStyle = {
      backgroundColor: bg_color || (theme === 'light' ? '#FAFAF9' : '#0B0E14'),
      color: theme === 'light' ? '#1C1917' : '#F3F4F6',
      fontFamily: typography
  }

  return (
    <div style={pageStyle} className="min-h-screen w-full transition-colors duration-500 overflow-x-hidden">
        {/* Helper for Fonts Loading if needed, relying on Google Fonts usually injected in layout */}
        
        <div className="mx-auto max-w-lg min-h-screen relative flex flex-col shadow-2xl bg-opacity-50">
           {/* Cover */}
           <div className="h-48 w-full bg-black/10 relative overflow-hidden">
               {cover_image ? (
                   <img src={cover_image} className="h-full w-full object-cover" alt="Cover" />
               ) : (
                   <div className="h-full w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" style={{ backgroundColor: accent_color + '22' }} />
               )}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
           </div>

           {/* Content */}
           <div className="flex-1 px-6 -mt-16 relative z-10 pb-12">
               {/* Avatar */}
               <div className="flex justify-center mb-6">
                   <div className="h-32 w-32 rounded-full border-4 shadow-xl overflow-hidden" 
                        style={{ borderColor: pageStyle.backgroundColor }}
                   >
                       {profile_image ? (
                           <img src={profile_image} className="h-full w-full object-cover" alt={profile.display_name} />
                       ) : (
                           <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold text-2xl uppercase">
                               {profile.username.slice(0, 2)}
                           </div>
                       )}
                   </div>
               </div>

               {/* Header */}
               <div className="text-center mb-10">
                   <h1 className="text-2xl font-bold tracking-tight mb-2">{profile.display_name || `@${profile.username}`}</h1>
                   {profile.bio && (
                       <p className="text-sm opacity-80 leading-relaxed max-w-xs mx-auto">{profile.bio}</p>
                   )}
               </div>

               {/* Links */}
               <div className="space-y-4">
                   {links.map((link) => (
                       <a
                           key={link.id}
                           href={link.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`block w-full p-4 rounded-[1.25rem] transition-all hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden`}
                           style={{
                               ...(link_style === 'solid' ? { backgroundColor: accent_color, color: '#fff' } : {}),
                               ...(link_style === 'outline' ? { border: `2px solid ${accent_color}`, color: accent_color } : {}),
                               ...(link_style === 'glass' ? { backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' } : {}),
                               // Fallback default
                               ...(!['solid', 'outline'].includes(link_style) && link_style !== 'glass' ? { backgroundColor: accent_color } : {})
                           }}
                           onClick={() => {
                               // Track click if needed
                           }}
                       >
                           <div className="relative z-10 flex items-center justify-center font-bold text-center">
                               {link.title}
                               <ExternalLink size={16} className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </div>
                           
                           {/* Shine Effect for Glass/Solid */}
                           <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shine_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                       </a>
                   ))}
               </div>

               {/* Products Grid */}
               {products.length > 0 && (
                  <div className="mt-12">
                      <h3 className="text-center text-sm font-bold uppercase tracking-widest opacity-50 mb-6 font-sans">Loja</h3>
                      <div className="grid gap-4">
                          {products.map((product) => (
                              <div key={product.id} className="relative overflow-hidden rounded-[1.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 group cursor-pointer hover:scale-[1.02] transition-transform">
                                  <div className="flex h-24">
                                      {product.image_url && (
                                          <div className="w-24 h-full shrink-0 bg-gray-100">
                                              <img src={product.image_url} className="w-full h-full object-cover" alt={product.title} />
                                          </div>
                                      )}
                                      <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                                          <h4 className="font-bold text-lg truncate pr-2 leading-tight">{product.title}</h4>
                                          <div className="mt-2 flex items-center justify-between">
                                              <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg text-xs">
                                                {product.price > 0 ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'Grátis'}
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
               )}
               
               {/* Footer */}
               <footer className="mt-16 text-center">
                   <a href="https://vasta.pro" target="_blank" className="inline-flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                       <span className="text-xs font-bold uppercase tracking-widest">Feito com</span>
                       <span className="font-bold">vasta.pro</span>
                   </a>
               </footer>
           </div>
        </div>
    </div>
  )
}
