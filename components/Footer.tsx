import { useEffect } from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer
            id="footer"
            className="dark relative z-0 mx-auto h-screen overflow-hidden border-t bg-black transition "
            aria-labelledby="footerHeading"
            data-cursor="-inverse"
        >
            <div id="footer-content" className="h-screen ">
                {` `}
                <h2 id="footerHeading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 py-32 dark:text-white sm:px-8 xl:px-16">
                    <h2 className="text-6xl sm:text-8xl lg:text-9xl">
                        Get in touch
                    </h2>
                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <div className="text-3xl">
                                <a href="mailto:io@fosshost.org">
                                    {` `}
                                    &rarr; io@jcde.xyz
                                </a>
                            </div>
                            <h4 className="mb-1 mt-2 text-4xl">Discord</h4>
                            io#8106
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-0 right-0 mx-auto w-full max-w-7xl px-6 py-8 no-underline sm:px-16 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <a
                            href="https://twitter.com/IoJcde"
                            className="text-neutral-600 dark:text-neutral-400"
                        >
                            <FaTwitter size="24" />
                        </a>

                        <a
                            href="https://github.com/jcdea"
                            className="text-neutral-600 dark:text-neutral-400"
                        >
                            <span className="sr-only">GitHub</span>
                            <FaGithub size="24" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/jcdea/"
                            className="text-neutral-600 dark:text-neutral-400"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <FaLinkedin size="24" />
                        </a>
                    </div>
                    <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-400 md:order-1 md:mt-0">
                        &copy; {new Date().getFullYear()} Jeeho Ahn. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
