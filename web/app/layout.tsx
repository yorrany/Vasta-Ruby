import { Playfair_Display, JetBrains_Mono } from "next/font/google"
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

export const metadata = {
  title: "Vasta",
  description: "Hub de presença digital monetizável"
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-vasta-bg text-vasta-text antialiased font-serif">
        {children}
      </body>
    </html>
  )
}

