import Image from 'components/BlurImage'
import { parseISO, format } from 'date-fns'
import Layout from '../Layout'
import generateSocialImage from 'lib/generateSocialImage'
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
  const socialImageConf = generateSocialImage({
    title: encodeURIComponent(post.title),
    underlayImage: post.image.slice(post.image.lastIndexOf(`/`) + 1),
    cloudName: `jcdea`,
    imagePublicID: `social-template.png`,
  })

  return (
    <Layout
      title={`${post.title} – Jeeho Ahn`}
      desc={post.summary}
      image={socialImageConf}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="container mx-auto mb-16 flex w-full max-w-5xl flex-col items-start justify-center">
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
              {`Jeeho Ahn / `}
              {format(parseISO(post.publishedAt), `MMMM dd, yyyy`)}
            </p>
          </div>
          <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
            {post.readingTime.text}
          </p>
        </div>
        <div className="mx-auto pt-6">
          <Image
            src={
              `https://res.cloudinary.com/jcdea/` +
              post.image.slice(post.image.lastIndexOf(`/`) + 1)
            }
            alt="banner image"
            width={1200}
            height={630}
            className="rounded-lg bg-top object-cover object-top"
          />
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
