import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { matter } from 'vfile-matter'
import remarkMdx from 'remark-mdx'

import { ObsidianFlavoredMarkdown } from './obsidian-flavored-markdown'
const ofm = ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false })

export const process = async (f) => {
    f.value = ofm.textTransform(f.value)

    // Parse Frontmatter
    matter(f, { strip: true })

    const file = await unified()
        .use(remarkStringify)
        .use(remarkParse) 
        .process(f)
 

    return file
}

declare module 'vfile' {
    interface DataMap {
        title: string
        slug: string
        readingTime: any
        rawpath: string
    }
}
