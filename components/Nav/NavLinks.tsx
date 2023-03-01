'use client'
import { IconName, Icon } from 'components/common/Icon'
import { Label } from 'components/common/Label'
import { useKBar } from 'kbar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { isExternalUrl } from 'utils/helpers'

const NavLink: React.FC<{
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

const NavLinks = ({ links }) => {
  const [open, setOpen] = useState(false)

  const SearchButton: React.FC<{ showShortcut?: boolean }> = ({
    showShortcut = true,
  }) => {
    const { query } = useKBar()
    return (
      <button
        aria-label="Search"
        onClick={() => {
          query.toggle()
          setOpen(!open)
        }}
        className="flex h-8 cursor-text items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-sm transition duration-200 hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
      >
        <span className="mr-2 block w-3">
          <Icon name="search" />
        </span>
        <span className="mr-8 text-neutral-400 dark:text-neutral-500">
          Search...
        </span>
        {showShortcut && <Label text="⌘K" />}
      </button>
    )
  }
  return (
    <>
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
                  <SearchButton showShortcut={false} />
                </div>
                {links.map(({ label, url }, index) => (
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
      <nav className="hidden items-center divide-x divide-neutral-200 dark:divide-neutral-800 lg:flex">
        <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
          {links.map(({ label, url }, index) => (
            <NavLink
              key={index}
              label={label}
              url={url}
              icon={isExternalUrl(url) ? `external-link` : undefined}
            />
          ))}
          <div className="px-3">
            <SearchButton />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavLinks