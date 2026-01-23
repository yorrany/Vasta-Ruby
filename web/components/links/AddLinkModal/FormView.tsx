"use client"

import { ArrowLeft } from "lucide-react"
import { LinkForm } from "../LinkForm"

interface FormViewProps {
    initialUrl?: string
    initialTitle?: string
    onBack: () => void
    onSuccess: () => void
}

export function FormView({ initialUrl, initialTitle, onBack, onSuccess }: FormViewProps) {
    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right-10 duration-200 fade-in">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-vasta-muted hover:text-vasta-text transition-colors mb-4 w-fit"
            >
                <ArrowLeft size={16} />
                Voltar para galeria
            </button>

            <div className="flex-1">
                <h2 className="text-xl font-bold text-vasta-text mb-6">Adicionar Link</h2>
                <LinkForm
                    initialUrl={initialUrl}
                    initialTitle={initialTitle}
                    onSuccess={onSuccess}
                    onCancel={onBack}
                />
            </div>
        </div>
    )
}
