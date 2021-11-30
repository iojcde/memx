import Image from 'next/image'
import { parseISO, format } from 'date-fns'

import Layout from '../Layout'
// import Subscribe from 'components/Subscribe';
import ViewCounter from '../ViewCounter'
import type { PropsWithChildren } from 'react'
import type { Blog } from '.contentlayer/types'

const editUrl = (slug: string) =>
  `https://github.com/jcdea/website/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jcde.xyz/blog/${slug}`,
  )}`

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Blog }>) {
  return (
    <Layout
      title={`${post.title} – Jeeho Ahn`}
      desc={post.summary}
      image={`https://leerob.io${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white capitalize">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Jeeho Ahn"
              height={24}
              width={24}
              src="/images/profile.png"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {`Jeeho Ahn / `}
              {format(parseISO(post.publishedAt), `MMMM dd, yyyy`)}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="w-full mt-4 apply-prose max-w-none">{children}</div>
        <div className="mt-8">{/* <Subscribe /> */}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
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
      </article>
    </Layout>
  )
}
