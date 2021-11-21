import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
// import components from 'components/MDXComponents';
import BlogLayout from 'components/layout/Blog'
import { allBlogs } from '.contentlayer/data'
import type { Blog } from '.contentlayer/types'

export default function Blog({ post }: { post: Blog }) {
  const Component = useMemo(
    () => getMDXComponent(post.body.code),
    [post.body.code],
  )
  return (
    <BlogLayout post={post}>
      <Component
        components={
          {
            // ...components,
          } as any
        }
      />
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

interface ParamsInterface {
  slug: string
}

export async function getStaticProps({ params }: { params: ParamsInterface }) {
  const post = allBlogs.find((post) => post.slug === params.slug)

  return {
    props: { post },
  }
}
