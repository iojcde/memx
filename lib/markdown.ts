
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified, } from 'unified'
import { matter } from 'vfile-matter'


import { ObsidianFlavoredMarkdown } from "./obsidian-flavored-markdown"


export const process = async (f) => {
  // Parse Frontmatter
  matter(f, { strip: true })

  const file = await unified()
    .use(remarkStringify)
    .use(remarkParse)
    .use(ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }).markdownPlugins!())

    .process(f)

  return file
}

declare module "vfile" {
  interface DataMap {
    title: string
    slug: string
    readingTime: any
    rawpath: string
  }
}