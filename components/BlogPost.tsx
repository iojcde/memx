import Link from 'next/link'
import Image from 'components/BlurImage'
import type { Blog } from '.contentlayer/types'

export default function BlogPost({
  title,
  summary,
  slug,
  image,
}: Pick<Blog, 'title' | 'summary' | 'slug' | 'image'>) {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <a className="w-full no-underline">
        <div className="w-full mb-12 border transition  pb-2 hover:shadow-lg border-slate-200 dark:border-slate-800 rounded-lg">
          <Image
            src={
              `https://res.cloudinary.com/jcdea/` +
              image.slice(image.lastIndexOf(`/`) + 1)
            }
            alt="banner image"
            width="1200"
            height="400"
            className="object-cover rounded-t-lg object-top"
          />
          <div className="p-5 pt-2 lg:p-8 lg:pt-4 ">
            <div className=" flex flex-col justify-between md:flex-row">
              <h2 className="w-full mb-2 text-2xl font-semibold capitalize text-gray-900 md:text-3xl dark:text-gray-100">
                {title}
              </h2>
            </div>
            <p className=" apply-prose text-gray-600 dark:text-gray-300">
              {summary}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}
