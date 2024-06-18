'use client'

import Search from 'components/Search'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class">
            <Search />
            {children}
        </ThemeProvider>
    )
}
