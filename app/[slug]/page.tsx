import { useMemo } from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from 'components/MDXComponents'
import BlogLayout from 'components/Layout/Blog'
import { allResearch } from 'contentlayer/generated'
import type { Research } from 'contentlayer/generated'

export default function Blog({ params }) {
  const post = allResearch.find(
    (post) => post._raw.flattenedPath === `research/` + params.slug,
  )


  const MDXContent = useMDXComponent(post.body.code)

  return (
    <BlogLayout post={post}>
      <MDXContent />
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allResearch.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}
