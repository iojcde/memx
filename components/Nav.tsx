import Toggle from './Toggle'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <nav className="fixed top-0 my-0 flex h-16 w-full items-center justify-center border-b bg-white py-4 px-6 shadow transition duration-100 lg:px-16">
      <a
        href="#content"
        className="text-md absolute -top-8 ml-3 -translate-y-12 transform rounded-md border border-gray-300  px-3 py-1 transition-transform duration-100 focus:translate-y-12 lg:ml-8"
      >
        Skip to content
      </a>
      <div className="flex w-full  items-center justify-between">
        <div
          id="name"
          className="relative text-xl text-black dark:text-gray-100"
          data-cursor="-opaque"
        >
          <Link href="/">memx</Link>
        </div>
        <div className="text-primary flex items-center justify-evenly space-x-3 pr-12 dark:text-gray-100 lg:space-x-4">
          {/* <span>
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            <span>
              <Link href="/blog">Blog</Link>
            </span> */}
          <Toggle />
        </div>
      </div>
    </nav>
  )
}

export default Nav
