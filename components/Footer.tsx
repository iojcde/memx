import { useEffect } from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'

const Footer = () => {
  useEffect(() => {
    gsap.set(`#footer-wrapper`, { yPercent: -25 })

    const uncover = gsap.timeline({ paused: true })

    uncover.to(`#footer-wrapper`, { yPercent: 25, ease: `none` })

    ScrollTrigger.create({
      trigger: `#designs`,
      start: `top top`,
      end: `+=100%`,
      animation: uncover,
      scrub: true,
    })
  })

  return (
    <footer
      id="footer"
      className="dark relative z-0 mx-auto h-screen border-t bg-black transition duration-100"
      aria-labelledby="footerHeading"
      data-cursor="-inverse"
    >
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div id="footer-wrapper" className="relative h-[80vh]">
        <div
          id="contact"
          className="mx-auto max-w-7xl px-4 dark:text-white sm:px-16"
        >
          <h2 className="text-6xl sm:text-8xl lg:text-9xl">Get in touch</h2>
          <div className="mt-4">
            <a className="text-3xl">
              <a href="mailto:io@fosshost.org"> &rarr; io@fosshost.org</a>
            </a>
            <h4 className="mt-4 mb-1 text-4xl">Discord</h4>
            io#8106
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 mx-auto w-full max-w-7xl py-8 no-underline sm:px-16 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a
              href="https://twitter.com/IoJcde"
              className="text-gray-600 dark:text-gray-400"
            >
              <FaTwitter className="h-5 w-5" />
            </a>

            <a
              href="https://github.com/jcdea"
              className="text-gray-600 dark:text-gray-400"
            >
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/jcdea/"
              className="text-gray-600 dark:text-gray-400"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-8 text-base text-gray-600 dark:text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Jeeho Ahn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
