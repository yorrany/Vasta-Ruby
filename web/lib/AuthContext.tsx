"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type AuthModalMode = 'login' | 'signup'

interface AuthContextType {
  openAuthModal: (mode: AuthModalMode, contextualCTA?: string) => void
  closeAuthModal: () => void
  isOpen: boolean
  mode: AuthModalMode
  contextualCTA?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<AuthModalMode>('signup')
  const [contextualCTA, setContextualCTA] = useState<string | undefined>(undefined)

  const openAuthModal = (newMode: AuthModalMode, cta?: string) => {
    setMode(newMode)
    setContextualCTA(cta)
    setIsOpen(true)
  }

  const closeAuthModal = () => setIsOpen(false)

  return (
    <AuthContext.Provider value={{ openAuthModal, closeAuthModal, isOpen, mode, contextualCTA }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
