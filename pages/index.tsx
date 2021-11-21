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

        <div className="md:mt-24 mt-20 apply-prose ">
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
        <div className=" mt-12 underline">
          <Link href="/about">Learn more -&gt;</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
