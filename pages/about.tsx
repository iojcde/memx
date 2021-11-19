import Tag from 'components/Tag'
import Layout from 'components/Layout'
import { BsFillHeartFill } from 'react-icons/bs'

export const About = (): JSX.Element => {
  return (
    <Layout title="About - Jeeho Ahn">
      <div className="container mx-auto max-w-4xl">
        <h1 className="sm:leading-snug font-semibold tracking-wide uppercase text-teal-400 dark:text-teal-500 mb-4">
          About me
        </h1>
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold dark:text-white">
          Here&apos;s my story.
        </h1>

        <p className="text-secondary apply-prose pt-2">
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

        <div className="apply-prose pt-4">
          Here are some projects I&apos;m working on:
          <ul>
            <li>
              💻 &nbsp;
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
        <h2 className="md:text-2xl text-xl font-bold md:mt-16 mt-8">
          Technologies I{` `}
          <BsFillHeartFill
            size={18}
            className="heartbeat inline-block align-baseline ml-1"
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

        <div className="mt-8 apply-prose ">
          <div>
            <h3>Work Experience</h3>
            <ul>
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
          <h3>Contacts</h3>
          <ul>
            <li>
              <a
                href="mailto:io@fosshost.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                io@fosshost.org
              </a>
            </li>
            <li>
              io#8106 on <a href="https://discord.com">Discord</a>
            </li>
          </ul>

          <h3>Credits</h3>
          <p>This website's design is mostly based on <a href="https://braydoncoyer.dev"
            target="_blank"
            rel="noopener noreferrer">Braydon Coyer&apos;s excellent website</a>, with some tweaks.
          </p><p>
            Kudos to Braydon to making their website <a href="https://github.com/braydoncoyer/braydoncoyer.dev"
              target="_blank"
              rel="noopener noreferrer">open source</a>!</p>

          <p>A lot of the components powering this website are originally from <a href="https://leerob.io" target="_blank"
            rel="noopener noreferrer">Lee Robinson&nbsp;s website</a>. </p>
          <p>My website wouldn't have been possible without these people, and the open source community which developed the packages I use.</p>
        </div>
      </div>
    </Layout>
  )
}
export default About
