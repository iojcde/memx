'use client'
import { useState } from 'react'
import Toggle from './Toggle'
import Link from 'next/link'
import { Icon, IconName } from './common/Icon'
import { usePathname } from 'next/navigation'
import { isExternalUrl } from 'utils/helpers'

const navLinks: Array<{ label: string; url: string }> = [
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

const NavLink: FC<{
  label?: string
  hideLabel?: boolean
  icon?: IconName
  url: string
}> = ({ label, hideLabel = false, icon, url }) => {
  const active = usePathname()?.split(`/`)[1] == url.replace(`/`, ``)

  return (
    <Link
      href={url}
      className={`group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none ${
        active
          ? `bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50`
          : `text-neutral-600 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-200`
      }`}
      target={isExternalUrl(url) ? `_blank` : undefined}
      rel={isExternalUrl(url) ? `noreferrer` : undefined}
    >
      {icon && (
        <span className="block w-5 text-neutral-400 group-hover:text-neutral-500 dark:text-neutral-500 dark:group-hover:text-neutral-400">
          <Icon name={icon} />
        </span>
      )}
      {label && <span className={hideLabel ? `sr-only` : ``}>{label}</span>}
    </Link>
  )
}

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 my-0 flex h-16 w-full items-center justify-center border-b bg-white  py-4 px-6 shadow transition duration-100 dark:border-neutral-800 dark:bg-black lg:px-16">
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
          <Link href="/">memx</Link>
        </div>
        <div className="text-primary flex items-center justify-evenly space-x-3 dark:text-neutral-100 lg:space-x-4">
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
          <div className="lg:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="flex h-8 w-8 items-center justify-end fill-neutral-600 dark:fill-neutral-300"
            >
              <span className="inline-block w-4">
                <Icon name={open ? `close` : `bars`} />
              </span>
            </button>
            {open && (
              <div className="fixed inset-0 top-[65px] z-50 h-screen bg-neutral-900/10 pb-20  backdrop-filter dark:bg-neutral-900/50">
                <nav className="absolute right-0 h-full divide-y divide-neutral-200 border-l border-neutral-200 bg-white p-8 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-black">
                  <div className="flex flex-col items-end space-y-2 pb-8">
                    <div className="mb-2">
                      {/* <SearchButton showShortcut={false} /> */}
                    </div>
                    {navLinks.map(({ label, url }, index) => (
                      <NavLink
                        key={index}
                        label={label}
                        url={url}
                        icon={isExternalUrl(url) ? `external-link` : undefined}
                      />
                    ))}
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
