import { ReactChild } from 'react'
import Footer from './footer'
import Nav from './nav'
import SEO from './seo'

const Layout: React.FC<{ className?: string; children: ReactChild }> = ({
  className,
  children,
}) => {
  return (
    <>
      <SEO />
      <Nav />
      <main
        className={`mx-auto max-w-2xl p-4 dark:text-gray-100 text-black  ${className}`}
      >
        {children}
        <Footer />
      </main>
    </>
  )
}

export default Layout
