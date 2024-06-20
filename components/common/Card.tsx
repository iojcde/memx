import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export const Card: FC<{
    children: ReactNode
    className?: string
    shadow?: boolean
    dark?: boolean
}> = ({ children, className, shadow = false, dark = false }) => {
    return (
        <div
            className={classNames(
                `overflow-hidden rounded-2xl border`,
                dark
                    ? `border-neutral-800 bg-neutral-900`
                    : `border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900`,
                shadow &&
                    `shadow-lg ${
                        dark
                            ? `shadow-neutral-900`
                            : `shadow-neutral-100 dark:shadow-neutral-900`
                    }`,
                className,
            )}
        >
            {children}
        </div>
    )
}
