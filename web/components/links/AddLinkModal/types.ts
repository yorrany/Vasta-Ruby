export type AddLinkView = 'gallery' | 'form'

export interface AddLinkState {
  view: AddLinkView
  url?: string
  title?: string
}

export function isValidUrl(text: string) {
  try {
    // If text has no spaces and has a dot, treat it as a potential URL
    if (text.includes(' ') || !text.includes('.')) return false
    
    new URL(text.startsWith('http') ? text : `https://${text}`)
    return true
  } catch {
    return false
  }
}
