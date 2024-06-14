'use client'

import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { DirectoryNode, TreeNode } from 'types/TreeNode'
import { Label } from 'components/common/Label'
import { Icon } from 'components/common/Icon'

const NavLink: FC<{
    title: string
    label?: string
    url?: string
    level: number
    activePath: string
    collapsed: boolean
    toggleCollapsed: () => void
}> = ({ title, label, url, level, activePath, collapsed, toggleCollapsed }) => {
    const K: FC<{ href?: string; [key: string]: any }> = ({
        href,
        ...props
    }) => {
        if (href) {
            return <Link href={href} {...props}></Link>
        } else {
            return <div {...props} />
        }
    }

    return (
        <div
            className={classNames(
                `group flex items-center justify-between space-x-1 whitespace-nowrap rounded-md text-sm leading-none`,
                url && `ml-2`,
            )}
        >
            {` `}
            {!url && (
                <button
                    aria-label="Toggle children"
                    onClick={toggleCollapsed}
                    className="shrink-0 px-1 py-1"
                >
                    <span
                        className={`block w-2.5 dark:fill-neutral-400 ${
                            collapsed ? `-rotate-90 transform` : ``
                        }`}
                    >
                        <Icon name="chevron-down" />
                    </span>
                </button>
            )}
            <K href={url} className="flex h-full grow items-center space-x-2">
                <span className={`capitalize ${!url && `font-semibold`}`}>
                    {title.replace(`.md`, ``)}
                </span>
            </K>
        </div>
    )
}

const Node: FC<{
    node: TreeNode
    level: number
    activePath: string
    path: string
}> = ({ node, level, activePath, path }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const toggleCollapsed = () => setCollapsed(!collapsed)

    useEffect(() => {
        if (
            activePath === path ||
            (node.type === `dir` &&
                node.children.some((child) =>
                    activePath.startsWith(`${path}/${child.name}`),
                ))
        ) {
            setCollapsed(false)
        }
    }, [activePath, node, path])

    return (
        <>
            <NavLink
                title={node.name}
                url={
                    node.type === `file`
                        ? path.replaceAll(` `, `-`).replace(`.md`, ``)
                        : undefined
                }
                level={level}
                activePath={activePath}
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
            />
            {node.type === `dir` && node.children.length > 0 && !collapsed && (
                <Tree
                    tree={node.children}
                    level={level + 1}
                    activePath={activePath}
                    parentPath={path}
                />
            )}
        </>
    )
}

const Tree: FC<{
    tree: TreeNode[]
    level: number
    activePath: string
    parentPath: string
}> = ({ tree, level, activePath, parentPath }) => {
    return (
        <div
            className={classNames(
                `ml-2 space-y-4 pl-2`,
                level > 0
                    ? `border-l border-neutral-200 dark:border-neutral-800`
                    : ``,
            )}
        >
            {tree.map((treeNode, index) => {
                const path = `${parentPath}/${treeNode.name}`
                return (
                    <Node
                        key={index}
                        node={treeNode}
                        level={level}
                        activePath={activePath}
                        path={path}
                    />
                )
            })}
        </div>
    )
}

export const Sidebar: FC<{ tree: DirectoryNode }> = ({ tree }) => {
    return (
        <aside className="flex h-full max-h-full flex-col gap-6 lg:p-8 lg:pr-10 lg:pt-24 ">
            <Link href="/" className="text-xl font-bold lg:text-2xl">
                🪴 jcde.xyz
            </Link>

            <div>
                <button className="inline-flex w-full items-center justify-between rounded-md bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700">
                    Search{` `}
                    <span className="block w-3  ">
                        <Icon name="search" />
                    </span>
                </button>
            </div>

            <div>
                <h3 className="text-sm font-bold text-neutral-700">Explorer</h3>
                <div className="-ml-4 mt-2 overflow-y-auto  ">
                    <Tree
                        tree={tree.children}
                        level={0}
                        activePath={usePathname() || ``}
                        parentPath=""
                    />
                </div>
            </div>
        </aside>
    )
}
