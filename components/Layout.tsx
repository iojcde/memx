import Footer from './Footer'
import Nav from './Nav'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { ReactNode } from 'react'

import Menu from './Menu'

const Layout: React.FC<{
  className?: string
  children: ReactNode
  title?: string
  date?: string
  image?: string
  desc?: string
  type?: string
  hero?: boolean
}> = ({ className, children, image, date, title, desc, type }) => {
  const router = useRouter()

  return (
    <>
      <Menu />
      <div className="h-screen">
        <Nav />
        <main
          className={`relative z-10 w-full overflow-clip pb-24 text-black dark:bg-black dark:text-gray-100  ${className}`}
          id="content"
        >
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Layout
