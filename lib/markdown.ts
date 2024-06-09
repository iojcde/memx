
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified, } from 'unified'
import { read } from 'to-vfile'
import tree from 'assets/tree.json'
import { matter } from 'vfile-matter'


import { ObsidianFlavoredMarkdown } from "./obsidian-flavored-markdown"

import { DirectoryNode, TreeNode } from 'types/TreeNode'

export function getBacklinks(hex: string) {
  return [].map((doc) => {
    const backlinks = [...doc.body.raw.matchAll(/.*\[\[(.+?)\]\].*/g)]

    return {
      title: doc.title,
      url: doc.type == `Journal` ? doc.slug : doc.hex,
      type: doc.type,
      text: backlinks[0][0],
    }
  })
}


export async function getDocument({ slug }: { slug: string[] }) {
  const target = slug.map(s => decodeURIComponent(s))

  // recursively search for a document in the tree
  const find = ({ node, level, parentPath }:
    { node: any, level: number, parentPath?: string }
  ) => {
    if (level > 20) throw new Error('Max depth reached')

    if (target.length == 0) throw new Error('document not found')
    if (target.length == 1) {
      const found = node.children.find((child: TreeNode) => child.slug == target[0])
      if (found) return `${parentPath}/${found.name}`
      else throw new Error('document not found')
    }


    const curr = target.shift()
    console.log('looking for ', curr)

    for (const child of node.children) {
      if (child.slug == curr && child.type == 'file') {
        return `${parentPath}/${child.slug}.md`
      } else if (child.slug == curr && child.type == 'dir') {
        return find({ node: child, level: level + 1, parentPath: `${parentPath}/${child.name}` })

      }
    }

    throw new Error('document not found')
  }

  const file = find({ node: tree, level: 0, parentPath: 'data' })

  try {
    const data = await process(await read(file))

    return {
      title: 'yeet',
      content: data,
    }
  } catch (err) {
    console.log(err);
  }

}

const process = async (f) => {
  // Parse Frontmatter
  matter(f, { strip: true })

  const file = await unified()
    .use(remarkStringify)
    .use(remarkParse)
    .use(ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }).markdownPlugins!())

    .process(f)

  return file
}