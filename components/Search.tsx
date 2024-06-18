import React, { useState, useEffect, useRef } from 'react'
import FlexSearch from 'flexsearch'
import { ContentDetails } from '../../plugins/emitters/contentIndex'
import { registerEscapeHandler, removeAllChildren } from './util'
import {
    FullSlug,
    normalizeRelativeURLs,
    resolveRelative,
} from '../../util/path'
import { QuartzComponent, QuartzComponentProps } from './types'
import style from './styles/search.scss'
import { classNames } from '../util/lang'
import { i18n } from '../i18n'

interface Item {
    id: number
    slug: FullSlug
    title: string
    content: string
    tags: string[]
}

type SearchType = 'basic' | 'tags'
let searchType: SearchType = `basic`
let currentSearchTerm = ``
const encoder = (str: string) =>
    str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)

const index = new FlexSearch.Document<Item>({
    charset: `latin:extra`,
    encode: encoder,
    document: {
        id: `id`,
        tag: `tags`,
        index: [
            {
                field: `title`,
                tokenize: `forward`,
            },
            {
                field: `content`,
                tokenize: `forward`,
            },
            {
                field: `tags`,
                tokenize: `forward`,
            },
        ],
    },
})

const p = new DOMParser()
const fetchContentCache: Map<FullSlug, Element[]> = new Map()
const contextWindowWords = 30
const numSearchResults = 8
const numTagResults = 5

const tokenizeTerm = (term: string) => {
    const tokens = term.split(/\s+/).filter((t) => t.trim() !== ``)
    const tokenLen = tokens.length
    if (tokenLen > 1) {
        for (let i = 1; i < tokenLen; i++) {
            tokens.push(tokens.slice(0, i + 1).join(` `))
        }
    }
    return tokens.sort((a, b) => b.length - a.length) // always highlight longest terms first
}

const highlight = (searchTerm: string, text: string, trim?: boolean) => {
    const tokenizedTerms = tokenizeTerm(searchTerm)
    let tokenizedText = text.split(/\s+/).filter((t) => t !== ``)

    let startIndex = 0
    let endIndex = tokenizedText.length - 1
    if (trim) {
        const includesCheck = (tok: string) =>
            tokenizedTerms.some((term) =>
                tok.toLowerCase().startsWith(term.toLowerCase()),
            )
        const occurrencesIndices = tokenizedText.map(includesCheck)

        let bestSum = 0
        let bestIndex = 0
        for (
            let i = 0;
            i < Math.max(tokenizedText.length - contextWindowWords, 0);
            i++
        ) {
            const window = occurrencesIndices.slice(i, i + contextWindowWords)
            const windowSum = window.reduce(
                (total, cur) => total + (cur ? 1 : 0),
                0,
            )
            if (windowSum >= bestSum) {
                bestSum = windowSum
                bestIndex = i
            }
        }

        startIndex = Math.max(bestIndex - contextWindowWords, 0)
        endIndex = Math.min(
            startIndex + 2 * contextWindowWords,
            tokenizedText.length - 1,
        )
        tokenizedText = tokenizedText.slice(startIndex, endIndex)
    }

    const slice = tokenizedText
        .map((tok) => {
            for (const searchTok of tokenizedTerms) {
                if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
                    const regex = new RegExp(searchTok.toLowerCase(), `gi`)
                    return tok.replace(
                        regex,
                        `<span class="highlight">$&</span>`,
                    )
                }
            }
            return tok
        })
        .join(` `)

    return `${startIndex === 0 ? `` : `...`}${slice}${
        endIndex === tokenizedText.length - 1 ? `` : `...`
    }`
}

const highlightHTML = (searchTerm: string, el: HTMLElement) => {
    const p = new DOMParser()
    const tokenizedTerms = tokenizeTerm(searchTerm)
    const html = p.parseFromString(el.innerHTML, `text/html`)

    const createHighlightSpan = (text: string) => {
        const span = document.createElement(`span`)
        span.className = `highlight`
        span.textContent = text
        return span
    }

    const highlightTextNodes = (node: Node, term: string) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const nodeText = node.nodeValue ?? ``
            const regex = new RegExp(term.toLowerCase(), `gi`)
            const matches = nodeText.match(regex)
            if (!matches || matches.length === 0) return
            const spanContainer = document.createElement(`span`)
            let lastIndex = 0
            for (const match of matches) {
                const matchIndex = nodeText.indexOf(match, lastIndex)
                spanContainer.appendChild(
                    document.createTextNode(
                        nodeText.slice(lastIndex, matchIndex),
                    ),
                )
                spanContainer.appendChild(createHighlightSpan(match))
                lastIndex = matchIndex + match.length
            }
            spanContainer.appendChild(
                document.createTextNode(nodeText.slice(lastIndex)),
            )
            node.parentNode?.replaceChild(spanContainer, node)
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if ((node as HTMLElement).classList.contains(`highlight`)) return
            Array.from(node.childNodes).forEach((child) =>
                highlightTextNodes(child, term),
            )
        }
    }

    for (const term of tokenizedTerms) {
        highlightTextNodes(html.body, term)
    }

    return html.body
}

const SearchComponent = ({ displayClass, cfg }) => {
    const [searchTerm, setSearchTerm] = useState(``)
    const [results, setResults] = useState<Item[]>([])
    const searchContainerRef = useRef(null)
    const searchBarRef = useRef(null)
    const searchLayoutRef = useRef(null)
    const previewRef = useRef(null)

    useEffect(() => {
        const handleNav = async (e) => {
            const currentSlug = e.detail.url
            const data = await fetchData()
            const idDataMap = Object.keys(data) as FullSlug[]

            const appendLayout = (el) => {
                if (!searchLayoutRef.current?.querySelector(`#${el.id}`)) {
                    searchLayoutRef.current?.appendChild(el)
                }
            }

            const enablePreview =
                searchLayoutRef.current?.dataset?.preview === `true`
            const resultsContainer = document.createElement(`div`)
            resultsContainer.id = `results-container`
            appendLayout(resultsContainer)

            let preview
            if (enablePreview) {
                preview = document.createElement(`div`)
                preview.id = `preview-container`
                appendLayout(preview)
            }

            function hideSearch() {
                searchContainerRef.current?.classList.remove(`active`)
                if (searchBarRef.current) {
                    searchBarRef.current.value = `` // clear the input when we dismiss the search
                }
                removeAllChildren(resultsContainer)
                if (preview) {
                    removeAllChildren(preview)
                }
                searchLayoutRef.current?.classList.remove(`display-results`)
                searchType = `basic` // reset search type after closing
            }

            function showSearch(newSearchType: SearchType) {
                searchType = newSearchType
                searchContainerRef.current?.classList.add(`active`)
                searchBarRef.current?.focus()
            }

            let currentHover = null

            const shortcutHandler = async (e) => {
                if (e.key === `k` && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
                    e.preventDefault()
                    const searchBarOpen =
                        searchContainerRef.current?.classList.contains(`active`)
                    searchBarOpen ? hideSearch() : showSearch(`basic`)
                } else if (
                    e.shiftKey &&
                    (e.ctrlKey || e.metaKey) &&
                    e.key.toLowerCase() === `k`
                ) {
                    e.preventDefault()
                    const searchBarOpen =
                        searchContainerRef.current?.classList.contains(`active`)
                    searchBarOpen ? hideSearch() : showSearch(`tags`)
                    if (searchBarRef.current) searchBarRef.current.value = `#`
                }

                if (currentHover) {
                    currentHover.classList.remove(`focus`)
                }

                if (!searchContainerRef.current?.classList.contains(`active`))
                    return
                if (e.key === `Enter`) {
                    if (resultsContainer.contains(document.activeElement)) {
                        const active = document.activeElement as HTMLElement
                        if (active.classList.contains(`no-match`)) return
                        await displayPreview(active)
                        active.click()
                    } else {
                        const firstResult = document.getElementsByClassName(
                            `result-card`,
                        )[0] as HTMLElement
                        if (
                            !firstResult ||
                            firstResult.classList.contains(`no-match`)
                        )
                            return
                        await displayPreview(firstResult)
                        firstResult.click()
                    }
                } else if (
                    e.key === `ArrowUp` ||
                    (e.shiftKey && e.key === `Tab`)
                ) {
                    e.preventDefault()
                    if (resultsContainer.contains(document.activeElement)) {
                        const currentResult =
                            currentHover ||
                            (document.activeElement as HTMLElement)
                        const prevResult =
                            currentResult?.previousElementSibling as HTMLElement
                        currentResult?.classList.remove(`focus`)
                        prevResult?.focus()
                        currentHover = prevResult
                        await displayPreview(prevResult)
                    } else {
                        const lastResult =
                            resultsContainer.lastElementChild as HTMLElement
                        lastResult?.focus()
                        currentHover = lastResult
                        await displayPreview(lastResult)
                    }
                } else if (e.key === `ArrowDown` || e.key === `Tab`) {
                    e.preventDefault()
                    if (resultsContainer.contains(document.activeElement)) {
                        const currentResult =
                            currentHover ||
                            (document.activeElement as HTMLElement)
                        const nextResult =
                            currentResult?.nextElementSibling as HTMLElement
                        currentResult?.classList.remove(`focus`)
                        nextResult?.focus()
                        currentHover = nextResult
                        await displayPreview(nextResult)
                    } else {
                        const firstResult = document.getElementsByClassName(
                            `result-card`,
                        )[0] as HTMLElement
                        firstResult?.focus()
                        currentHover = firstResult
                        await displayPreview(firstResult)
                    }
                } else if (e.key === `Escape`) {
                    hideSearch()
                }
            }

            function displayPreview(el: HTMLElement) {
                if (!el || el.dataset.type === `tag`) return

                const { slug } = el.dataset

                const display = (content) => {
                    if (!preview) return
                    preview.dataset.slug = slug
                    const html = highlightHTML(searchTerm, content)
                    removeAllChildren(preview)
                    preview.appendChild(html)
                }

                const cached = fetchContentCache.get(slug as FullSlug)
                if (cached) return display(cached)

                return fetch(slug)
                    .then((res) => res.text())
                    .then((resText) => {
                        const html = p.parseFromString(resText, `text/html`)
                        const mainContent = html.querySelector(
                            `#content-container`,
                        ) as HTMLElement
                        if (!mainContent) return
                        const nodes = Array.from(
                            mainContent.children,
                        ) as Element[]
                        fetchContentCache.set(slug as FullSlug, nodes)
                        display(nodes)
                    })
            }

            registerEscapeHandler(hideSearch)

            async function fetchData() {
                const result = await fetch(`/content-index.json`)
                const data: ContentDetails = await result.json()
                return data
            }

            const handleInputChange = async (e) => {
                const term = e.target.value
                currentSearchTerm = term
                setSearchTerm(term)

                if (!term) {
                    removeAllChildren(resultsContainer)
                    setResults([])
                    return
                }

                const results = await index.search({
                    term,
                    index: searchType === `tags` ? `tags` : `content`,
                })

                if (results.length === 0) {
                    const noMatch = document.createElement(`div`)
                    noMatch.className = `result-card no-match`
                    noMatch.textContent = i18n(`No matches found`)
                    removeAllChildren(resultsContainer)
                    resultsContainer.appendChild(noMatch)
                    setResults([])
                    return
                }

                const resultElements = results.map((res) => {
                    const resultCard = document.createElement(`div`)
                    resultCard.className = `result-card`
                    resultCard.tabIndex = 0
                    resultCard.dataset.slug = res.slug
                    resultCard.dataset.type = `content`

                    const title = document.createElement(`div`)
                    title.className = `result-title`
                    title.innerHTML = highlight(searchTerm, res.title)
                    resultCard.appendChild(title)

                    const snippet = document.createElement(`div`)
                    snippet.className = `result-snippet`
                    snippet.innerHTML = highlight(searchTerm, res.content, true)
                    resultCard.appendChild(snippet)

                    resultCard.addEventListener(`click`, async () => {
                        window.location.href = res.slug
                    })

                    return resultCard
                })

                removeAllChildren(resultsContainer)
                resultElements.forEach((el) => resultsContainer.appendChild(el))
                setResults(results)
            }

            searchBarRef.current?.addEventListener(`input`, handleInputChange)
            document.addEventListener(`keydown`, shortcutHandler)

            return () => {
                document.removeEventListener(`keydown`, shortcutHandler)
            }
        }

        window.addEventListener(`nav`, handleNav)

        return () => {
            window.removeEventListener(`nav`, handleNav)
        }
    }, [])

    return (
        <div
            className={classNames(`search-container`, displayClass)}
            ref={searchContainerRef}
        >
            <div className="search-bar">
                <input
                    type="text"
                    ref={searchBarRef}
                    placeholder={i18n(`Search`)}
                />
            </div>
            <div className="search-layout" ref={searchLayoutRef}>
                <div id="results-container" />
                <div id="preview-container" ref={previewRef} />
            </div>
        </div>
    )
}

export default SearchComponent
