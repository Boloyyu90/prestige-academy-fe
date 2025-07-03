import type { Metadata } from 'next'
import { fontVariables } from '@/shared/lib/fonts'
import { MotionProvider } from '@/shared/providers/motion-provider'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prestige Academy - Platform Tryout Terpercaya',
  description: 'Platform tryout online terpercaya untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi',
  keywords: ['tryout', 'CASN', 'CPNS', 'PPPK', 'CAT', 'ujian online'],
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="theme-transitions" suppressHydrationWarning>
    <head>
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </head>
    <body
      className={`
          ${fontVariables} 
          font-sans 
          antialiased 
          theme-transition-colors
          bg-background 
          text-foreground
        `}
      suppressHydrationWarning
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      enableTransitions={true}
      enableSystemDetection={true}
      disableTransitionOnChange={false}
      storageKey="prestige-academy-theme"
      themes={['light', 'dark', 'system']}
    >
      <MotionProvider respectReducedMotion={true}>
        {children}
      </MotionProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}