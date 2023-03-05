import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import components from 'components/MDXComponents'
import { allDocuments } from 'contentlayer/generated'
import { getBacklinks } from 'lib/markdown'
import Backlink from './Backlink'
import Image from 'next/image'
import { buildTree } from 'utils/buildTree'
import TopContext from './TopContext'

const editUrl = (slug: string) =>
  `https://github.com/jcdea/website/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jcde.xyz/blog/${slug}`,
  )}`

export default function PostPage({ params }) {
  // useLiveReload()

  const slug = params.slug.toUpperCase() as string
  const post = allDocuments.find((post) => {
    switch (post.type) {
      case `Journal`:
        return post.slug === slug
      default:
        return post.hex === slug
    }
  })
  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)
  const backlinks = getBacklinks(slug)

  return (
    <>
      <div className="relative mb-16 mt-24 w-full max-w-4xl flex-col items-start justify-center lg:mt-12 ">
        <TopContext title={post.title} tree={buildTree()} context={post.type} />
        <header className="relative w-full px-6 lg:px-16">
          <h1 className="text-3xl font-semibold capitalize text-neutral-800 dark:text-neutral-200 lg:text-5xl">
            {post.title}
          </h1>
        </header>
        <div className="mt-4 flex w-full flex-col items-start justify-between px-6 md:flex-row md:items-center lg:px-16">
          <div className="flex items-center">
            <Image
              alt="Jeeho Ahn"
              height={24}
              width={24}
              src="https://avatars.githubusercontent.com/u/31413538?v=4"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
              {`Jeeho Ahn`}
            </p>
          </div>
          <p className="min-w-32 mt-2 text-sm text-neutral-600 dark:text-neutral-400 md:mt-0">
            {post.readingTime.text}
          </p>
        </div>
        <>
          <article className="apply-prose mt-4 w-full max-w-none px-6 lg:px-16">
            <MDXContent components={components as any} />
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

export async function generateStaticParams() {
  return allDocuments.map((p) => {
    if (p.type == `Journal`) {
      return { slug: p.slug }
    } else {
      return { slug: p.hex }
    }
  })
}
