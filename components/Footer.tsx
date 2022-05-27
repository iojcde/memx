import { useEffect } from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      id="footer"
      className="dark relative z-0 mx-auto mt-24 h-screen overflow-hidden border-t bg-black transition duration-100"
      aria-labelledby="footerHeading"
      data-cursor="-inverse"
    >
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div id="footer-wrapper" className="relative z-0">
        <div className="mx-auto max-w-7xl px-4 dark:text-white sm:px-16">
          <h2 className="text-6xl sm:text-8xl lg:text-9xl">Get in touch</h2>
          <div className="justify-between lg:flex">
            <div className="">
              <div className="text-3xl">
                <a href="mailto:io@fosshost.org"> &rarr; io@fosshost.org</a>
              </div>
              <h4 className="mt-2 mb-1 text-4xl">Discord</h4>
              io#8106
            </div>

            <div className="mt-4">
              <h2 className="text-4xl dark:text-white">Links</h2>
              <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                <div className="grid grid-cols-2 md:gap-8">
                  <ul className="mt-4 space-y-4 ">
                    <li>
                      <Link href="/" passHref>
                        <a className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 lg:text-xl">
                          Home
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/about" passHref>
                        <a className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 lg:text-xl">
                          About
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/blog">
                        <a className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 lg:text-xl">
                          Blog
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div>
                    <ul className="mt-4 space-y-4 ">
                      <li>
                        <Link href="/stats">
                          <a className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 lg:text-xl">
                            Stats
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/api/trace">
                          <a className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 lg:text-xl">
                            Trace
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/fun">
                          <a className="text-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 lg:text-xl">
                            Fun
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 mx-auto w-full max-w-7xl px-4 py-8 no-underline sm:px-16 md:flex md:items-center md:justify-between">
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
        <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Jeeho Ahn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
