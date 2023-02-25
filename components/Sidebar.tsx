'use client'
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { TreeNode } from 'types/treenode'
import { Label } from 'components/common/Label'
import { Icon } from 'components/common/Icon'

const NavLink: FC<{
  title: string
  label?: string
  url: string
  level: number
  activePath: string
  collapsible: boolean
  collapsed: boolean
  toggleCollapsed: () => void
}> = ({
  title,
  label,
  url,
  level,
  activePath,
  collapsible,
  collapsed,
  toggleCollapsed,
}) => {
  return (
    <div
      className={classNames(
        `group flex h-8 items-center justify-between space-x-2 whitespace-nowrap rounded-md px-3 text-sm leading-none`,
        url == activePath
          ? `${
              level == 0 ? `font-medium` : `font-normal`
            } bg-blue-50 text-blue-900 dark:bg-blue-500/20 dark:text-blue-50`
          : `hover:bg-neutral-50 dark:hover:bg-neutral-900 ${
              level == 0
                ? `font-medium text-neutral-600 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200`
                : `font-normal hover:text-neutral-600 dark:hover:text-neutral-300`
            }`,
      )}
    >
      <Link href={url} className="flex h-full grow items-center space-x-2">
        <span>{title}</span>
        {label && <Label text={label} />}
      </Link>
      {collapsible && (
        <button
          aria-label="Toggle children"
          onClick={toggleCollapsed}
          className="mr-2 shrink-0 px-2 py-1"
        >
          <span
            className={`block w-2.5 ${collapsed ? `-rotate-90 transform` : ``}`}
          >
            <Icon name="chevron-down" />
          </span>
        </button>
      )}
    </div>
  )
}

const Node: FC<{ node: TreeNode; level: number; activePath: string }> = ({
  node,
  level,
  activePath,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(node.collapsed ?? false)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  useEffect(() => {
    if (
      activePath == node.urlPath ||
      node.children.map((_) => _.urlPath).includes(activePath)
    ) {
      setCollapsed(false)
    }
  }, [activePath, node.children, node.urlPath])

  return (
    <>
      <NavLink
        title={node.nav_title || node.title}
        label={node.label || undefined}
        url={node.urlPath}
        level={level}
        activePath={activePath}
        collapsible={node.collapsible ?? false}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      {node.children.length > 0 && !collapsed && (
        <Tree tree={node.children} level={level + 1} activePath={activePath} />
      )}
    </>
  )
}

const Tree: FC<{ tree: TreeNode[]; level: number; activePath: string }> = ({
  tree,
  level,
  activePath,
}) => {
  return (
    <div
      className={classNames(
        `ml-3 space-y-2 pl-3`,
        level > 0 ? `border-l border-neutral-200 dark:border-neutral-800` : ``,
      )}
    >
      {tree.map((treeNode, index) => (
        <Node
          key={index}
          node={treeNode}
          level={level}
          activePath={activePath}
        />
      ))}
    </div>
  )
}

export const Sidebar: FC<{ tree: TreeNode[] }> = ({ tree }) => {
  return (
    <aside className="-ml-6 w-80">
      <div>
        <Tree tree={tree} level={0} activePath={usePathname() || ``} />
      </div>
    </aside>
  )
}
