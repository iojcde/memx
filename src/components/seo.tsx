import nightwind from '@jcdea/nightwind/helper'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

export default function SEO() {
  return (
    <>
      <NextSeo
        title="Jeeho Ahn | Portfolio"
        description="Student, Full Stack Developer, Open Source enthusaist."
        canonical="https:/jcde.xyz/"
        openGraph={{
          url: `https:/jcde.xyz/`,
          title: `Jeeho Ahn | Portfolio`,
          description: `Student, Full Stack Developer, Open Source enthusaist.`,
          site_name: `Jeeho Ahn | Portfolio`,
        }}
        twitter={{
          handle: `@IoJcde`,
          cardType: `summary_large_image`,
        }}
      />
      <Head>
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
        <link
          href="https://rsms.me/inter/font-files/Inter-roman.var.woff2?v=3.19"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script defer data-domain="jcde.xyz" 
          src="https://stats.willit.fail/js/plausible.js" />
      </Head>
    </>
  )
}
