import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <Layout hero>
      <Head>
        <link rel="preload" as="image" href="/images/hero.jpg" />
      </Head>
      <div className="flex w-full z-10" id="content">
        <div className="md:mt-8 mb-48 sm:mt-60 sm:mb-72 lg:mt-48 lg:mb-96 z-20">
          <h1 className="text-[21vw] sm:text-8xl lg:text-8xl dark:text-white leading-tight">
            Hi, I&apos;m{` `}
            <span className=" line-through">
              <b>Jeeho Ahn</b>, a.k.a
            </span>
            {` `}
            <b>JcdeA</b> or <b>io</b>.
          </h1>
          <h2 className=" font-medium text-2xl mt-6">
            Volunteer at{` `}
            <b>
              <a className="font-bold" href="https://fosshost.org">
                Fosshost
              </a>
            </b>
          </h2>
        </div>
      </div>
      <div className="mt-16 ">
        <h1 className="text-6xl leading-tight">
          I&apos;m a <b>student</b> and a <b>software developer</b> based in
          {` `}
          <b>Seoul</b>, South Korea.
        </h1>
        <h2 className="text-3xl mt-12">
          Welcome to my corner of the internet!
        </h2>
        <div className="md:mt-24 mt-20 apply-prose ">
          <h3 className="">Work Experience</h3>
          <ul className="">
            <li>
              <a href="https://fosshost.org">Fosshost</a> - TechOps Volunteer
            </li>
            <li>
              <a className=" text-amber" href="https://vignetteapp.org">
                Vignette
              </a>
              {` `}- Web Developer / Community Relations / Infrastructure
            </li>
          </ul>
        </div>
        <div className="text-lg mt-12">
          <Link href="/about">Learn more -&gt; </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
