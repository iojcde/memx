'use client'

import { SearchProvider } from 'components/SearchContext'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class">
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  )
}
