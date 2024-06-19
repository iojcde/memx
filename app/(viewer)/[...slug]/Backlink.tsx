import Markdown from 'components/Markdown'
import Link from 'next/link'
import React from 'react'

const processBacklinkItem = (text: string, title: string) => {
    return (
        <div className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap rounded bg-[#f5f2f2] p-3 py-4 text-sm transition dark:bg-neutral-900">
            <Markdown
                content={text.replaceAll(`[[`, `**`).replaceAll(`]]`, `**`)}
            />
        </div>
    )
}

const Backlink: React.FC<{
    backlinks: { title: string; url: string; text: string }[]
}> = ({ backlinks }) => {
    return (
        <div className="mt-8  ">
            <h2 className="pb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Links to this note
            </h2>
            {backlinks.length > 0 ? (
                <div className="grid gap-2 xl:grid-cols-2">
                    {backlinks.map((backlink, i) => (
                        <div key={i} className="rounded-md border p-4 ">
                            <Link
                                href={`/${backlink?.url}`}
                                className="font-semibold"
                            >
                                {backlink.title}
                            </Link>

                            {processBacklinkItem(backlink.text, backlink.title)}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm">Nothing here yet...</p>
            )}
        </div>
    )
}
export default Backlink
