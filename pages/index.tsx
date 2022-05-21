import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import MouseFollower from 'mouse-follower'
import Image from 'next/image'
import Hero from 'components/Sections/Hero'
import Details from 'components/Sections/Details'
import Skills from 'components/Sections/Skills'

const Home: NextPage = () => {
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    MouseFollower.registerGSAP(gsap)
    const cursor = new MouseFollower({
      stateDetection: {
        '-pointer': `a,button`,
        '-hidden': `iframe`,
      },
    })
  })

  const DetailsRef = useRef<HTMLDivElement>(null)
  const SkillsRef = useRef<HTMLDivElement>(null)
  const languageScrub1 = useRef<HTMLDivElement>(null)
  const languageScrub2 = useRef<HTMLDivElement>(null)
  const ImageScrub1 = useRef<HTMLDivElement>(null)
  const ImageScrub2 = useRef<HTMLDivElement>(null)

  const sectionRefs = [DetailsRef, SkillsRef]

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
    <Layout>
      <Hero />
      <Details sectionRef={DetailsRef} />

      <Skills sectionRef={SkillsRef} />

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
                <Image
                  key={i}
                  src={v}
                  alt=""
                  layout="raw"
                  quality="100"
                  width={2000}
                  height={800}
                  className="max-h-80 rounded border transition duration-100 dark:brightness-[.85] dark:hover:brightness-100"
                />
              ))}
            </div>
          </div>
          <div ref={ImageScrub2} className="mt-4 w-full leading-none">
            <div className="wrapper flex flex-nowrap gap-4 whitespace-nowrap font-bold ">
              {[
                `https://owo.whats-th.is/4c2J1EH.png`,
                `https://owo.whats-th.is/8X4rRPb.png`,
                `https://owo.whats-th.is/DSsroGt.png`,
              ].map((v, i) => (
                <Image
                  key={i}
                  src={v}
                  alt=""
                  width={2000}
                  height={800}
                  quality="100"
                  layout="raw"
                  className="max-h-80 rounded border transition duration-100 dark:brightness-[.85] dark:hover:brightness-100"
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
