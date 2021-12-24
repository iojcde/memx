import Link from 'next/link'
import useSWR from 'swr'
import Image from 'components/BlurImage'
import fetcher from 'lib/fetcher'
import { Views } from 'lib/types'
import type { Blog } from '.contentlayer/types'

export default function BlogPost({
  title,
  summary,
  slug,
  image,
}: Pick<Blog, 'title' | 'summary' | 'slug' | 'image'>) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
  const views = data?.total

  return (
    <Link href={`/blog/${slug}`} passHref>
      <a className="w-full no-underline">
        <div className="w-full mb-8">
          <Image
            src={
              `https://res.cloudinary.com/jcdea/` +
              image.slice(image.lastIndexOf(`/`) + 1)
            }
            alt="banner image"
            width="1200"
            height="400"
            className="rounded-t-xl object-cover object-top"
          />
          <div className="flex flex-col justify-between md:flex-row">
            <h2 className="w-full mb-2 text-lg font-medium capitalize text-gray-900 md:text-2xl dark:text-gray-100">
              {title}
            </h2>

            <p className="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">
              {`${views ? new Number(views).toLocaleString() : `–––`} views`}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </a>
    </Link>
  )
}
