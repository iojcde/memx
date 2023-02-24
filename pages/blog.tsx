import { useState } from 'react'

import BlogPost from 'components/BlogPost'
import { InferGetStaticPropsType } from 'next'
import { pick } from 'lib/utils'
import { allResearch } from 'contentlayer/generated'

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="container mx-auto mb-16 flex max-w-5xl flex-col items-start justify-center px-4">
        <h1 className="mb-4 text-3xl font-bold">Blog</h1>
        <div className="apply-prose mb-4">
          <p>
            I might not be the greatest writer ever, but I always try my best
            when writing posts.
            <br />
            {` In total, I've written ${posts.length} articles on this site.
        Use the search below to filter by title.`}
          </p>
        </div>
        {/* {!searchValue && (
          <>
            <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
              Most Popular
            </h3>
            <BlogPost
              title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
              summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
              slug="style-guides-component-libraries-design-systems"
            />
            <BlogPost
              title="How Stripe Designs Beautiful Websites"
              summary="Examining the tips and tricks used to make Stripe's website design a notch above the rest."
              slug="how-stripe-designs-beautiful-websites"
            />
            <BlogPost
              title="Creating a Monorepo with Lerna & Yarn Workspaces"
              summary="In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process."
              slug="monorepo-lerna-yarn-workspaces"
            />
          </>
        )} */}
        <h1 className="my-8 font-bold uppercase tracking-wide sm:leading-snug">
          All Posts
        </h1>
        {!posts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {posts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </>
  )
}

export function getStaticProps() {
  const posts = allResearch.map((post) => pick(post, [`hex`, `title`]))

  return { props: { posts } }
}
