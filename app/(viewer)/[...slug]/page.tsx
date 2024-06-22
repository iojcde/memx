import { notFound } from 'next/navigation'
import { getBacklinks, getDocument } from 'lib/documents'
import Backlink from './Backlink'
import Image from 'next/image'
import tree from 'assets/tree.json'
import TopContext from './TopContext'
import Markdown from 'components/Markdown'

const editUrl = (slug: string) =>
    `https://github.com/iojcde/memx/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug: string) =>
    `https://mobile.twitter.com/search?q=${encodeURIComponent(
        `https://jcde.xyz/blog/${slug}`,
    )}`

export default async function PostPage({ params,preview }) {
    const slug = params.slug

    const post = await getDocument({ slug })

    if (!post) {
        notFound()
    }

    const backlinks = await getBacklinks(post.data.slug)

    const context = post.data.rawpath.split(`/`).slice(0, -1)

    return (
        <>
            <div className="relative mb-16 mt-16 w-full max-w-4xl flex-col items-start justify-center lg:mt-0 ">
                <TopContext
                    title={post.data.title}
                    tree={tree}
                    context={context}
                />
                <header className="relative w-full px-6 lg:px-8">
                    <h1 className="mt-4 text-3xl font-semibold capitalize text-neutral-800 dark:text-neutral-200 lg:text-4xl">
                        {post.data.title}
                    </h1>
                </header>
                <div className="flex w-full flex-col items-start justify-between px-6 md:flex-row md:items-center lg:px-8 ">
                    <p className="mt-2 min-w-32 text-sm text-neutral-600 dark:text-neutral-400">
                        {post.data.readingTime.text}
                    </p>
                </div>
                <>
                    <article className="apply-prose mt-6 w-full max-w-none px-6 lg:px-8">
                        <Markdown content={post} />
                    </article>
                </>
                <div className="px-6 text-xs text-neutral-700 dark:text-neutral-400 lg:px-8 ">
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
                <div className="px-6 lg:px-8 ">
                    <hr className="mt-8" />
                    <Backlink backlinks={backlinks} />
                </div>
            </div>
        </>
    )
}
