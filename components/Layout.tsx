import Footer from './Footer'
import Nav from './Nav'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode, useEffect, useRef } from 'react'

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

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Menu />
      <div ref={containerRef} className="h-screen">
        <NextSeo
          title={title || `Jeeho Ahn - Portfolio`}
          description={
            desc || `Student, Full Stack Developer, Open Source enthusaist.`
          }
          canonical={`https:/jcde.xyz${router.asPath}`}
          openGraph={{
            type: type,
            url: `https:/jcde.xyz${router.asPath}`,
            title: title || `Jeeho Ahn - Portfolio`,
            article: { publishedTime: date },

            description:
              desc || `Student, Full Stack Developer, Open Source enthusaist.`,
            site_name: title || `Jeeho Ahn - Portfolio`,
            images: [
              {
                url: image || ``,
              },
            ],
          }}
          twitter={{
            handle: `@IoJcde`,
            cardType: `summary_large_image`,
          }}
        />
        <Head>
          <link
            href="/static/fonts/PretendardStdVariable.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        {process.env.NODE_ENV == `production` && (
          <Script
            strategy="afterInteractive"
            data-domain="jcde.xyz"
            src="https://stats.willit.fail/js/plausible.js"
          />
        )}
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
