'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Menu = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                className={`fixed inset-0 z-40 bg-black transition-opacity  ${
                    open
                        ? `pointer-events-auto opacity-20`
                        : ` pointer-events-none opacity-0`
                }`}
                aria-hidden="true"
                onClick={() => {
                    setOpen(!open)
                }}
            />
            <div
                id="menu"
                className={`fixed bottom-0 right-0 top-0 z-40 w-full bg-white px-4 dark:bg-[#141517] sm:max-w-[50vh] lg:max-w-[30vw] lg:px-8 ${
                    open ? `active` : ``
                }`}
            >
                <div
                    className="nav-row flex w-1/2 flex-col  gap-8 py-16 text-4xl"
                    data-cursor="-opaque"
                >
                    <Link href="/">Home</Link>

                    <Link href="/about">About</Link>

                    <Link href="/blog">Blog</Link>

                    <Link href="/fun">Fun</Link>
                </div>
                <div className="absolute bottom-4 left-0 right-0 mx-auto flex w-full items-center justify-between px-4 py-8 no-underline lg:px-8 ">
                    <span className="font-mono">Socials &rarr;</span>
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
                </div>
            </div>
            <button
                onClick={() => {
                    setOpen(!open)
                }}
                className="group fixed right-[24px] top-[34px] z-[251] flex items-center justify-end pl-[4.5rem] outline-none sm:right-[24px] sm:top-[40px] lg:right-[54px] lg:top-[54px]"
                id="burger-container"
                data-cursor="-menu"
                data-cursor-stick="#burger"
            >
                <div id="burger" className="relative w-[25px] space-y-[4px]">
                    <span />
                    <span />
                </div>
            </button>
        </>
    )
}
export default Menu
