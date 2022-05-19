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
        <div className="z-10 float-right flex h-[90vh] w-full max-w-[78rem] bg-rose-200 transition duration-100 dark:border-gray-400 dark:bg-black dark:lg:border">
          <div className="z-20 mt-10 px-4 pb-8 md:mt-36 lg:mt-40 lg:px-12">
            <h1 className="text-[18vw] text-6xl leading-tight dark:text-white sm:text-7xl lg:text-8xl">
              <b> I&apos;m a full-stack developer & designer based in Seoul.</b>
            </h1>
            <h2 className="mt-6 text-2xl font-medium">
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
      <div className="overflow-hidden text-black" ref={AboutSection}>
        <div className="wrapper float-left mt-8 w-full max-w-7xl bg-teal-200 p-2 lg:mt-16 lg:p-8">
          <h1 className="text-4xl leading-tight lg:text-6xl">
            I design websites and develop software.
          </h1>
          <div className="mt-4 max-w-2xl text-lg leading-none lg:text-xl">
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

          <div className="mt-6 text-lg underline lg:mt-12">
            <Link href="/about">Learn more -&gt; </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-28 lg:mt-16">
        <div ref={languageScrub1} className="w-full leading-none">
          <div className="wrapper flex w-full whitespace-nowrap text-5xl font-semibold sm:text-6xl md:text-9xl">
            TypeScript • JavaScript • Go • Rust • Python
          </div>
        </div>
        <hr className="my-4 mx-auto  h-2 max-w-7xl border-none bg-black px-4 dark:bg-white lg:px-8" />
        <div ref={languageScrub2} className="w-full leading-none">
          <div className="wrapper flex whitespace-nowrap text-5xl font-semibold sm:text-6xl md:text-9xl">
            React • TailwindCSS • Next.js • Linux • Docker • Ansible • GraphQL
          </div>
        </div>
        <div className=" overflow-hidden text-black " ref={SkillsSection}>
          <div className="wrapper float-right mt-8 w-full max-w-7xl bg-violet-300 p-2 lg:mt-16 lg:p-8">
            <h2 className="text-5xl leading-tight lg:text-6xl"> Skills</h2>

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
                <span className="text-gray-500 line-through ">
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
          <h2 className="container px-4 text-5xl lg:text-6xl">
            Designs &darr;
          </h2>
          <div ref={ImageScrub1} className="mt-8 w-full leading-none">
            <div className="wrapper flex flex-nowrap gap-4 whitespace-nowrap font-bold">
              {[
                `https://owo.whats-th.is/APDfJDz.png`,
                `https://owo.whats-th.is/5jnX5Vc.png`,
                `https://owo.whats-th.is/8ULhpLf.png`,
              ].map((v, i) => (
                <img
                  key={i}
                  src={v}
                  alt=""
                  className="max-h-96 rounded border"
                />
              ))}
            </div>
          </div>
          <div ref={ImageScrub2} className="mt-4 w-full leading-none">
            <div className="wrapper flex flex-nowrap gap-4 whitespace-nowrap font-bold">
              {[
                `https://owo.whats-th.is/4c2J1EH.png`,
                `https://owo.whats-th.is/DSsroGt.png`,
                `https://owo.whats-th.is/8X4rRPb.png`,
              ].map((v, i) => (
                <img
                  key={i}
                  src={v}
                  alt=""
                  className="max-h-96 rounded border"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="container px-4">
        <h2 className="text-5xl lg:text-6xl">Get in touch</h2>
        <h3 className="mt-4 mb-1 text-4xl">Email</h3>
        io@[fosshost dot org]
        <h3 className="mt-4 mb-1 text-4xl">Discord</h3>
        io#8106
      </div>
    </Layout>
  )
}

export default Home
