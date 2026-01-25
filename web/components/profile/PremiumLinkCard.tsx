'use client'

import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

interface PremiumLinkCardProps {
    link: {
        id: number
        title: string
        url: string
        icon: string | null
    }
    theme: 'neo' | 'noir' | 'bento'
    themeConfig: { link: string;[key: string]: any }
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function PremiumLinkCard({ link, theme, themeConfig, onClick }: PremiumLinkCardProps) {
    const [ogImage, setOgImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        if (typeof window === 'undefined') return

        const cacheKey = `vasta-og-${link.url}`
        const cached = sessionStorage.getItem(cacheKey)

        if (cached) {
            setOgImage(cached)
            setLoading(false)
            return
        }

        // Aguarda um pouco para não sobrecarregar em renderização inicial em massa, 
        // mas aqui vamos direto pois a API é edge.
        fetch(`/api/metadata?url=${encodeURIComponent(link.url)}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    if (data.image) {
                        setOgImage(data.image)
                        sessionStorage.setItem(cacheKey, data.image)
                    }
                    setLoading(false)
                }
            })
            .catch(() => {
                if (isMounted) setLoading(false)
            })

        return () => { isMounted = false }
    }, [link.url])

    // Extrair hostname para display 'clean' no Bento
    const hostname = tryGetHostname(link.url)

    // *** HEADER ITEM RENDER ***
    if (link.url.startsWith('header://')) {
        const subtitle = link.url.replace('header://', '')
        return (
            <div className={`w-full py-4 px-2 ${theme === 'neo' ? 'text-black' : theme === 'noir' ? 'text-white' : 'text-gray-800'}`}>
                <h2 className={`
                    text-center font-bold mb-1
                    ${theme === 'neo' ? 'text-2xl uppercase tracking-tighter' : ''}
                    ${theme === 'noir' ? 'text-2xl font-serif tracking-widest' : ''}
                    ${theme === 'bento' ? 'text-xl tracking-tight text-gray-900' : ''}
                `}>
                    {link.title}
                </h2>
                {subtitle && (
                    <p className={`
                        text-center text-sm
                        ${theme === 'neo' ? 'font-medium uppercase tracking-wide opacity-80 border-b-4 border-black pb-4' : ''}
                        ${theme === 'noir' ? 'font-light tracking-wide opacity-60 border-b border-white/20 pb-4' : ''}
                        ${theme === 'bento' ? 'text-gray-500 pb-2' : ''}
                    `}>
                        {subtitle}
                    </p>
                )}
            </div>
        )
    }

    // *** TEXT ITEM RENDER ***
    if (link.url.startsWith('text://')) {
        return (
            <div className={`w-full px-4 -mt-2 mb-4 text-center
                ${theme === 'neo' ? 'font-medium' : ''}
                ${theme === 'noir' ? 'text-white/60 font-light tracking-wide text-sm' : ''}
                ${theme === 'bento' ? 'text-gray-500 text-sm' : ''}
            `}>
                <p>{link.title}</p>
            </div>
        )
    }

    // *** STANDARD LINK RENDER ***
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={`group relative flex items-center w-full min-h-[5.5rem] lg:min-h-[6rem] overflow-hidden ${themeConfig.link}`}
        >
            {/* NOIR: Background Image Layer (Full Cover) */}
            {theme === 'noir' && ogImage && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                        style={{ backgroundImage: `url(${ogImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0" />
                </>
            )}

            {/* NOIR: Fallback Gradient */}
            {theme === 'noir' && !ogImage && (
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/10 to-transparent opacity-50 group-hover:w-full transition-all duration-700 ease-out z-0" />
            )}


            {/* BENTO: Thumbnail Image or Icon (Left Box) */}
            {theme === 'bento' && (
                <div className={`shrink-0 w-14 h-14 ml-5 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 z-10 relative ${ogImage ? 'bg-gray-100 shadow-sm' : 'bg-gray-50 group-hover:bg-vasta-primary/10'}`}>
                    {ogImage ? (
                        <img src={ogImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <div className="text-gray-400 group-hover:text-vasta-primary transition-colors">
                            {link.icon ? <span className="text-xl">{link.icon}</span> : <ExternalLink size={20} />}
                        </div>
                    )}
                </div>
            )}

            {/* NEO: Image Box or Icon Box (Left Sidebar) */}
            {theme === 'neo' && (
                <div className="shrink-0 w-20 h-full border-r-2 border-black bg-vasta-primary flex items-center justify-center overflow-hidden z-10 relative group-hover:bg-black transition-colors">
                    {ogImage ? (
                        <div className="w-full h-full relative">
                            <img src={ogImage} alt="" className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-300" />
                            {/* Overlay para garantir contraste da border se a imagem for clara */}
                            <div className="absolute inset-0 ring-inset ring-2 ring-black/0" />
                        </div>
                    ) : (
                        <div className="text-black group-hover:text-white transition-colors">
                            <ExternalLink size={24} strokeWidth={3} />
                        </div>
                    )}
                </div>
            )}

            {/* Content Area */}
            <div className={`flex-1 flex flex-col justify-center z-10 px-6 py-4 ${theme === 'neo' ? 'pl-6' : ''}`}>
                <span className={`leading-tight line-clamp-2 ${theme === 'neo' ? 'text-xl font-black uppercase text-left tracking-tight decoration-2 underline-offset-2' : theme === 'noir' ? 'text-lg font-serif tracking-wide text-white text-left drop-shadow-md group-hover:text-white' : 'text-lg font-bold text-gray-800 text-left'}`}>
                    {link.title}
                </span>

                {/* Subtitles & Decorators */}
                {theme === 'noir' && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-1 group-hover:text-white transition-colors text-left font-medium flex items-center gap-2">
                        {loading ? 'Carregando preview...' : (ogImage ? 'Visualizar' : 'Explorar')}
                    </span>
                )}

                {theme === 'bento' && (
                    <div className="mt-1 flex items-center gap-2">
                        {ogImage ? (
                            <span className="text-xs text-gray-400 font-medium truncate max-w-[150px]">{hostname}</span>
                        ) : (
                            <div className="h-1 w-8 bg-gray-200 rounded-full group-hover:w-12 group-hover:bg-vasta-primary transition-all duration-500" />
                        )}
                    </div>
                )}
            </div>

            {/* Noir Arrow Action */}
            {theme === 'noir' && (
                <div className="absolute right-6 z-10">
                    <ExternalLink className="text-white/80 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500" size={20} />
                </div>
            )}

            {/* Neo Hover Indicator (Setinha que aparece) */}
            {theme === 'neo' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <ExternalLink size={24} className="text-black" />
                </div>
            )}
        </a>
    )
}

function tryGetHostname(url: string) {
    try {
        return new URL(url).hostname.replace('www.', '')
    } catch {
        return ''
    }
}
