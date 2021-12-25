import Toggle from './Toggle'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <>
      <a
        href="#content"
        className="absolute z-50 px-3 py-1 transition-transform duration-200 transform -translate-y-12 focus:translate-y-12 ml-8 -top-8 text-md rounded-md border border-gray-300"
      >
        Skip to content
      </a>
      <nav className="sticky top-0 z-30 flex justify-center items-center w-full px-4 py-4 my-0 mb-8 backdrop-filter backdrop-blur bg-opacity-70 firefox:bg-opacity-90 firefox:bg-white dark:firefox:bg-black dark:bg-opacity-20 dark:firefox:bg-opacity-[85]   transition duration-100">
        <div className="flex justify-between items-center max-w-5xl w-full">
          <div className="text-primary font-semibold dark:text-gray-100 text-black">
            <Link href="/">Jeeho Ahn</Link>
          </div>
          <div className="flex items-center justify-evenly space-x-3 lg:space-x-4 text-primary dark:text-gray-100">
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
