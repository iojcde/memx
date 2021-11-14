import Toggle from './toggle'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <nav className="sticky top-0 z-30 flex justify-center items-center w-full px-4 py-4 my-0 mb-8 backdrop-filter backdrop-blur-lg bg-opacity-10 firefox:bg-opacity-90 border-b border-primary">
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
