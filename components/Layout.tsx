import Footer from './Footer'
import Nav from './Nav'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode, useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'
import SoftScrollPlugin from 'lib/softScroll'
import Scrollbar from 'smooth-scrollbar'
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
  gsap.registerPlugin(ScrollTrigger)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia(`(pointer: coarse)`).matches) {
      import(`mouse-follower`).then(({ default: MouseFollower }) => {
        MouseFollower.registerGSAP(gsap)
        document.getElementsByClassName(`mf-cursor`).length == 0 &&
          new MouseFollower({
            stateDetection: {
              '-pointer': `a,button`,
              '-hidden': `iframe`,
            },
          })
      })
    }
  })

  useEffect(() => {
    Scrollbar.use(SoftScrollPlugin)

    const bodyScrollBar = Scrollbar.init(containerRef.current, {
      alwaysShowTracks: false,
      renderByPixels: false,
      damping: 0.075,
    })

    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value
        }
        return bodyScrollBar.scrollTop
      },
    })

    bodyScrollBar.addListener(ScrollTrigger.update)

    ScrollTrigger.defaults({ scroller: containerRef.current })
  })

  return (
    <>
      {/* <Menu /> */}
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
          className={`relative z-10 w-full overflow-clip text-black dark:text-gray-100  ${className}`}
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
