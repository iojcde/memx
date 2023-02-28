'use client'

import styled from 'styled-components'

import { FC, ReactNode, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { TreeNode } from 'types/TreeNode'
import { buildResearchTree } from 'utils/buildTree'
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
  const researchTree = buildResearchTree(allResearch)
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
          keywords: element?.excerpt || ``,
          section: `Documentation`,
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
        <KBarPositioner className="bg-neutral-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <Card>
              <div className="flex items-center space-x-4 p-4">
                <span className="block w-5">
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
                <div className="block border-t border-neutral-100 px-4 pt-6 pb-2 text-xs font-semibold uppercase text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`block cursor-pointer px-4 py-2 text-neutral-600 dark:text-neutral-300 ${
                  active
                    ? `bg-neutral-100 dark:bg-neutral-800`
                    : `bg-transparent`
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
