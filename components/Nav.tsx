import Toggle from './Toggle'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <>
      <a
        href="#content"
        className="z-50 absolute -translate-y-24 focus:translate-y-3 text-sm ml-5 py-2 px-4 outline-none transition shadow-lg border rounded-md border-gray-200 dark:border-gray-500"
      >
        Skip to content
      </a>
      <nav className="sticky top-0 z-30 flex justify-center items-center w-full px-4 py-4 my-0 mb-8 backdrop-filter backdrop-blur bg-opacity-70 firefox:bg-opacity-90 dark:bg-black dark:firefox:bg-opacity-[85] bg-white   transition duration-100">
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
