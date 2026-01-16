"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export function TurnstileProtection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is globally accessible if the script is loaded
    const windowAny = window as any
    
    const renderTurnstile = () => {
      if (windowAny.turnstile && containerRef.current) {
        windowAny.turnstile.render(containerRef.current, {
          sitekey: "0x4AAAAAACLyd4XoDMS56kOLRKOQfMRUUJU",
          size: "invisible",
          callback: (token: string) => {
            // In a real scenario, you'd send this to your backend or store it
            console.log("Turnstile protection active")
          },
        })
      }
    }

    if (windowAny.turnstile) {
      renderTurnstile()
    } else {
      windowAny.onloadTurnstileCallback = renderTurnstile
    }
  }, [])

  return (
    <>
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" 
        async 
        defer 
      />
      <div ref={containerRef} className="hidden" />
    </>
  )
}
