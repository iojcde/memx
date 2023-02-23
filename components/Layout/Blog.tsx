import { parseISO, format } from 'date-fns'
import Layout from '../Layout'
import generateSocialImage from 'lib/generateSocialImage'
import type { PropsWithChildren } from 'react'
import type { Research } from 'contentlayer/generated'
import Image from 'next/image'

const editUrl = (slug: string) =>
  `https://github.com/jcdea/website/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jcde.xyz/blog/${slug}`,
  )}`

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Research }>) {
  return (
    <Layout title={`${post.title} – Jeeho Ahn`} type="article">
      <article className="container mb-16 flex w-full flex-col items-start justify-center px-4">
        <h1 className="mb-4 text-3xl font-bold capitalize tracking-tight text-black  dark:text-white md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Jeeho Ahn"
              height={24}
              width={24}
              src="/images/profile.jpeg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {`Jeeho Ahn`}
            </p>
          </div>
          <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
            {post.readingTime.text}
          </p>
        </div>

        <div className="apply-prose mt-4 w-full max-w-none">{children}</div>
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
