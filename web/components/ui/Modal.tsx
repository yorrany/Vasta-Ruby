"use client"

import React from "react"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, title, children, className = "" }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = "hidden"
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = "unset"
            return () => clearTimeout(timer)
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`relative w-full max-w-md bg-vasta-surface border border-vasta-border rounded-2xl shadow-2xl transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                    } ${className}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-vasta-border">
                    <h3 className="font-bold text-lg text-vasta-text">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-vasta-muted hover:text-vasta-text hover:bg-vasta-surface-soft transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
