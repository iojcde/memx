
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified, } from 'unified'
import { matter } from 'vfile-matter'


import { ObsidianFlavoredMarkdown } from "./obsidian-flavored-markdown"
const ofm = ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false })

export const process = async (f) => {
  // Parse Frontmatter
  matter(f, { strip: true })

  // f.value = ofm.textTransform(Buffer.from(f.value.buffer).toString())
  const file = await unified()
    .use(remarkStringify)
    .use(remarkParse)
    .use(ofm.markdownPlugins!())

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