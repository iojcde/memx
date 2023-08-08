import { allBlogs, allResearch } from 'contentlayer/generated'
import Link from 'next/link'

export default function Blog() {
  const blog = allBlogs.slice(0, 5)

  return (
    <>
      <div className="container mx-auto mb-16 flex max-w-4xl flex-col items-start justify-center px-4">
        <h1 className="mb-4 mt-8 text-4xl font-bold">Blog</h1>
        <div className="flex flex-col  gap-4 dark:text-neutral-200">
          {blog.map((post) => (
            <div key={post.hex}>
              <Link
                className="text-2xl font-semibold capitalize"
                href={post.hex}
              >
                <h1> {post.title}</h1>
              </Link>
              <p className="text-neutral-800  dark:text-neutral-400">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
