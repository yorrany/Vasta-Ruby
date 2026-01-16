"use client"

import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function InfoPageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-vasta-bg font-sans selection:bg-vasta-primary/20">
            <Navbar />
            <div className="pt-24 pb-16">
                {children}
            </div>
            <Footer />
        </div>
    )
}
