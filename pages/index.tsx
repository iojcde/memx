import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

const Home: NextPage = () => {
  gsap.registerPlugin(ScrollTrigger)
  const AboutSection = useRef<HTMLDivElement>(null)
  const SkillsSection = useRef<HTMLDivElement>(null)
  const languageScrub1 = useRef<HTMLDivElement>(null)
  const languageScrub2 = useRef<HTMLDivElement>(null)
  const ImageScrub1 = useRef<HTMLDivElement>(null)
  const ImageScrub2 = useRef<HTMLDivElement>(null)

  const sectionRefs = [AboutSection, SkillsSection]

  const scrubRefs = [languageScrub1, languageScrub2, ImageScrub1, ImageScrub2]

  // wait until DOM has been rendered
  useEffect(() => {
    const wideScreen = window.matchMedia(`(min-width: 800px)`)

    sectionRefs.forEach((section, index) => {
      const w = section.current.querySelector(`.wrapper`)

      if (wideScreen.matches) {
        gsap.fromTo(
          w,
          { x: 0 },
          {
            x: index % 2 == 0 ? 100 : -100,
            scrollTrigger: {
              trigger: section.current,
              scrub: 1,
            },
          },
        )
      }
    })
  })

  useEffect(() => {
    scrubRefs.forEach((section, index) => {
      const w = section.current.querySelector(`.wrapper`)
      const [x, xEnd] =
        index % 2
          ? [`100%`, (w.scrollWidth - section.current.offsetWidth) * -1]
          : [w.scrollWidth * -1, 0]
      gsap.fromTo(
        w,
        { x },
        {
          x: xEnd,
          scrollTrigger: {
            trigger: section.current,
            scrub: 0.5,
          },
        },
      )
    })
  })

  return (
    <Layout hero>
      <div className="h-[90vh]">
        <div className="flex h-[90vh] max-w-[78rem] z-10 float-right bg-rose-200 dark:bg-black w-full transition duration-100">
          <div className="z-20 px-4 lg:px-12 pb-8 mt-10 md:mt-36 lg:mt-40">
            <h1 className="text-[18vw] text-6xl sm:text-7xl lg:text-8xl dark:text-white leading-tight">
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
      <div className="text-black overflow-hidden" ref={AboutSection}>
        <div className="mt-8 lg:mt-16 w-full p-2 lg:p-8 float-left max-w-7xl bg-teal-200 wrapper">
          <h1 className="text-4xl lg:text-6xl leading-tight">
            I design websites and develop software.
          </h1>
          <div className="max-w-2xl leading-none text-lg lg:text-xl mt-4">
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
          </div>

          <div className="text-lg mt-6 lg:mt-12 underline">
            <Link href="/about">Learn more -&gt; </Link>
          </div>
        </div>
      </div>

      <div className="mt-20 pb-28">
        <div ref={languageScrub1} className="w-full leading-none">
          <div className="wrapper text-9xl w-full font-semibold flex whitespace-nowrap">
            Typescript • Javascript • Go • Rust • Python
          </div>
        </div>
        <hr className="lg:px-8 my-4  h-2 bg-black dark:bg-white border-none max-w-7xl mx-auto px-4" />
        <div ref={languageScrub2} className="w-full leading-none">
          <div className="wrapper text-9xl font-semibold flex whitespace-nowrap">
            Next.js • TailwindCSS • React • Linux • Docker • GraphQL • Git
          </div>
        </div>
        <div className=" text-black overflow-hidden " ref={SkillsSection}>
          <div className="mt-8 lg:mt-16 w-full p-2 lg:p-8 float-right max-w-7xl bg-violet-300 wrapper">
            <h2 className="text-5xl lg:text-6xl leading-tight"> Skills</h2>

            <ul className="flex flex-col gap-1 text-lg">
              <li>Go</li>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>Next.js</li>
              <li>TailiwndCSS</li>
              <li>React</li>
              <li>Rust</li>
              <li>Python</li>
              <li>
                Linux{` `}
                <span className="line-through text-gray-500 ">
                  (I use arch btw)
                </span>
              </li>
              <li>GraphQL</li>
              <li>Kubernetes</li>
              <li>Git</li>
              <li>...more</li>
            </ul>
          </div>
        </div>
        <div id="designs" className=" mt-8 lg:mt-16">
          <h2 className="text-5xl lg:text-6xl container">Designs &darr;</h2>
          <div ref={ImageScrub1} className="w-full mt-8 leading-none">
            <div className="wrapper flex flex-nowrap gap-4 font-bold whitespace-nowrap">
              {[
                `https://owo.whats-th.is/APDfJDz.png`,
                `https://owo.whats-th.is/5jnX5Vc.png`,
                `https://owo.whats-th.is/8ULhpLf.png`,
              ].map((v, i) => (
                <img
                  key={i}
                  src={v}
                  alt=""
                  className="max-h-96 border rounded"
                />
              ))}
            </div>
          </div>
          <div ref={ImageScrub2} className="w-full mt-4 leading-none">
            <div className="wrapper flex flex-nowrap gap-4 font-bold whitespace-nowrap">
              {[
                `https://owo.whats-th.is/4c2J1EH.png`,
                `https://owo.whats-th.is/DSsroGt.png`,
                `https://owo.whats-th.is/8X4rRPb.png`,
              ].map((v, i) => (
                <img
                  key={i}
                  src={v}
                  alt=""
                  className="max-h-96 border rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="container">
        <h2 className="text-5xl lg:text-6xl">Get in touch</h2>
        <h3 className="text-4xl mt-4 mb-1">Email</h3>
        io@[fosshost dot org]
        <h3 className="text-4xl mt-4 mb-1">Discord</h3>
        io#8106
      </div>
    </Layout>
  )
}

export default Home
