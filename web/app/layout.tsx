import { Playfair_Display, JetBrains_Mono, Outfit } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Vasta",
  description: "Hub de presença digital monetizável"
}

type Props = {
  children: ReactNode
}

import { TurnstileProtection } from "../components/TurnstileProtection"
import { AuthProvider } from "../lib/AuthContext"
import { AuthModal } from "../components/AuthModal"

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jetbrains.variable} ${outfit.variable}`}>
      <body className="bg-vasta-bg text-vasta-text antialiased font-sans">
        <AuthProvider>
          <TurnstileProtection />
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  )
}

