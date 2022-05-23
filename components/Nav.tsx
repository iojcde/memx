import Toggle from './Toggle'
import Link from 'next/link'
const Nav: React.FC = () => {
  return (
    <>
      <a
        href="#content"
        className="text-md absolute -top-8 z-50 ml-3 -translate-y-12 transform rounded-md border border-gray-300 bg-white px-3 py-1 transition-transform duration-100 focus:translate-y-12 dark:bg-black lg:ml-8"
      >
        Skip to content
      </a>
      <nav className="relative z-30 my-0 flex w-full items-center justify-center px-4 py-4 transition duration-100">
        <div className="flex w-full max-w-5xl items-center justify-between">
          <div className="text-xl font-semibold text-black dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
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
