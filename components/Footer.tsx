import React from 'react'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => (
  <footer
    className="bg-primary border-t border-primary py-6 mt-12 transition duration-100"
    aria-labelledby="footerHeading"
  >
    <h2 id="footerHeading" className="sr-only">
      Footer
    </h2>
    <div className="mt-2  px-4 sm:px-6 lg:px-8 ">
      <div className="grid grid-cols-2 gap-8 xl:col-span-2">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
              Pages
            </h3>
            <ul className="mt-4 space-y-4 ">
              <li>
                <Link href="/" passHref>
                  <a className="text-base text-footer-link hover:text-footer-link-hover">
                    Home
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/about" passHref>
                  <a className="text-base text-footer-link hover:text-footer-link-hover">
                    About
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/blog">
                  <a className="text-base text-footer-link hover:text-footer-link-hover">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">
              Extra
            </h3>
            <ul className="mt-4 space-y-4 ">
              <li>
                <Link href="/stats">
                  <a className="text-base text-footer-link hover:text-footer-link-hover">
                    Stats
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-2 py-8 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2">
          <a
            href="https://twitter.com/IoJcde"
            className="text-footer-icon hover:text-footer-icon-hover"
          >
            <FaTwitter className="h-5 w-5" />
          </a>

          <a
            href="https://github.com/jcdea"
            className="text-footer-icon hover:text-footer-icon-hover"
          >
            <span className="sr-only">GitHub</span>
            <FaGithub className="h-5 w-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/jcdea/"
            className="text-footer-icon hover:text-footer-icon-hover"
          >
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-8 text-base text-footer-icon md:mt-0 md:order-1">
          &copy; {new Date().getFullYear()} Jeeho Ahn. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
