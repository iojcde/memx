import Footer from './Footer'
import Nav from './Nav'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode } from 'react'

const Layout: React.FC<{
  className?: string
  children: ReactNode
  title?: string
  date?: string
  image?: string
  desc?: string
  type?: string
  noNav?: boolean
}> = ({ className, children, image, date, title, desc, type, noNav }) => {
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={title || `Jeeho Ahn - Portfolio`}
        description={
          desc || `Student, Full Stack Developer, Open Source enthusaist.`
        }
        canonical={`https:/jcde.xyz/${router.asPath}`}
        openGraph={{
          type: type,
          url: `https:/jcde.xyz/${router.asPath}`,
          title: title || `Jeeho Ahn | Portfolio`,
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
          href="/static/fonts/Inter-roman.var.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {!noNav && <Nav />}

      <main
        className={`mx-auto max-w-5xl w-full px-8 dark:text-gray-100 text-black  ${className}`}
        id="content"
      >
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
