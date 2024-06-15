import fs from 'node:fs/promises'
import {mdxjs} from 'micromark-extension-mdxjs'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {mdxFromMarkdown, mdxToMarkdown} from 'mdast-util-mdx'
import {toMarkdown} from 'mdast-util-to-markdown'

const doc = await fs.readFile('example.mdx')

const tree = fromMarkdown(doc, {
  extensions: [mdxjs()],
  mdastExtensions: [mdxFromMarkdown()]
})

console.log(JSON.stringify(tree, null, 2))
 