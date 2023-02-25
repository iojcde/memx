import { pick } from 'lib/utils'
import { allResearch } from 'contentlayer/generated'
import Link from 'next/link'

export default function Home() {
  const posts = allResearch.map((post) => pick(post, [`hex`, `title`]))
  return (
    <>
      <div className="container mx-auto mb-16 flex max-w-5xl flex-col items-start justify-center px-4">
        <h1 className="mb-4 text-3xl font-bold">memx</h1>
        <div className="mb-4">
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

        <h1 className="my-4 font-bold uppercase tracking-wide sm:leading-snug">
          All Posts
        </h1>
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <Link key={post.title} className="text-xl" href={post.hex}>
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
