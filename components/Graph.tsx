'use client'
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { FullSlug, SimpleSlug, simplifySlug } from 'lib/path'
import backlinks from 'assets/backlinks.json'
import filemap from 'assets/filemap.json'
import { useTheme } from 'next-themes'

type NodeData = {
    id: SimpleSlug
    text: string
} & d3.SimulationNodeDatum

type LinkData = {
    source: SimpleSlug
    target: SimpleSlug
}

export interface D3Config {
    drag: boolean
    zoom: boolean
    depth: number
    scale: number
    repelForce: number
    centerForce: number
    linkDistance: number
    fontSize: number
    opacityScale: number
    removeTags: string[]
    showTags: boolean
    focusOnHover?: boolean
}

interface GraphOptions {
    localGraph: Partial<D3Config> | undefined
    globalGraph: Partial<D3Config> | undefined
}

const defaultOptions: GraphOptions = {
    localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.1,
        repelForce: 0.6,
        centerForce: 0.3,
        linkDistance: 50,
        fontSize: 0.7,
        opacityScale: 1,
        showTags: true,
        removeTags: [],
        focusOnHover: false,
    },
    globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        showTags: true,
        removeTags: [],
        focusOnHover: true,
    },
}

const GraphComponent = ({
    fullSlug,
    config,
}: {
    fullSlug: string
    config: Partial<D3Config>
}) => {
    const graphContainerRef = useRef<HTMLDivElement>(null)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        const graphContainer = graphContainerRef.current
        if (
            graphContainer?.children.length &&
            graphContainer?.children.length > 0
        ) {
            return
        }

        const localStorageKey = `graph-visited`

        function getVisited() {
            return new Set(
                JSON.parse(localStorage.getItem(localStorageKey) ?? `[]`),
            )
        }

        function addToVisited(slug) {
            const visited = getVisited()
            visited.add(slug)
            localStorage.setItem(localStorageKey, JSON.stringify([...visited]))
        }

        function renderGraph(container, fullSlug) {
            let slug = simplifySlug(fullSlug)

            if (slug == `/`) {
                slug = `index` as SimpleSlug
            }
            const visited = getVisited()
            const graph = container
            if (!graph) return

            const {
                drag: enableDrag,
                zoom: enableZoom,
                depth,
                scale,
                repelForce,
                centerForce,
                linkDistance,
                fontSize,
                opacityScale,
                removeTags,
                showTags,
                focusOnHover,
            } = { ...config, ...defaultOptions } as D3Config

            const links: { source: string; target: string }[] = []
            // const tags: SimpleSlug[] = []
            const nodes: SimpleSlug[] = [slug]

            Object.keys(backlinks).forEach((l) => {
                const n = backlinks[l]
                if (n.links && n.links.includes(slug)) {
                    nodes.push(l as SimpleSlug)
                    links.push({ source: l, target: slug })
                }
            })

            const source = slug
            let details = backlinks[slug]

            if (!details)
                details = {
                    links: [],
                    tags: [],
                }

            const outgoing = details.links ?? []

            for (const dest of outgoing) {
                links.push({ source: source, target: dest })
                nodes.push(dest)
            }

            const localTags = (details.tags ?? [])
                ?.filter((tag) => !removeTags?.includes(tag))
                .map((tag) => simplifySlug(`tags/${tag}` as FullSlug))

            for (const tag of localTags) {
                links.push({ source: source, target: tag })
                if (!nodes.includes(tag)) nodes.push(tag)
            }

            nodes.forEach((node) => {
                const nd = backlinks[node]

                if (nd) {
                    const outgoing = nd.links ?? []
                    for (const dest of outgoing) {
                        if (
                            nodes.includes(dest) &&
                            links.filter(
                                (l) => l.source === node && l.target === dest,
                            ).length === 0 &&
                            links.filter(
                                (l) => l.source === dest && l.target === node,
                            ).length === 0
                        ) {
                            links.push({ source: node, target: dest })
                        }

                        const localTags = (nd.tags ?? [])
                            ?.filter((tag) => !removeTags?.includes(tag))
                            .map((tag) =>
                                simplifySlug(`tags/${tag}` as FullSlug),
                            )
                        for (const tag of localTags) {
                            if (
                                nodes.includes(tag) &&
                                links.filter(
                                    (l) =>
                                        l.source === node && l.target === tag,
                                ).length === 0
                            ) {
                                links.push({ source: node, target: tag })
                            }
                        }
                    }
                }
            })

            const graphData: {
                nodes: NodeData[]
                links: { source: string; target: string }[]
            } = {
                nodes: nodes.map((url) => {
                    const text = url.startsWith(`tags/`)
                        ? `#${url.substring(5)}`
                        : filemap[url]?.split(`/`).pop().replace(`.md`, ``) ??
                          url

                    return {
                        id: url,
                        text: text,
                    }
                }),
                links,
            }

            const height = Math.max(graph.offsetHeight, 250)
            const width = graph.offsetWidth

            const dpi = devicePixelRatio
            const canvas = d3
                .select(graph)
                .append(`canvas`)
                .attr(`width`, dpi * width)
                .attr(`height`, dpi * height)
                .attr(
                    `style`,
                    `width: ${width}px; max-width: 100%; height: auto;`,
                )

            const context = canvas.node()?.getContext(`2d`)
            if (!context) return

            context!.scale(dpi, dpi)

            const color = (d) => {
                const isCurrent = d.id === slug
                if (isCurrent) {
                    return `red`
                } else if (visited.has(d.id)) {
                    return `blue`
                } else {
                    return `gray`
                }
            }

            const simulation = d3
                .forceSimulation(graphData.nodes)
                .force(
                    `link`,
                    d3
                        .forceLink(graphData.links)
                        .id((d: any) => d.id)
                        .distance(linkDistance),
                )
                .force(`charge`, d3.forceManyBody().strength(-100 * repelForce))
                .force(
                    `center`,
                    d3.forceCenter(width / 2, height / 2).strength(centerForce),
                )
                .on(`tick`, ticked)

            const zoom = d3.zoom().scaleExtent([0.25, 4]).on(`zoom`, zoomed)

            let transform = d3.zoomIdentity

            function nodeRadius(d: NodeData) {
                const numLinks = links.filter(
                    (l: any) => l.source.id === d.id || l.target.id === d.id,
                ).length

                return (4 + Math.sqrt(numLinks)) / Math.sqrt(transform.k)
            }

            function ticked() {
                context!.clearRect(0, 0, width * dpi, height * dpi)
                context!.save()
                context!.translate(transform.x, transform.y)
                context!.scale(transform.k, transform.k)

                graphData.links.forEach(drawLink)
                graphData.nodes.forEach(drawNode)

                context!.restore()
                // console.log(graphData.nodes[0])
            }

            function drawLink(d) {
                context!.beginPath()
                context!.moveTo(d.source.x, d.source.y)
                context!.lineTo(d.target.x, d.target.y)
                context!.strokeStyle = `pink`
                context!.lineWidth = 1 / Math.sqrt(transform.k)
                context!.stroke()
            }
            function drawNode(d) {
                context!.moveTo(d.x + 5, d.y)
                context!.beginPath()
                context!.arc(d.x, d.y, nodeRadius(d), 0, 2 * Math.PI, true)
                context!.fillStyle = color(d)
                context!.fill()

                const opacity = Math.min(1, Math.max(0, (transform.k - 1) * 2))
                context!.fillStyle =
                    resolvedTheme == `dark`
                        ? `rgba(255, 255, 255, ${opacity})`
                        : `rgba(0, 0, 0, ${opacity})`
                context!.font = `${fontSize / transform.k}em sans-serif`
                context!.textAlign = `center`
                context!.textBaseline = `middle`
                context!.fillText(
                    d.text,
                    d.x,
                    d.y - 15 / Math.sqrt(transform.k),
                )
            }
            function zoomed(event) {
                transform = event.transform
                ticked()
            }

            function click(event) {
                // const [x, y] = d3.pointer(event)
                // const node = simulation.find(
                //     transform.invertX(x),
                //     transform.invertY(y),
                //     5,
                // )
                // if (node) {
                //     const targ = resolveRelative(fullSlug, node.id)
                // }
                // graphData.nodes.forEach((d: any) => {
                //     d.fx = 0
                //     d.fy = 0
                // })
            }

            function resolveRelative(base, relative) {
                const stack = base.split(`/`)
                const parts = relative.split(`/`)
                stack.pop()

                for (let i = 0; i < parts.length; i++) {
                    if (parts[i] === `.`) continue
                    if (parts[i] === `..`) stack.pop()
                    else stack.push(parts[i])
                }
                return stack.join(`/`)
            }

            // Mouseover and mouseout events for highlighting
            canvas.on(`mousemove`, function (event) {
                const [x, y] = d3.pointer(event)
                const node = simulation.find(
                    transform.invertX(x),
                    transform.invertY(y),
                    5,
                )

                if (node) {
                    canvas.node()!.style.cursor = `pointer`
                    const currentId = node.id

                    const linkNodes = links.filter(
                        (d: any) =>
                            d.source.id === currentId ||
                            d.target.id === currentId,
                    )
                    const connectedNodes = linkNodes.flatMap((d: any) => [
                        d.source.id,
                        d.target.id,
                    ])

                    context!.clearRect(0, 0, width, height)
                    context!.save()
                    context!.translate(transform.x, transform.y)
                    context!.scale(transform.k, transform.k)

                    links.forEach((d: any) => {
                        context!.beginPath()
                        context!.moveTo(d.source.x, d.source.y)
                        context!.lineTo(d.target.x, d.target.y)
                        context!.strokeStyle =
                            connectedNodes.includes(d.source.id) &&
                            connectedNodes.includes(d.target.id)
                                ? `gray`
                                : `lightgray`
                        context!.lineWidth =
                            connectedNodes.includes(d.source.id) &&
                            connectedNodes.includes(d.target.id)
                                ? 1 / transform.k
                                : 0.5 / transform.k
                        context!.stroke()
                    })

                    graphData.nodes.forEach((d: any) => {
                        drawNode(d)
                    })

                    context!.restore()
                } else {
                    canvas.node()!.style.cursor = `default`
                }
            })

            canvas.on(`mouseout`, function (event) {
                context!.clearRect(0, 0, width, height)
                context!.save()
                context!.translate(transform.x, transform.y)
                context!.scale(transform.k, transform.k)

                graphData.links.forEach(drawLink)
                graphData.nodes.forEach((d: any) => drawNode(d))

                context!.restore()
            })

            const drag = () => {
                return d3
                    .drag()
                    .subject((e) => {
                        const [x, y] = d3.pointer(e)
                        const node = simulation.find(
                            transform.invertX(x),
                            transform.invertY(y),
                            5,
                        )

                        return node
                    })
                    .on(`start`, dragstarted)
                    .on(`drag`, dragged)
                    .on(`end`, dragended)
            }

            let initialDragPos = { x: 0, y: 0 }
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart()
                const subject = event.subject
                if (!subject.x || !subject.y) {
                    return
                }
                initialDragPos = { x: subject.x, y: subject.y }
                subject.fx = subject.x
                subject.fy = subject.y
            }

            function dragged(event) {
                event.subject.fx =
                    initialDragPos.x +
                    (event.x - initialDragPos.x) / transform.k
                event.subject.fy =
                    initialDragPos.y +
                    (event.y - initialDragPos.y) / transform.k
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0)
                event.subject.fx = null
                event.subject.fy = null
            }

            canvas.call(
                drag().on(`start.render drag.render end.render`, ticked),
            )

            canvas.call(zoom).on(`click`, click)
        }
        renderGraph(graphContainer, fullSlug)
        console.log(`rendered graph`)

        return () => {
            // Cleanup if needed
        }
    }, [fullSlug])

    return (
        <>
            <div ref={graphContainerRef} id="graph-container" />
        </>
    )
}

const Graph = () => {
    const path = usePathname()
    const slug = decodeURIComponent(path ?? `/`)

    const [showLocal, setShowLocal] = useState(true)
    const localGraph = { ...defaultOptions.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph }

    return (
        <div className={`graph`}>
            <h3>Interactive Graph</h3>
            <button
                className="font-neutral-800 text-xs"
                onClick={() => setShowLocal(!showLocal)}
            >
                {showLocal ? `Show Global Graph` : `Show Local Graph`}
            </button>
            <div className="graph-outer">
                {showLocal ? (
                    <GraphComponent fullSlug={slug} config={localGraph} />
                ) : (
                    <GraphComponent fullSlug={slug} config={globalGraph} />
                )}
            </div>
        </div>
    )
}

export default Graph
