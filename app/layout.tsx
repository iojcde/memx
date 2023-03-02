/* eslint-disable @typescript-eslint/quotes */

import '../styles/globals.css'
import '../styles/external-links.css'
import '../styles/cursor.css'
import '../styles/syntax.css'
import '../styles/fonts.css'

import localFont from 'next/font/local'

import Nav from 'components/Nav'
import { Providers } from './providers'

const inter = localFont({
  src: '../public/static/fonts/Inter.var.woff2',
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`pt-16 ${inter.className}`} suppressHydrationWarning>
        <Providers>
          <Nav />

          {children}
        </Providers>
      </body>
    </html>
  )
}
