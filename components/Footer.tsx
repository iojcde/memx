import React from 'react'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => (
  <footer
    className="bg-primary border-primary mx-auto mt-12 max-w-5xl border-t py-6 transition duration-100"
    aria-labelledby="footerHeading"
  >
    <h2 id="footerHeading" className="sr-only">
      Footer
    </h2>
    <div className="mt-2  px-4 sm:px-6 lg:px-8 ">
      <div className="grid grid-cols-2 gap-8 xl:col-span-2">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Pages
            </h3>
            <ul className="mt-4 space-y-4 ">
              <li>
                <Link href="/" passHref>
                  <a className="text-base text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                    Home
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/about" passHref>
                  <a className="text-base text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                    About
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/blog">
                  <a className="text-base text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Extra
            </h3>
            <ul className="mt-4 space-y-4 ">
              <li>
                <Link href="/stats">
                  <a className="text-base text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                    Stats
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/api/trace">
                  <a className="text-base text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                    Trace
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/fun">
                  <a className="text-base text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                    Fun
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-2 py-8 no-underline md:flex md:items-center md:justify-between">
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

export default Footer
