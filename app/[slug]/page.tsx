import { useMDXComponent, useLiveReload } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import components from 'components/MDXComponents'
import { allDocuments, allResearch, Research } from 'contentlayer/generated'
import { getBacklinks } from 'lib/markdown'
import Link from 'next/link'
import Backlink from 'components/Backlink'
import Image from 'next/image'
import PostHeader from 'components/PostHeader'

const editUrl = (slug: string) =>
  `https://github.com/jcdea/website/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jcde.xyz/blog/${slug}`,
  )}`

export default function Blog({ params }) {
  // useLiveReload()

  const slug = params.slug.toUpperCase() as string
  const post = allResearch.find((post) => post.hex === slug)
  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)
  const backlinks = getBacklinks(slug)

  return (
    <>
      <article className="mb-16 mt-8 w-full max-w-4xl flex-col items-start justify-center ">
        <PostHeader
          tree={allDocuments.map((doc) => ({
            title: doc.title,
            nav_title: doc.title,
            collapsible: false,
            collapsed: false,
            label: ``,
            urlPath: `/${doc.hex}`,
            children: [],
          }))}
          title={post.title}
        />
        <div className="mt-2 flex w-full flex-col items-start justify-between px-6 md:flex-row md:items-center lg:px-16">
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
          <div className="apply-prose mt-4 w-full max-w-none px-6 lg:px-16">
            <MDXContent components={components as any} />
          </div>
        </>
        <div className="px-6 text-sm text-neutral-700 dark:text-neutral-400 lg:px-16">
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
      </article>
    </>
  )
}

export async function generateStaticParams() {
  return allResearch.map((p) => ({ slug: p.hex }))
}
