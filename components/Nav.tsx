import Toggle from './Toggle'
import Link from 'next/link'
import { useViewportScroll, motion, useTransform } from 'framer-motion'

const Nav: React.FC = () => {
  const { scrollY } = useViewportScroll()

  const opacity = useTransform(scrollY, [70, 100], [0, 1])

  const backwardsopacity = useTransform(scrollY, [70, 100], [1, 0])

  return (
    <>
      <a
        href="#content"
        className="text-md absolute -top-8 z-50 ml-3 -translate-y-12 transform rounded-md border border-gray-300 bg-white px-3 py-1 transition-transform duration-100 focus:translate-y-12 dark:bg-black lg:ml-8"
      >
        Skip to content
      </a>
      <motion.nav
        style={{ opacity: backwardsopacity }}
        className="relative z-30 my-0 flex w-full items-center justify-center px-4 py-4 transition duration-100"
      >
        <div className="flex w-full max-w-5xl items-center justify-between">
          <div className="text-2xl font-semibold text-black dark:text-gray-100 md:text-3xl lg:text-4xl">
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
      </motion.nav>
      <motion.nav
        style={{ opacity: opacity }}
        className="fixed top-0 z-20 my-0 flex w-full items-center justify-center px-4 py-4 transition duration-100"
      >
        <div className="flex w-full max-w-5xl items-center justify-between">
          <div className="text-primary font-semibold text-black dark:text-gray-100">
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
      </motion.nav>
    </>
  )
}

export default Nav
