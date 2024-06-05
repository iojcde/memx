/* eslint-disable @typescript-eslint/quotes */

import '../styles/globals.css'
import '../styles/external-links.css'
import '../styles/cursor.css'
import '../styles/syntax.css'
import '../styles/fonts.css'

import localFont from 'next/font/local'

import Nav from 'components/Nav'
import { Providers } from './providers'
import { Sidebar } from './(viewer)/Sidebar'

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
          <div className="flex">
            <div
              style={{ height: `calc(100vh - 64px)` }}
              className=" sticky top-16 hidden shrink-0 border-r border-neutral-200 dark:border-neutral-800 lg:block"
            >
              <div className=" -ml-3 h-full overflow-y-scroll p-8 pl-16">
                <Sidebar tree={{}} />
              </div>
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
