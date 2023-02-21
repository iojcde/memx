import Link from 'next/link'
import Image from 'components/BlurImage'
import type { Research } from 'contentlayer/generated'

export default function BlogPost({
  title,
  summary,
  slug,
  image,
}: Pick<Research, 'title' | 'summary' | 'slug' | 'image'>) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="mb-12 w-full rounded-lg border  border-slate-200 pb-2 transition hover:shadow-lg dark:border-slate-800">
        <Image
          src={
            `https://res.cloudinary.com/jcdea/` +
            image.slice(image.lastIndexOf(`/`) + 1)
          }
          alt="banner image"
          width="1200"
          height="400"
          className="rounded-t-lg object-cover object-top"
        />
        <div className="p-5 pt-2 lg:p-8 lg:pt-4 ">
          <div className=" flex flex-col justify-between md:flex-row">
            <h2 className="mb-2 w-full text-2xl font-semibold capitalize text-gray-900 dark:text-gray-100 md:text-3xl">
              {title}
            </h2>
          </div>
          <p className=" apply-prose text-gray-600 dark:text-gray-300">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  )
}
