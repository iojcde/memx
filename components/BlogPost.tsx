import Link from 'next/link'
import Image from 'next/image'
import type { Research } from 'contentlayer/generated'

export default function BlogPost({
  title,
  hex,
}: Pick<Research, 'title' | 'hex'>) {
  return (
    <Link href={`/${hex}`}>
      <div className="mb-12 w-full rounded-lg border  border-slate-200 pb-2 transition hover:shadow-lg dark:border-slate-800">
        <div className="p-5 pt-2 lg:p-8 lg:pt-4 ">
          <div className=" flex flex-col justify-between md:flex-row">
            <h2 className="mb-2 w-full text-2xl font-semibold capitalize text-gray-900 dark:text-gray-100 md:text-3xl">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  )
}
