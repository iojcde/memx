'use client'

import { Icon } from 'components/common/Icon'
import { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { DirectoryNode } from 'types/TreeNode'

const TopContext = ({
    title,
    tree,
    context,
}: {
    title: string
    tree: any
    context: string[]
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [top, setTop] = useState<boolean>(true)

    useEffect(() => {
        const handleScroll = () => setTop(window.scrollY <= 80)
        handleScroll()
        window.addEventListener(`scroll`, handleScroll)
        return () => {
            window.removeEventListener(`scroll`, handleScroll)
        }
    }, [])

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 h-dvh bg-neutral-900/20 pb-20 backdrop-blur-lg backdrop-filter">
                    <div className="absolute left-0 h-full divide-y divide-neutral-200 border-r  bg-[#faf8f8]  p-4 ">
                        <div className="flex items-center justify-between pb-2">
                            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                                Navigation
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
                className={`sticky top-0 z-10 flex h-10 transition duration-200  w-full items-center gap-2  rounded-b-xl  border-x  border-b  bg-[#faf8f8] bg-opacity-90 pl-4 pr-6 dark:bg-black  lg:px-8 ${top
                    ? `border-transparent`
                    : ` border-border  backdrop-blur  shadow-sm`
                    }`}
            >
                <button
                    type="button"
                    aria-label="Open docs navigation"
                    onClick={() => setOpen(!open)}
                    className="flex h-8 w-8 items-center justify-center text-neutral-600 dark:text-neutral-300 lg:hidden"
                >
                    <span className="inline-block w-4 fill-neutral-600 dark:fill-neutral-100">
                        <Icon name="bars" />
                    </span>
                </button>
                <span className="flex h-full items-center gap-2 text-xs capitalize">
                    {[`Home`, ...context].flatMap((i, index) => [
                        <span key={index}>{i}</span>,
                        <span
                            key={index + `icon`}
                            className="inline-block w-1.5 fill-neutral-400  dark:fill-neutral-500"
                        >
                            <Icon name="chevron-right" />
                        </span>,
                    ])}

                    <span className={`font-semibold transition `}>{title}</span>
                </span>
            </div>
        </>
    )
}
export default TopContext
