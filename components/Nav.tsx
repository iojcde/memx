import Toggle from './Toggle'
import Link from 'next/link'
import Magnetic from 'lib/magnetic'
import { useEffect } from 'react'
const Nav: React.FC = () => {
  // useEffect(() => {
  //   const el = document.getElementById(`burger`)

  //   new Magnetic(el, { x: 0.08, y: 0.08, s: 0.2, rs: 0.7 })
  // })
  return (
    <>
      <a
        href="#content"
        className="text-md absolute -top-8 ml-3 -translate-y-12 transform rounded-md border border-gray-300  px-3 py-1 transition-transform duration-100 focus:translate-y-12 lg:ml-8"
      >
        Skip to content
      </a>
      <nav className=" my-0 flex w-full items-center justify-center py-4 px-4 transition duration-100 lg:px-14">
        <div className="flex w-full  items-center justify-between">
          <div
            id="name"
            className="relative text-xl text-black dark:text-gray-100 sm:text-2xl lg:text-4xl"
            data-cursor="-opaque"
          >
            <Link href="/">Jeeho Ahn</Link>
          </div>
          <div className="text-primary flex items-center justify-evenly space-x-3 dark:text-gray-100 lg:space-x-4">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            <span>
              <Link href="/blog">Blog</Link>
            </span>
            <Toggle />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
