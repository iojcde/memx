import Tag from '../components/tag'
import Layout from '../components/layout'
import { AiFillHeart } from 'react-icons/ai'

export const About = (): JSX.Element => {
  return (
    <Layout title="About - Jeeho Ahn">
      <div className="container mx-auto max-w-4xl">
        <h2 className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-teal-500 dark:text-teal-400 mb-3">
          About me
        </h2>
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold dark:text-white">
          Here&apos;s my story.
        </h1>

        <p className="text-secondary prose-lg dark:prose-light pt-2">
          <p>I&apos;m an open source software and privacy advocate.</p>
          <p>
            I volunteer at{` `}
            <a
              href="https://fosshost.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fosshost
            </a>
            , a free cloud compute platform for the open source community.
          </p>
        </p>

        <div className="prose dark:prose-light pt-4">
          Here are some projects I&apos;m working on:
          <ul>
            <li>
              💻{` `}
              <a
                href="https://fosshost.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fosshost
              </a>
              {` `}- Nonprofit provider of free to use and accessible
              cloud-hosting services for the free and open source software
              community.
            </li>
            <li>
              <span className="text-red-500">❤️</span>
              {` `}
              <a
                href="https://vignetteapp.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vignette
              </a>
              - The open source VTuber software.
            </li>
            <li>
              🅧{` `}
              <a
                href="https://github.com/liveduo/destack"
                target="_blank"
                rel="noopener noreferrer"
              >
                Destack
              </a>
              {` `}- Static page builder based on Next.js.
            </li>
            <li>
              🦀{` `}
              <a
                href="https://github.com/linkerd/linkerd2-proxy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkerd2-proxy
              </a>
              {` `}- A purpose-built proxy for the Linkerd service mesh. Written
              in Rust.
            </li>
          </ul>
        </div>
        <h2 className="md:text-3xl text-2xl font-bold md:mt-16 mt-8">
          Technologies I{` `}
          <AiFillHeart
            size={26}
            className="heartbeat inline-block align-baseline "
            color="red"
          />
        </h2>
        <div className="flex flex-wrap gap-2 md:mt-4 mt-3">
          <Tag text="Next.js" />
          <Tag text="Tailwindcss" />
          <Tag text="TypeScript" />
          <Tag text="JavaScript" />
          <Tag text="Golang" />
          <Tag text="Rust" />
          <Tag text="HTTP/2" />
          <Tag text="HTTPS" />
          <Tag text="Linux" />
          <Tag text="Git" />
          <Tag text="Python" />
          <Tag text="Docker" />
          <Tag text="Kubernetes" />
          <Tag text="GraphQL" />
          <Tag text="Discord.js" />
          <Tag text="..." />
        </div>

        <div className="mt-8  prose dark:prose-light  prose dark:prose-light">
          <div className=" ">
            <h3 className="">Work Experience</h3>
            <ul className="">
              <li>
                <a
                  href="https://fosshost.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fosshost
                </a>
                {` `}- TechOps Volunteer
              </li>
              <li>
                <a
                  className=" text-amber"
                  href="https://vignetteapp.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vignette
                </a>
                {` `}- Web Developer / Community Relations / Infrastructure
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default About
