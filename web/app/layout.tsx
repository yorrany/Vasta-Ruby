import { Playfair_Display, JetBrains_Mono, Outfit, Inter, Poppins, Montserrat } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "../components/ThemeProvider"
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata = {
  title: "Vasta",
  description: "Hub de presença digital monetizável",
  icons: {
    icon: "/favicon.png",
  },
}

type Props = {
  children: ReactNode
}

import { TurnstileProtection } from "../components/TurnstileProtection"
import { AuthProvider } from "../lib/AuthContext"
import { AuthModal } from "../components/AuthModal"
import { CookieConsent } from "../components/CookieConsent"

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jetbrains.variable} ${outfit.variable} ${inter.variable} ${poppins.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="bg-vasta-bg text-vasta-text antialiased font-sans transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TurnstileProtection />
            {children}
            <AuthModal />
            <CookieConsent />
            <SpeedInsights />
            <Analytics />
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-S0NR9XB33F"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-S0NR9XB33F');
              `}
            </Script>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

