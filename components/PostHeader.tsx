'use client'

import { Fragment, useEffect, useState } from 'react'
import { Icon } from './common/Icon'
import { Sidebar } from './Sidebar'

const PostHeader = ({ title, tree }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [top, setTop] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY <= 30)
    handleScroll()
    window.addEventListener(`scroll`, handleScroll)
    return () => {
      window.removeEventListener(`scroll`, handleScroll)
    }
  }, [])

  return (
    <>
      <header className="relative w-full">
        <div className="mx-auto mb-4 w-full max-w-3xl space-y-2 lg:max-w-full lg:px-16">
          <ul className="-mx-1 flex flex-wrap items-center text-sm"></ul>
          <h1 className="sr-only text-2xl font-semibold capitalize text-neutral-800 dark:text-neutral-200 md:text-3xl lg:not-sr-only lg:text-5xl">
            {title}
          </h1>
          <div className="lg:hidden">
            <button
              aria-label="Show docs navigation"
              onClick={() => setOpen(true)}
              className="flex space-x-2 text-left text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:space-x-3 md:text-3xl lg:text-4xl"
            >
              <span className="mt-1.5 inline-block w-4 flex-shrink-0 dark:fill-neutral-100 md:w-5">
                <Icon name="chevron-down" />
              </span>
              <span className="inline-block flex-shrink">{title}</span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 h-screen bg-neutral-900/20 pb-20 backdrop-blur-lg backdrop-filter ">
          <div className="absolute left-0 h-full divide-y divide-neutral-200 overflow-y-scroll border-l border-neutral-200 bg-white p-4 dark:divide-gray-800 dark:border-gray-800 dark:bg-black">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Documentation
              </h2>
              <button
                type="button"
                aria-label="Close docs navigation"
                onClick={() => setOpen(!open)}
                className="flex h-8 w-8 items-center justify-end text-neutral-600 dark:text-neutral-300"
              >
                <span className="inline-block w-4 dark:fill-neutral-100">
                  <Icon name="close" />
                </span>
              </button>
            </div>
            <div className="pt-4">
              <Sidebar tree={tree} />
            </div>
          </div>
        </div>
      )}
      <div
        className={`fixed top-16 z-10 hidden h-16 w-full border-b border-neutral-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter transition-opacity duration-200 dark:bg-black lg:block ${
          top ? `opacity-0` : `opacity-100`
        }`}
      >
        <span className="flex h-full items-center gap-2 px-16 text-sm capitalize">
          research{` `}
          <span className="inline-block w-1.5 fill-neutral-400 dark:fill-neutral-500">
            <Icon name="chevron-right" />
          </span>
          {` `}
          {title}
        </span>
      </div>
    </>
  )
}

export default PostHeader
