import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Home: NextPage = () => {
  gsap.registerPlugin(ScrollTrigger)
  const AboutSection = useRef<HTMLDivElement>(null)
  const refs = [AboutSection]

  // wait until DOM has been rendered
  useEffect(() => {
    refs.forEach((section, index) => {
      const w = section.current.querySelector(`.wrapper`)

      gsap.fromTo(
        w,
        { x: 0 },
        {
          x: 100,
          scrollTrigger: {
            trigger: section.current,
            scrub: 1,
          },
        },
      )
    })
  })
  return (
    <Layout hero>
      <div className="h-[90vh] container">
        <div
          className="flex z-10 h-[90vh] float-right absolute bg-rose-200 dark:bg-black w-full transition duration-100"
          id="content"
        >
          <div className="z-20 px-4 lg:px-12 mt-28 md:mt-36 lg:mt-40">
            <h1 className="text-[18vw] sm:text-8xl lg:text-8xl dark:text-white leading-tight">
              <b> I&apos;m a full-stack developer & designer based in Seoul.</b>
            </h1>
            <h2 className="font-medium text-2xl mt-6">
              <b>
                <a className="font-bold" href="https://vignetteapp.org">
                  Vignette
                </a>
              </b>
              {` `}Core Developer
            </h2>
          </div>
        </div>
      </div>
      <div className="text-black " ref={AboutSection}>
        <div className="mt-8 lg:mt-16 w-full px-2 lg:p-8 float-left max-w-7xl bg-teal-200 wrapper">
          <h1 className="text-5xl lg:text-6xl leading-tight">
            I design websites and develop software.
          </h1>
          <p className="max-w-2xl leading-none text-xl mt-4">
            {` `}
            <p>
              I currently volunteer at {` `}
              <b>
                <a href="https://fosshost.org">Fosshost</a>
                {` `}
              </b>
              , a non-profit provider of cloud services for the open source
              community.
            </p>
            <p className="mt-4">
              I&apos;m a Core Developer at{` `}
              <b>
                <a href="https://vignetteapp.org">Vignette</a>,
              </b>
              {` `}
              where I help out with <span className="underline">design</span>,
              <br /> <span className="underline">web development</span>, and
              {` `}
              <span className="underline">managing infrastructure</span>.{` `}
            </p>
            {` `}
            <p className="mt-8">
              I also am a community moderator for the project, which means I
              help moderate the Vignette
              {` `}
              <b>
                {` `}
                <a href="https://go.vignetteapp.org/discord">Discord Server</a>
              </b>
              {` `}.
            </p>
          </p>

          <div className="text-lg mt-12 underline">
            <Link href="/about">Learn more -&gt; </Link>
          </div>
        </div>
      </div>

      <div className="h-screen text-black " ref={AboutSection}>
        <div className="mt-8 lg:mt-16 w-full px-2 lg:p-8 float-left max-w-7xl bg-violet-300 wrapper">
          <h2 className="text-5xl lg:text-6xl leading-tight"> Skills</h2>
          <div className="prose prose-xl">
            <ul>
              <li>Next.js</li>

              <li>React</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
