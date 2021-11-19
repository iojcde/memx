import Toggle from './Toggle'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
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
  )
}

export default Nav
