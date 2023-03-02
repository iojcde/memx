import Toggle from 'components/Toggle'
import Link from 'next/link'
import { IconName } from 'components/common/Icon'
import NavLinks from './NavLinks'

const links: Array<{ label: string; url: string }> = [
  { label: `Home`, url: `/` },
  { label: `Portfolio ↗`, url: `https://jcde.xyz` },
]

const iconLinks: Array<{ label: string; icon: IconName; url: string }> = [
  {
    label: `Github`,
    icon: `github`,
    url: `https://github.com/contentlayerdev/contentlayer`,
  },
  { label: `Discord`, icon: `discord`, url: `https://discord.gg/rytFErsARm` },
]

const Nav: React.FC = () => {
  // const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-20 my-0 flex  h-16 w-full items-center justify-center border-b bg-white  py-4 px-6 transition duration-200 dark:border-neutral-800 dark:bg-black lg:px-16">
      <a
        href="#content"
        className="text-md absolute -top-8 ml-3 -translate-y-12 transform rounded-md border border-neutral-300  px-3 py-1 transition-transform duration-100 focus:translate-y-10 lg:ml-8"
      >
        Skip to content
      </a>
      <div className="flex w-full  items-center justify-between">
        <div
          id="name"
          className="relative text-xl text-black dark:text-neutral-100"
          data-cursor="-opaque"
        >
          <Link href="/" className="font-semibold">
            memx
          </Link>
        </div>
        <div className="text-primary flex items-center justify-evenly dark:text-neutral-100 ">
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
          <NavLinks links={links} />
        </div>
      </div>
    </nav>
  )
}

export default Nav
