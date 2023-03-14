import { allBlogs, allResearch } from 'contentlayer/generated'
import Link from 'next/link'

export default function Home() {
  const posts = allBlogs
  const research = allResearch.slice(0, 5)

  return (
    <>
      <div className="container mx-auto mb-16 flex max-w-4xl flex-col items-start justify-center px-4">
        <h1 className="font-display mb-4 mt-8 text-3xl font-bold">memx</h1>
        <div className="apply-prose mb-4">
          <p>
            See Sunghyun Cho&apos;s post on {` `}
            <a href="https://cho.sh/r/6AE59D">building a second brain</a>.
            <br />
            This is my take on his <a href="https://cho.sh">website</a>, built
            with
            {` `}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
            {` `} and {` `}
            <a
              href="https://contentlayer.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contentlayer
            </a>
            .
            <br />
          </p>
        </div>

        <h1 className=" mb-2 font-semibold">All Posts</h1>
        <div className="flex flex-col gap-2 dark:text-neutral-200">
          {posts.map((post) => (
            <Link
              key={post.title}
              className="text-xl capitalize"
              href={post.hex}
            >
              {post.title}
            </Link>
          ))}
        </div>

        <h1 className="mt-8 mb-2 font-semibold">All Research</h1>
        <div className="flex flex-col  gap-2 dark:text-neutral-200">
          {research.map((post) => (
            <Link
              key={post.title}
              className="text-xl capitalize"
              href={post.hex}
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
