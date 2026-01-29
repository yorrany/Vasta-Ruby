"use client"

import React from "react"

import { AlertTriangle, Info, Trash2 } from "lucide-react"
import { Modal } from "./Modal"

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    variant?: "danger" | "warning" | "info"
    loading?: boolean
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger",
    loading = false
}: ConfirmModalProps) {

    const getIcon = () => {
        switch (variant) {
            case "danger": return <Trash2 className="text-red-500" size={24} />
            case "warning": return <AlertTriangle className="text-yellow-500" size={24} />
            case "info": return <Info className="text-blue-500" size={24} />
        }
    }

    const getButtonStyles = () => {
        switch (variant) {
            case "danger": return "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
            case "warning": return "bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/20"
            case "info": return "bg-vasta-primary hover:bg-vasta-primary-soft text-white shadow-vasta-primary/20"
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className={`p-3 rounded-full h-fit shrink-0 ${variant === 'danger' ? 'bg-red-500/10' :
                        variant === 'warning' ? 'bg-yellow-500/10' : 'bg-blue-500/10'
                        }`}>
                        {getIcon()}
                    </div>
                    <div>
                        <p className="text-vasta-text text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-vasta-border">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl border border-vasta-border text-vasta-text text-sm font-bold hover:bg-vasta-surface-soft transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all disabled:opacity-50 ${getButtonStyles()}`}
                    >
                        {loading ? "Processando..." : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
