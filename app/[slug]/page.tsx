'use client'
import { useMemo } from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from 'components/MDXComponents'
import BlogLayout from 'components/Layout/Blog'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'

export default function Blog({ params }) {
  console.log(allBlogs)
  console.log(params)
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug)

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <BlogLayout post={post}>
      <MDXContent
        components={
          {
            ...components,
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
