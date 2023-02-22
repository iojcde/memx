import { useMDXComponent } from 'next-contentlayer/hooks'
import components from 'components/MDXComponents'
import BlogLayout from 'components/Layout/Blog'
import { allResearch, Research } from 'contentlayer/generated'
import { getBacklinks } from 'lib/markdown'
import Link from 'next/link'

export default function Blog({ params }) {
  const post = allResearch.find((post) => post.slug === params.slug) as Research

  const MDXContent = useMDXComponent(post.body.code)
  const backlinks = getBacklinks(params.slug)

  return (
    <BlogLayout post={post}>
      <MDXContent components={components as any} />
      <ul>
        {backlinks.map((backlink) => (
          <li key={backlink.url}>
            <Link href={backlink.url}>
              <strong>{backlink.type.replace(`Post`, `Note`)}: </strong>
              {backlink.title}
            </Link>
          </li>
        ))}
      </ul>
    </BlogLayout>
  )
}

export async function generateStaticParams() {
  return allResearch.map((p) => ({ slug: p.slug }))
}
