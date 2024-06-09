import { notFound } from 'next/navigation'
import { getBacklinks, getDocument } from 'lib/markdown'
import Backlink from './Backlink'
import Image from 'next/image'
import tree from 'assets/tree.json'
import TopContext from './TopContext'
import Markdown from 'components/Markdown'

const editUrl = (slug: string) =>
  `https://github.com/iojcde/memx/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jcde.xyz/blog/${slug}`,
  )}`

export default async function PostPage({ params }) {
  const slug = params.slug


  const content = await getDocument({ slug })

  const post = { title: 'y', readingTime: { text: '1 min' } }

  if (!post) {
    notFound()
  }

  const backlinks = getBacklinks(slug)

  return (
    <>
      <div className="relative mb-16 w-full max-w-4xl flex-col items-start justify-center lg:mt-0 mt-16 ">
        <TopContext title={post.title} tree={tree} context={'ye'} />
        <header className="relative w-full px-6 lg:px-16">
          <h1 className="text-3xl font-semibold capitalize text-neutral-800 dark:text-neutral-200 lg:text-5xl">
            {post.title}
          </h1>
        </header>
        <div className="flex w-full flex-col items-start justify-between px-6 md:flex-row md:items-center lg:px-16">

          <p className="mt-2 min-w-32 text-sm text-neutral-600 dark:text-neutral-400">
            {post.readingTime.text}
          </p>
        </div>
        <>
          <article className="apply-prose mt-4 w-full max-w-none px-6 lg:px-16">
            <Markdown content={content?.content} />
          </article>
        </>
        <div className="px-6 text-xs text-neutral-700 dark:text-neutral-400 lg:px-16">
          <a
            href={discussUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Discuss on Twitter`}
          </a>
          {` • `}
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Edit on GitHub`}
          </a>
        </div>
        <div className="px-6 lg:px-16">
          <hr className="mt-8" />
          <Backlink backlinks={backlinks} />
        </div>
      </div>
    </>
  )
}
