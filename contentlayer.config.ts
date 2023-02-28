import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import remarkWikiLinks from 'remark-wiki-link-plus'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const computedFields: ComputedFields = {
  readingTime: { type: `json`, resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: `number`,
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  tweetIds: {
    type: `json`,
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
      const tweetIDs = tweetMatches?.map(
        (tweet: { match: (arg0: RegExp) => any[] }) =>
          tweet.match(/[0-9]+/g)[0],
      )
      return tweetIDs ?? []
    },
  },
  slug: {
    type: `string`,
    resolve: (doc) =>
      doc._raw.sourceFileName
        .replace(/\.md$/, ``)
        .replace(` `, `-`)
        .toLowerCase(),
  },
  title: {
    type: `string`,
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ``),
  },
  backlinks: {
    type: `list`,
    resolve: (doc) => {
      const title = doc._raw.sourceFileName.replace(/\.md$/, ``)
      const backlinks: Record<string, Record<string, string>> = {}

      const array = [...doc.body.raw.matchAll(/.*\[\[(.+?)\]\].*/g)]

      array.forEach((m) => {
        backlinks[m[1]] = {
          ...backlinks[title],
          [title]: m[0],
        }
        console.log(backlinks)
        return backlinks
      })
    },
  },
}

const research = defineDocumentType(() => ({
  name: `Research`,
  filePathPattern: `research/*.md`,
  contentType: `mdx`,
  fields: {
    hex: { type: `string`, required: true },
  },
  computedFields,
}))

const blog = defineDocumentType(() => ({
  name: `Blog`,
  filePathPattern: `blog/*.mdx`,
  contentType: `mdx`,
  fields: {
    hex: { type: `string`, required: true },
  },
  computedFields,
}))

const contentLayerConfig = makeSource({
  contentDirPath: `data`,
  documentTypes: [research, blog],
  mdx: {
    remarkPlugins: [remarkGfm, remarkWikiLinks],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: [`anchor`],
          },
        },
      ],
    ],
  },
})

export default contentLayerConfig
