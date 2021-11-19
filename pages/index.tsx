import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Tag from 'components/Tag'
import Image from 'next/image'
import Link from 'next/link'
import { BsHeartFill } from 'react-icons/bs'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="mt-16 ml-4 mb-16 h-36 w-36 transition duration-100 rounded-full ring-4 ring-offset-8 ring-offset-primary ring-teal-500 dark:ring-teal-400 select-none">
          <Image
            className="object-cover rounded-full"
            src="https://avatars.githubusercontent.com/u/31413538"
            width="144"
            height="144"
            alt="Jeeho's Profile Photo"
          />
        </div>
        <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-teal-500 dark:text-teal-400 mb-3">
          Hey there,
        </h2>
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold dark:text-white">
          I&apos;m Jeeho.
        </h1>

        <p className="text-secondary apply-prose pt-2">
          I&apos;m a student and a software developer based in Seoul, South
          Korea. Welcome to my corner of the internet. I&apos;m so happy to have
          you here!
        </p>

        <h2 className="md:text-3xl text-2xl font-bold md:mt-20 mt-12">
          Technologies I{` `}
          <BsHeartFill
            size={22}
            className="heartbeat inline-block align-baseline ml-1 "
            color="red"
          />
        </h2>
        <div className="flex flex-wrap gap-2 mt-4 ">
          <Tag text="Next.js" />
          <Tag text="Tailwindcss" />
          <Tag text="TypeScript" />
          <Tag text="JavaScript" />
          <Tag text="Golang" />
          <Tag text="Rust" />
          <Tag text="Docker" />
          <Tag text="HTTP/3" />
          <Tag text="Linux" />
          <Tag text="Git" />
          <Tag text="Wireguard" />
          <Tag text="Python" />
          <Tag text="Nomad" />
          <Tag text="Kubernetes" />
          <Tag text="GraphQL" />
          <Tag text="OAuth" />
          <Tag text="..." />
        </div>

        <div className="md:mt-12 mt-4 apply-prose ">
          <div className=" ">
            <h3 className="">Work Experience</h3>
            <ul className="">
              <li>
                <a href="https://fosshost.org">Fosshost</a> - TechOps Volunteer
              </li>
              <li>
                <a className=" text-amber" href="https://vignetteapp.org">
                  Vignette
                </a>
                {` `}- Web Developer / Community Relations / Infrastructure
              </li>
            </ul>
          </div>
        </div>
        <div className=" mt-12 underline">
          <Link href="/about">Learn more -&gt;</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
