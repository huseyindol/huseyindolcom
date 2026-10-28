'use client'

import { createContext, useContext } from 'react'

export interface CookieContextType {
  cookies: Record<string, string>
  updateCookie: (name: string, value: string) => void
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

// Global cookie store for accessing cookies outside of React components
// This is a singleton that gets initialized by the CookieProvider
let globalCookieStore: CookieContextType | null = null

// Initialize global cookie store (called from Provider)
export const initGlobalCookieStore = (store: CookieContextType) => {
  globalCookieStore = store
}

// Get global cookies (can be used in fetcher.ts and other non-React files)
export const getGlobalCookies = (): Record<string, string> => {
  if (!globalCookieStore) {
    console.warn('Cookie store not initialized yet')
    return {}
  }
  return globalCookieStore.cookies
}

// Remove global cookie — logout'ta in-memory cookie'leri anında temizlemek için
// (router.refresh document.cookie'yi yeniden okuyana kadar UI flash'ını önler).
export const removeGlobalCookie = (name: string) => {
  if (!globalCookieStore) {
    console.error('Cookie store not initialized yet')
    return
  }
  // Set to empty string to remove from state
  globalCookieStore.updateCookie(name, '')
}

// Custom hook to use the cookie context
export const useCookie = () => {
  const context = useContext(CookieContext)
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider')
  }
  return context
}

// Helper function to get a specific cookie
export const getCookie = (
  cookies: Record<string, string>,
  name: string,
): string | undefined => {
  return cookies[name]
}

export default CookieContext
