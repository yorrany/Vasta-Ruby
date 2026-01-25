"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { PremiumLinkCard } from "./PremiumLinkCard"

interface LinkData {
    id: number
    title: string
    url: string
    icon: string | null
    is_active: boolean
}

interface PublicCollectionItemProps {
    link: LinkData // The collection link itself
    allLinks: LinkData[] // All available links to find children
    theme: any
    themeConfig: any
    linkStyle: string
    accentColor: string
    openForm: (id: number) => void
}

export function PublicCollectionItem({ link, allLinks, theme, themeConfig, linkStyle, accentColor, openForm }: PublicCollectionItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Parse collection data
    let collectionData = { description: '', links: [] as number[] }
    try {
        collectionData = JSON.parse(link.url.replace('#collection:', ''))
    } catch {
        return null // Invalid collection
    }

    // Find child links that exist in allLinks (and preserve order from collectionData.links if possible, or filtered list order)
    // The collectionData.links array defines the order inside the collection
    const childLinks = collectionData.links
        .map(id => allLinks.find(l => l.id === id))
        .filter((l): l is LinkData => !!l)

    if (childLinks.length === 0) return null

    // Base styles from PublicProfile logic
    const baseCardStyles = themeConfig ? "" : `
        block w-full p-4 lg:p-5 mb-4
        group relative overflow-hidden rounded-2xl transition-all duration-300
        ${linkStyle === 'solid' ? `bg-[${accentColor}] text-white` : ''}
        ${linkStyle === 'outline' ? `border-2 border-[${accentColor}] text-[${accentColor}]` : ''}
        ${linkStyle === 'glass' ? (theme === 'light' ? 'bg-black/5 backdrop-blur-md border border-black/10' : 'bg-white/10 backdrop-blur-md border border-white/10') : ''}
        ${!['solid', 'outline', 'glass'].includes(linkStyle) ? `bg-[${accentColor}]` : ''}
    `

    // Determine inline styles dynamically since Tailwind classes with dynamic values (like [${accentColor}]) won't work if not safelisted,
    // but the original code used style={{...}} for colors. We should mimic that.
    const dynamicStyle = !themeConfig ? {
        ...(linkStyle === 'solid' ? { backgroundColor: accentColor, color: '#fff' } : {}),
        ...(linkStyle === 'outline' ? { border: `2px solid ${accentColor}`, color: accentColor } : {}),
        ...(linkStyle === 'glass' ? { backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' } : {}),
        ...(!['solid', 'outline'].includes(linkStyle) && linkStyle !== 'glass' ? { backgroundColor: accentColor } : {})
    } : {}

    // Theme Specific Wrappers
    const wrapperClass = themeConfig
        ? `${themeConfig.link} flex-col !h-auto !min-h-0 p-0` // Reset some link defaults for container
        : `w-full overflow-hidden rounded-2xl transition-all duration-300 mb-4 ${isOpen ? 'ring-2 ring-opacity-50 ring-current' : ''}`

    const headerClass = themeConfig
        ? `w-full flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors`
        : `w-full flex items-center justify-between p-4 lg:p-5 cursor-pointer backdrop-blur-sm`

    // Render Logic
    return (
        <div className={wrapperClass} style={!themeConfig ? dynamicStyle : {}}>
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left flex items-center justify-between group/header outline-none ${theme === 'neo' ? 'p-6' : 'p-4'}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                        {theme === 'neo' ? (
                            <ChevronRight size={24} strokeWidth={3} />
                        ) : (
                            <ChevronRight size={20} />
                        )}
                    </div>
                    <div>
                        <h3 className={`font-bold leading-tight ${theme === 'neo' ? 'text-xl uppercase' : 'text-lg'}`}>
                            {link.title}
                        </h3>
                        {collectionData.description && (
                            <p className={`text-sm mt-1 opacity-70 ${theme === 'noir' ? 'font-light' : ''}`}>
                                {collectionData.description}
                            </p>
                        )}
                    </div>
                </div>

                {childLinks.length > 0 && (
                    <span className="text-xs font-medium opacity-60 bg-black/10 dark:bg-white/10 px-2 py-1 rounded-full">
                        {childLinks.length}
                    </span>
                )}
            </button>

            {/* Content Accordion */}
            <div
                className={`
                    overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
                    ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className={`flex flex-col gap-3 p-4 pt-0 ${theme === 'neo' ? 'px-6 pb-6 border-t-2 border-black' : ''}`}>
                    {childLinks.map((childLink) => (
                        <div key={childLink.id} className="w-full">
                            {themeConfig ? (
                                <PremiumLinkCard
                                    link={childLink}
                                    theme={theme}
                                    themeConfig={{
                                        ...themeConfig,
                                        // Tweaking child styles to visually nested look if needed, 
                                        // currently just passing standard config which is fine.
                                        link: themeConfig.link.replace('shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]', '') // Remove heavy shadow for nested items in Neo to avoid clutter?
                                    }}
                                    onClick={childLink.url.startsWith('#form:') ? (e) => { e.preventDefault(); openForm(childLink.id) } : undefined}
                                />
                            ) : (
                                <a
                                    href={childLink.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={childLink.url.startsWith('#form:') ? (e) => { e.preventDefault(); openForm(childLink.id) } : undefined}
                                    className={`
                                        block w-full p-4 rounded-xl transition-all duration-200
                                        bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20
                                        flex items-center justify-between group/link
                                    `}
                                >
                                    <span className="font-medium text-base">{childLink.title}</span>
                                    {childLink.icon}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
