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
import dynamic from 'next/dynamic'

const inter = localFont({
  src: '../public/static/fonts/Inter.var.woff2',
  display: 'swap',
  variable: '--font-inter',
})
const Graph = dynamic(() => import('components/Graph'))

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
          <div className="flex max-w-[90rem] mx-auto">
            <div className=' sticky top-0  min-h-dvh h-full hidden lg:block lg:w-[22rem] '>
              <Sidebar tree={tree as DirectoryNode} />
            </div>

            <div className='max-w-4xl w-full mx-auto lg:pt-20'>  {children}</div>
            <div className='lg:block w-64 hidden sticky lg:pt-20 top-0 max-w-80 w-full p-6 min-h-dvh h-full'>
              <Graph />

            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
