"use client"
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { FullSlug, simplifySlug } from 'lib/path';
import backlinks from 'assets/backlinks.json'

export interface D3Config {
    drag: boolean;
    zoom: boolean;
    depth: number;
    scale: number;
    repelForce: number;
    centerForce: number;
    linkDistance: number;
    fontSize: number;
    opacityScale: number;
    removeTags: string[];
    showTags: boolean;
    focusOnHover?: boolean;
}

interface GraphOptions {
    localGraph: Partial<D3Config> | undefined;
    globalGraph: Partial<D3Config> | undefined;
}

const defaultOptions: GraphOptions = {
    localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.1,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
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
};



const GraphComponent = ({ fullSlug, config }: { fullSlug: string; config: Partial<D3Config> }) => {

    const graphContainerRef = useRef(null);

    useEffect(() => {
        const graphContainer = graphContainerRef.current;

        const localStorageKey = "graph-visited";

        function getVisited() {
            return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? "[]"));
        }

        function addToVisited(slug) {
            const visited = getVisited();
            visited.add(slug);
            localStorage.setItem(localStorageKey, JSON.stringify([...visited]));
        }


        async function renderGraph(container, fullSlug) {
            const slug = simplifySlug(fullSlug);
            const visited = getVisited();
            const graph = container;
            if (!graph) return;

            let {
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
            } = config;

            const data = new Map(
                Object.entries(backlinks).map(([k, v]) => [
                    simplifySlug(k as FullSlug),
                    v,
                ]),
            );
            const links: { source: string; target: string }[] = [];
            const tags = [];

            const validLinks = new Set(data.keys());
            for (const [source, details] of data.entries()) {
                const outgoing = links ?? [];

                for (const dest of outgoing) {
                    if (validLinks.has(dest)) {
                        links.push({ source: source, target: dest });
                    }
                }

                if (showTags) {
                    const localTags = details.tags
                        .filter((tag) => !removeTags?.includes(tag))
                        .map((tag) => simplifySlug(`tags/${tag}`));

                    tags.push(...localTags.filter((tag) => !tags.includes(tag)));

                    for (const tag of localTags) {
                        links.push({ source: source, target: tag });
                    }
                }
            }

            const neighbourhood = new Set();
            const wl = [slug, "__SENTINEL"];
            if (depth >= 0) {
                while (depth >= 0 && wl.length > 0) {
                    const cur = wl.shift();
                    if (cur === "__SENTINEL") {
                        depth--;
                        wl.push("__SENTINEL");
                    } else {
                        neighbourhood.add(cur);
                        const outgoing = links.filter((l) => l.source === cur);
                        const incoming = links.filter((l) => l.target === cur);
                        wl.push(...outgoing.map((l) => l.target), ...incoming.map((l) => l.source));
                    }
                }
            } else {
                validLinks.forEach((id) => neighbourhood.add(id));
                if (showTags) tags.forEach((tag) => neighbourhood.add(tag));
            }

            const graphData = {
                nodes: [...neighbourhood].map((url) => {
                    const text = url.startsWith("tags/") ? `#${url.substring(5)}` : data.get(url)?.title ?? url;
                    return {
                        id: url,
                        text: text,
                        tags: data.get(url)?.tags ?? [],
                    };
                }),
                links: links.filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target)),
            };

            const width = graph.offsetWidth;
            const height = Math.max(graph.offsetHeight, 250);
            const canvas = d3
                .select(graph)
                .append("canvas")
                .attr("width", width)
                .attr("height", height)
                .node();

            const context = canvas.getContext('2d');

            const simulation = d3
                .forceSimulation(graphData.nodes)
                .force("charge", d3.forceManyBody().strength(-100 * repelForce))
                .force(
                    "link",
                    d3.forceLink(graphData.links).id((d) => d.id).distance(linkDistance),
                )
                .force("center", d3.forceCenter(width / 2, height / 2));

            const color = (d) => {
                const isCurrent = d.id === slug;
                if (isCurrent) {
                    return "var(--secondary)";
                } else if (visited.has(d.id) || d.id.startsWith("tags/")) {
                    return "var(--tertiary)";
                } else {
                    return "var(--gray)";
                }
            };

            function draw() {
                context.clearRect(0, 0, width, height);

                context.beginPath();
                graphData.links.forEach((d) => {
                    context.moveTo(d.source.x, d.source.y);
                    context.lineTo(d.target.x, d.target.y);
                });
                context.strokeStyle = 'var(--lightgray)';
                context.stroke();

                graphData.nodes.forEach((d) => {
                    context.beginPath();
                    context.arc(d.x, d.y, nodeRadius(d), 0, 2 * Math.PI, true);
                    context.fillStyle = color(d);
                    context.fill();
                });
            }

            function nodeRadius(d) {
                const numLinks = links.filter((l) => l.source.id === d.id || l.target.id === d.id).length;
                return 2 + Math.sqrt(numLinks);
            }

            simulation.on("tick", draw);

            if (enableZoom) {
                d3.select(canvas)
                    .call(
                        d3.zoom()
                            .scaleExtent([0.25, 4])
                            .on('zoom', (event) => {
                                context.save();
                                context.clearRect(0, 0, width, height);
                                context.translate(event.transform.x, event.transform.y);
                                context.scale(event.transform.k, event.transform.k);
                                draw();
                                context.restore();
                            })
                    );
            }
        }

        renderGraph(graphContainer, fullSlug);

        return () => {
            // Cleanup if needed
        };
    }, [fullSlug]);

    return (
        <div id="graph-outer">
            <div ref={graphContainerRef} id="graph-container" />
        </div>
    );
};

const Graph = ({ displayClass, cfg, opts }) => {
    const slug = usePathname() ?? '/'

    const [showLocal, setShowLocal] = useState(true);
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph };
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph };

    return (
        <div className={classNames(displayClass, "graph")}>
            <h3>Graph View</h3>
            <button onClick={() => setShowLocal(!showLocal)}>
                {showLocal ? "Show Global Graph" : "Show Local Graph"}
            </button>
            <div className="graph-outer">
                {showLocal ? (
                    <GraphComponent fullSlug={slug} config={localGraph} />
                ) : (
                    <GraphComponent fullSlug={slug} config={globalGraph} />
                )}
            </div>
        </div>
    );
};

export default Graph;
