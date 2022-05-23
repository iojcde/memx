import type { NextPage } from 'next'
import Layout from 'components/Layout'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Hero from 'components/Sections/Hero'
import Details from 'components/Sections/Details'
import Skills from 'components/Sections/Skills'

const Home: NextPage = () => {
  gsap.registerPlugin(ScrollTrigger)

  // wait until DOM has been rendered
  useEffect(() => {
    const wideScreen = window.matchMedia(`(min-width: 800px)`)

    wideScreen.matches &&
      gsap.utils
        .toArray(`.slide-section`)
        .forEach((section: HTMLElement, index) => {
          const w = section.querySelector(`.wrapper`)

          gsap.fromTo(
            w,
            { x: 0 },
            {
              x:
                index % 2 == 0 ? w.scrollWidth * 0.08 : -(w.scrollWidth * 0.08),
              scrollTrigger: {
                trigger: section,
                scrub: 1,
              },
            },
          )
        })
  })

  useEffect(() => {
    gsap.utils
      .toArray(`.scrub-section`)
      .forEach((section: HTMLElement, index) => {
        const w = section.querySelector(`.wrapper`)
        const [x, xEnd] =
          index % 2
            ? [`100%`, (w.scrollWidth - section.offsetWidth) * -1]
            : [w.scrollWidth * -1, 0]
        gsap.fromTo(
          w,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
            },
          },
        )
      })
  })

  return (
    <Layout>
      <Hero />
      <Details />

      <div className="my-16  lg:mt-16" data-cursor="-opaque">
        <div className="scrub-section w-full leading-none">
          <div className="wrapper flex w-full whitespace-nowrap text-5xl font-semibold sm:text-6xl md:text-9xl">
            TypeScript • JavaScript • Go • Rust • Python
          </div>
        </div>
        <hr className="my-4 mx-auto  h-2 max-w-7xl border-none bg-black px-4 dark:bg-white lg:px-8" />
        <div className="scrub-section w-full leading-none">
          <div className="wrapper  flex whitespace-nowrap text-5xl font-semibold sm:text-6xl md:text-9xl">
            React • TailwindCSS • Next.js • Linux • Docker • Ansible • GraphQL
          </div>
        </div>
      </div>

      <Skills />

      <div id="designs" className="mt-16">
        <h2 className="container px-4 text-5xl lg:text-6xl">Designs &darr;</h2>
        <div className="scrub-section mt-8 w-full leading-none">
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
                loading="lazy"
                quality="100"
                width={1000}
                height={400}
                data-cursor-text="See more"
                className="aspect-video h-80 rounded border transition duration-100 dark:brightness-90 dark:hover:brightness-100"
              />
            ))}
          </div>
          <div className="scrub-section mt-4 w-full leading-none">
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
                  width={1000}
                  height={400}
                  quality="100"
                  layout="raw"
                  loading="lazy"
                  data-cursor-text="See more"
                  className="h-80 rounded border transition duration-100 dark:brightness-90 dark:hover:brightness-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="container mt-16 px-4">
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
