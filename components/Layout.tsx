import Footer from './Footer'
import Nav from './Nav'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Layout: React.FC<{
  className?: string
  children: ReactNode
  title?: string
  date?: string
  image?: string
  desc?: string
  type?: string
  noNav?: boolean
  hero?: boolean
}> = ({ className, children, image, date, title, desc, type, noNav }) => {
  const router = useRouter()
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const ASScroll = require(`@ashthornton/asscroll`)
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      disableRaf: true,
    })

    gsap.ticker.add(asscroll.update)

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    })

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        return arguments.length
          ? (asscroll.currentPos = value)
          : asscroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    asscroll.on(`update`, ScrollTrigger.update)
    ScrollTrigger.addEventListener(`refresh`, asscroll.resize)

    asscroll.enable()
  })

  return (
    <div asscroll-container="true">
      <div>
        <NextSeo
          title={title || `Jeeho Ahn - Portfolio`}
          description={
            desc || `Student, Full Stack Developer, Open Source enthusaist.`
          }
          canonical={`https:/jcde.xyz${router.asPath}`}
          openGraph={{
            type: type,
            url: `https:/jcde.xyz${router.asPath}`,
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
            href="/static/fonts/PretendardVariable.woff2"
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
        {!noNav && <Nav />}

        <main
          className={` relative w-full overflow-clip text-black dark:text-gray-100  ${className}`}
          id="content"
        >
          {children}
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Layout
