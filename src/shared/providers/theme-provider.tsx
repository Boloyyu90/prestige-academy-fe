'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: React.ReactNode
  enableTransitions?: boolean
  enableSystemDetection?: boolean
  storageKey?: string
}

export function ThemeProvider({
                                children,
                                enableTransitions = true,
                                enableSystemDetection = true,
                                storageKey = 'prestige-academy-theme',
                                ...props
                              }: CustomThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // ✅ FIXED: Single mount effect with NO complex observers
  useEffect(() => {
    setMounted(true)

    if (!enableTransitions) return

    // ✅ FIXED: Simple class addition without complex mutation observers
    document.documentElement.classList.add('theme-transitions')

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('theme-transitions')
    }
  }, [enableTransitions]) // ⚠️ CRITICAL: Only enableTransitions as dependency

  // ✅ FIXED: Simplified system detection without complex event handlers
  useEffect(() => {
    if (!enableSystemDetection || !mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // ✅ FIXED: Simple handler without complex custom events
    const handleSystemThemeChange = () => {
      // Just log for now, avoid complex state updates
      console.log('System theme changed:', mediaQuery.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [enableSystemDetection, mounted])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={enableSystemDetection}
      disableTransitionOnChange={false}
      storageKey={storageKey}
      themes={['light', 'dark', 'system']}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// ✅ FIXED: Simplified theme utilities without complex state management
export function useThemeUtils() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []) // ⚠️ CRITICAL: Empty dependency array

  return {
    mounted,
    // Remove complex system theme detection that could cause loops
  }
}