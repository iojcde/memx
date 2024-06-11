/* eslint-disable @typescript-eslint/quotes */

import '../styles/globals.css'
import '../styles/external-links.css'
import '../styles/cursor.css'
import '../styles/syntax.css'
import '../styles/fonts.css'

import localFont from 'next/font/local'
import tree from 'assets/tree.json' 

import { Providers } from './providers'
import { Sidebar } from './(viewer)/Sidebar'
import { DirectoryNode } from 'types/TreeNode'

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
      <body className={`${inter.className}`} suppressHydrationWarning>
        <Providers>
          <div className="flex">
            <div className=' sticky top-0  min-h-dvh h-full hidden lg:block lg:w-96 border-r'>
              <Sidebar tree={tree as DirectoryNode} />
            </div>

            <div className='max-w-3xl w-full lg:pt-20'>  {children}</div>
            <div className='lg:block hidden'>
              

            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
