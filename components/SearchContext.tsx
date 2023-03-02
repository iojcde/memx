'use client'

import styled from 'styled-components'

import { FC, ReactNode, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { TreeNode } from 'types/TreeNode'
import { buildTree } from 'utils/buildTree'
import { allResearch } from 'contentlayer/generated'

import React from 'react'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar'
import { Card } from './common/Card'
import { Icon } from './common/Icon'
import { Label } from './common/Label'

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const researchTree = buildTree()
  const actions = useMemo(() => {
    const actions = [
      {
        id: `0-homepage`,
        name: `Homepage`,
        keywords: `Home Start Index Overview`,
        section: `Home`,
        perform: () => router.push(`/`),
      },
      {
        id: `0-portfolio`,
        name: `Portfolio`,
        keywords: `About Jeeho Ahn Portfolio`,
        section: `Portfolio`,
        perform: () => router.push(`/`),
      },
      {
        id: `3-github`,
        name: `GitHub Repository`,
        keywords: `Github Git Repository Repo Code`,
        section: `External`,
        perform: () => window.open(`https://github.com/iojcde/memx`, `_ blank`),
      },
      {
        id: `3-twitter`,
        name: `Twitter`,
        keywords: `Twitter Account Tweets Tweet News`,
        section: `External`,
        perform: () => window.open(`https://twitter.com/iojcde`, `_ blank`),
      },
    ]
    let id = 1

    const mapDocs = (tree: TreeNode[], parent: string) => {
      for (const element of tree) {
        actions.push({
          id: (`4-bldocsog-` + id).toString(),
          name: element.label
            ? `${element.title} (${element.label})`
            : element.title,
          keywords: `research post blog memex` + (element?.excerpt || ``),
          section: `Research`,
          perform: () => router.push(element.urlPath),
        })
        id++
        if (element.children.length)
          mapDocs(element.children, parent + ` / ` + element.title)
      }
    }
    mapDocs(researchTree, `Research`)

    return actions
  }, [researchTree, router])

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-10 bg-neutral-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="relative z-50 w-full max-w-xl">
            <Card className="relative z-50 border border-neutral-300 p-2">
              <div className="mb-2 flex items-center space-x-4 border-b p-2">
                <span className="block w-5 dark:fill-neutral-200">
                  <Icon name="search" />
                </span>
                <KBarSearch className="h-8 w-full bg-transparent text-neutral-600 placeholder-neutral-400 focus:outline-none dark:text-neutral-200 dark:placeholder-neutral-500" />
                <Label text="ESC" />
              </div>
              <RenderResults />
            </Card>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

const RenderResults = () => {
  const { results } = useMatches()

  if (results.length) {
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div>
            {typeof item === `string` ? (
              <div className="pt-3">
                <div className="block px-2 pb-2 text-xs text-neutral-400 dark:text-neutral-500">
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`block cursor-pointer rounded-lg px-4 py-2 transition duration-75 ${
                  active
                    ? `bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white`
                    : `bg-transparent text-neutral-500 dark:text-neutral-500 `
                }`}
              >
                {item.subtitle && (
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    {item.subtitle}
                  </div>
                )}
                <div>{item.name}</div>
              </div>
            )}
          </div>
        )}
      />
    )
  } else {
    return (
      <div className="block border-t border-neutral-100 px-4 py-8 text-center text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
        No results for your search...
      </div>
    )
  }
}
