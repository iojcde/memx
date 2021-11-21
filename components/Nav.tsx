import Toggle from './Toggle'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <>
      <a
        href="#content"
        className="z-50 absolute -translate-y-12 focus:translate-y-3 ml-5 py-2 px-4 outline-none transition shadow-lg border rounded-md border-gray-200 dark:border-gray-500"
      >
        Skip to content
      </a>
      <nav className="sticky top-0 z-30 flex justify-center items-center w-full px-4 py-4 my-0 mb-8 backdrop-filter backdrop-blur-lg bg-opacity-0 firefox:bg-opacity-90 dark:bg-[#111827] dark:firefox:bg-opacity-[85] bg-white border-b border-primary transition duration-100">
        <div className="flex justify-between items-center max-w-2xl w-full">
          <div className="text-primary font-semibold dark:text-gray-100 text-black">
            <Link href="/">Jeeho Ahn</Link>
          </div>
          <div className="flex items-center space-x-4 justify-evenly text-primary dark:text-gray-100 text-black">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Toggle />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
