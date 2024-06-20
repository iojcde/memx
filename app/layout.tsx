/* eslint-disable @typescript-eslint/quotes */

import '../styles/globals.css'
import '../styles/external-links.css'
import '../styles/cursor.css'
import '../styles/syntax.css'
import '../styles/fonts.css'

import localFont from 'next/font/local'
import tree from 'assets/tree.json'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from './(viewer)/Sidebar'
import { DirectoryNode } from 'types/TreeNode'
import dynamic from 'next/dynamic'
import { SearchMenu } from 'components/Search'

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
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={`${inter.className} relative h-dvh`}>
                <ThemeProvider attribute="class">
                    <SearchMenu />
                    <div className="mx-auto flex max-w-[90rem]">
                        <div className=" sticky top-0 hidden h-dvh self-start  lg:block lg:w-[22rem] ">
                            <Sidebar tree={tree as DirectoryNode} />
                        </div>

                        <div className="mx-auto w-full max-w-4xl lg:pt-20">
                            {children}
                        </div>
                        <div className="sticky inset-y-0 hidden h-full min-h-dvh w-full  max-w-80 p-6 lg:block lg:pt-20">
                            <Graph />
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
