'use client'
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { FullSlug, SimpleSlug, simplifySlug } from 'lib/path'
import backlinks from 'assets/backlinks.json'
import filemap from 'assets/filemap.json'

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
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 40,
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
    const graphContainerRef = useRef(null)

    useEffect(() => {
        const graphContainer = graphContainerRef.current

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
            const slug = simplifySlug(fullSlug)
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
            } = config

            const links: { source: string; target: string }[] = []
            // const tags: SimpleSlug[] = []
            const nodes: SimpleSlug[] = [slug]

            const [source, details] = [slug, backlinks[slug]]
            if (!details) return

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
                        : filemap[url].split(`/`).pop().replace(`.md`, ``) ??
                          url

                    return {
                        id: url,
                        text: text,
                    }
                }),
                links,
            }

            console.log(graphData)

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

            context.scale(dpi, dpi)

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
                    d3.forceLink(graphData.links).id((d) => d.id),
                )
                .force(`charge`, d3.forceManyBody())
                .force(`center`, d3.forceCenter(width / 2, height / 2))
                .on(`tick`, ticked)

            const zoom = d3.zoom().scaleExtent([0.25, 4]).on(`zoom`, zoomed)
            canvas.call(zoom).on(`click`, click)

            let transform = d3.zoomIdentity

            function nodeRadius(d: NodeData) {
                const numLinks = links.filter(
                    (l: any) => l.source.id === d.id || l.target.id === d.id,
                ).length

                return (2 + numLinks * 2) / transform.k
            }

            function ticked() {
                context.clearRect(0, 0, width * dpi, height * dpi)
                context.save()
                context.translate(transform.x, transform.y)
                context.scale(transform.k, transform.k)

                graphData.links.forEach(drawLink)
                graphData.nodes.forEach(drawNode)

                context.restore()
            }

            function drawLink(d) {
                context.beginPath()
                context.moveTo(d.source.x, d.source.y)
                context.lineTo(d.target.x, d.target.y)
                context.strokeStyle = `pink`
                context.lineWidth = 1 / transform.k
                context.stroke()
            }

            function drawNode(d) {
                context.beginPath()
                context.arc(d.x, d.y, nodeRadius(d), 0, 2 * Math.PI, true)
                context.fillStyle = color(d)
                context.fill()

                context.font = `${fontSize / transform.k}em sans-serif`
                context.textAlign = `center`
                context.textBaseline = `middle`
                context.fillText(d.text, d.x, d.y - 15 / transform.k)
            }

            function zoomed(event) {
                transform = event.transform
                ticked()
            }

            function click(event) {
                const [x, y] = d3.pointer(event)
                const node = simulation.find(
                    x / transform.k - transform.x / transform.k,
                    y / transform.k - transform.y / transform.k,
                    5,
                )
                if (node) {
                    const targ = resolveRelative(fullSlug, node.id)
                    //navigate
                }
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
                    x / transform.k - transform.x / transform.k,
                    y / transform.k - transform.y / transform.k,
                    5,
                )

                if (node) {
                    canvas.node().style.cursor = `pointer`
                    const currentId = node.id

                    const linkNodes = links.filter(
                        (d) =>
                            d.source.id === currentId ||
                            d.target.id === currentId,
                    )
                    const connectedNodes = linkNodes.flatMap((d) => [
                        d.source.id,
                        d.target.id,
                    ])

                    context.clearRect(0, 0, width, height)
                    context.save()
                    context.translate(transform.x, transform.y)
                    context.scale(transform.k, transform.k)

                    links.forEach((d) => {
                        context.beginPath()
                        context.moveTo(d.source.x, d.source.y)
                        context.lineTo(d.target.x, d.target.y)
                        context.strokeStyle =
                            connectedNodes.includes(d.source.id) &&
                            connectedNodes.includes(d.target.id)
                                ? `gray`
                                : `lightgray`
                        context.lineWidth =
                            connectedNodes.includes(d.source.id) &&
                            connectedNodes.includes(d.target.id)
                                ? 1 / transform.k
                                : 0.5 / transform.k
                        context.stroke()
                    })

                    graphData.nodes.forEach((d) => {
                        context.beginPath()
                        context.arc(
                            d.x,
                            d.y,
                            nodeRadius(d),
                            0,
                            2 * Math.PI,
                            true,
                        )
                        context.fillStyle = color(d)
                        context.fill()

                        context.font = `${fontSize / transform.k}em sans-serif`
                        context.textAlign = `center`
                        context.textBaseline = `middle`
                        context.fillText(d.text, d.x, d.y - 15 / transform.k)
                    })

                    context.restore()
                } else {
                    canvas.node().style.cursor = `default`
                }
            })

            canvas.on(`mouseout`, function (event) {
                context.clearRect(0, 0, width, height)
                context.save()
                context.translate(transform.x, transform.y)
                context.scale(transform.k, transform.k)

                graphData.links.forEach(drawLink)
                graphData.nodes.forEach(drawNode)

                context.restore()
            })
        }
        renderGraph(graphContainer, fullSlug)

        return () => {
            // Cleanup if needed
        }
    }, [fullSlug])

    return (
        <div id="graph-outer">
            <div ref={graphContainerRef} id="graph-container" />
        </div>
    )
}

const Graph = ({ displayClass, cfg, opts }) => {
    const slug = decodeURIComponent(usePathname() ?? `/`)

    const [showLocal, setShowLocal] = useState(true)
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }

    return (
        <div className={classNames(displayClass, `graph`)}>
            <h3>Graph View</h3>
            <button onClick={() => setShowLocal(!showLocal)}>
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
