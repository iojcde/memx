import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Author: FC<{ name: string; handle: string; avatar: string }> = ({
    name,
    handle,
    avatar,
}) => {
    return (
        <div className="flex space-x-4">
            <div className="flex-shrink-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                        src={avatar}
                        alt={name}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={avatar}
                    />
                </div>
            </div>
            <div className="not-prose leading-tight">
                <p className="mb-0 font-semibold text-neutral-700 dark:text-neutral-300">
                    {name}
                </p>
                <Link
                    href={`https://twitter.com/` + handle}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-neutral-500 dark:text-neutral-400"
                    legacyBehavior
                >
                    {`@` + handle}
                </Link>
            </div>
        </div>
    )
}
