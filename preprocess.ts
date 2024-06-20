import glob from 'tiny-glob'
import path from 'path'
import fs from 'fs'
import type { DirectoryNode, TreeNode } from 'types/TreeNode'
import { read } from 'to-vfile'
import { title } from 'process'

const root_folder = `data`

const addOldRedirection = (oldSlug: string, newSlug: string) => {
    const data = JSON.parse(fs.readFileSync(`./assets/redirects.json`, `utf-8`))

    data[oldSlug] = newSlug

    fs.writeFileSync(
        `./assets/redirects.json`,
        JSON.stringify(data, null, 2),
        `utf-8`,
    )

    console.log(
        `slug change detected: added redirection from ${oldSlug} to ${newSlug}`,
    )
}

const getMetadata = (filePath: string, lines = 3) => {
    const content = fs.readFileSync(filePath, `utf-8`)
    const frontmatter = content.match(/---([\s\S]*?)---/)
    const currentSlug = frontmatter?.[1].match(/slug: (.*)/)?.[1]

    const newSlug = filePath
        .split(`/`)
        .pop()
        ?.replace(`.md`, ``)
        .replaceAll(` `, `-`) as string

    if (currentSlug && currentSlug !== newSlug) {
        addOldRedirection(currentSlug, newSlug)

        if (content.includes(`---`)) {
            const newContent = content.replace(
                `slug: ${currentSlug}`,
                `slug: ${newSlug}`,
            )
            fs.writeFileSync(filePath, newContent, `utf-8`)
        } else {
            const newContent = `---\nslug: ${newSlug}\n---\n${content}`
            fs.writeFileSync(filePath, newContent, `utf-8`)
        }
    } else if (!currentSlug) {
        console.log(`no slug detected: adding slug ${newSlug} for ${filePath}`)

        if (content.includes(`---`)) {
            const newContent = content.replace(`---`, `---\nslug: ${newSlug}`)
            fs.writeFileSync(filePath, newContent, `utf-8`)
        } else {
            const newContent = `---\nslug: ${newSlug}\n---\n${content}`
            fs.writeFileSync(filePath, newContent, `utf-8`)
        }
    }

    return {
        title: filePath.split(`/`).pop()?.replace(`.md`, ``) as string,
        slug: newSlug,
        // ignore frontmatter from excerpt for number lines
    }
}

const buildTree = async (): Promise<DirectoryNode> => {
    let files = await glob(root_folder + `/**/*.md`)

    process.platform === `win32` &&
        (files = files.map((file) => file.replace(/\\/g, `/`)))

    const tree: DirectoryNode = {
        type: `dir`,
        name: `data`,
        slug: ``,
        children: [],
    }

    files.forEach((file) => {
        // Remove the root folder part from the file path
        const relativePath = path.relative(root_folder, file)
        const parts = relativePath.split(path.sep) // Split the relative path into parts
        let current: DirectoryNode = tree // Start at the root of the tree

        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                // Last part is a file
                const meta = getMetadata(file)

                current.children.push({
                    type: `file`,
                    name: part,
                    slug: meta.slug,
                })
            } else {
                // Directory part
                let nextDir = current.children.find(
                    (child) => child.type === `dir` && child.name === part,
                ) as DirectoryNode
                if (!nextDir) {
                    nextDir = {
                        type: `dir`,
                        name: part,
                        slug: part.replaceAll(` `, `-`),
                        children: [],
                    }
                    current.children.push(nextDir)
                }
                current = nextDir // Move deeper into the tree
            }
        })
    })

    return tree
}

const mapFiles = (tree) => {
    const traverse = (node: TreeNode, parentSlug = ``, parentName = ``) => {
        if (node.type === `file`) {
            node.slug = parentSlug
            node.name = parentName
            return node
        } else {
            return node.children.flatMap((child) =>
                traverse(
                    child,
                    parentSlug ? `${parentSlug}/${child.slug}` : child.slug,
                    parentName ? `${parentName}/${child.name}` : child.name,
                ),
            )
        }
    }

    const allFiles = traverse(tree)
    //make into slug:title map
    const fileMap = allFiles.reduce((acc, file) => {
        acc[file.slug] = file.name
        return acc
    }, {})

    fs.writeFileSync(
        `./assets/filemap.json`,
        JSON.stringify(fileMap, null, 2),
        `utf-8`,
    )
    console.log(`File map saved to ./assets/filemap.json`)

    return fileMap
}

const mapBacklinks = async () => {
    const filemap = JSON.parse(
        fs.readFileSync(`./assets/filemap.json`, `utf-8`),
    )
    const backlinks = {}

    for (const slug of Object.keys(filemap)) {
        const content = fs.readFileSync(`./data/${filemap[slug]}`, `utf-8`)

        const links = String(content).match(/\[\[(.*?)\]\]/g) || []

        links.forEach((link) => {
            const mentioned = link.match(/\[\[(.*?)(?:\|.*)?\]\]/)[1].trim()

            // search in values of filemap, including relative files
            const [mentionedSlug, _] =
                Object.entries(filemap).find(
                    ([key, value]: [string, string]) =>
                        value === `${mentioned}.md` ||
                        (value.split(`/`).slice(0, -1).join(`/`) ==
                            filemap[slug].split(`/`).slice(0, -1).join(`/`) &&
                            value.split(`/`).pop()?.replace(`.md`, ``) ===
                                mentioned.split(`/`).pop()) ||
                        value.split(`/`).pop()?.replace(`.md`, ``) ===
                            mentioned.split(`/`).pop(),
                ) ?? []

            if (
                mentionedSlug &&
                !backlinks[mentionedSlug]?.links?.includes(slug)
            ) {
                backlinks[mentionedSlug] = {
                    ...backlinks[mentionedSlug],
                    links: [
                        ...((backlinks[mentionedSlug] &&
                            backlinks[mentionedSlug].links) ??
                            []),
                        slug,
                    ],
                }
                // return
            } else if (!mentionedSlug) {
                if (mentioned.startsWith(`#`) || mentioned.endsWith(`/`)) return
                console.log(
                    `warning: found broken backlink [[${mentioned}]] in ${filemap[slug]}`,
                )
            }
        })

        // Remove content within single backticks
        const contentWithoutSingleBackticks = content.replace(/`[^`]*`/g, ``)

        // Remove content within triple backticks
        const contentWithoutCodeBlocks = contentWithoutSingleBackticks.replace(
            /```[^```]*```/g,
            ``,
        )

        // Match tags
        const tags =
            contentWithoutCodeBlocks
                .match(/(?:^|\s)(?:#)([a-zA-Z\d-]+)/gm)
                ?.map((tag) =>
                    tag.trim().replaceAll(`\n`, ``).replace(`#`, ``),
                ) || []

        if (tags.length === 0) {
            backlinks[slug] = { ...backlinks[slug] }
        } else {
            backlinks[slug] = { ...backlinks[slug], tags }
        }
    }

    fs.writeFileSync(
        `./assets/backlinks.json`,
        JSON.stringify(backlinks, null, 2),
        `utf-8`,
    )
    console.log(`Backlinks saved to ./assets/backlinks.json`)
}

const buildSearchIndex = (filemap) => {
    const index: Record<string, unknown> = {}
    Object.entries(filemap).forEach(([slug, path]: [string, string]) => {
        const file = fs.readFileSync(`./data/${path}`, `utf-8`)

        index[slug] = {
            title: path.split(`/`).pop()?.replace(`.md`, ``),
            content: file,
        }
    })

    fs.writeFileSync(
        `./assets/search-index.json`,
        JSON.stringify(index, null, 2),
    )
    console.log(`Search index saved to ./assets/search-index.json`)
}

const saveTreeToFile = (tree: DirectoryNode, filePath: string): void => {
    const treeJson = JSON.stringify(tree, null, 2)
    fs.writeFileSync(filePath, treeJson, `utf-8`)
    console.log(`Tree structure saved to ${filePath}`)
}

;(async function () {
    const tree = await buildTree()
    saveTreeToFile(tree, `./assets/tree.json`)

    const filemap = mapFiles(tree)
    buildSearchIndex(filemap)

    mapBacklinks()
})()
