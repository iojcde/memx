import Tag from 'components/Tag'
import Layout from 'components/Layout'
import { BsFillHeartFill } from 'react-icons/bs'

export const About = (): JSX.Element => {
  return (
    <Layout title="About - Jeeho Ahn">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold dark:text-white sm:text-5xl lg:text-5xl">
          About Me
        </h1>

        <div className="text-secondary apply-prose pt-2">
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
        </div>

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
        <h2 className="mt-8 text-xl font-bold md:mt-16 md:text-2xl">
          Technologies I{` `}
          <BsFillHeartFill
            size={18}
            className="heartbeat ml-1 inline-block align-baseline"
            color="red"
          />
        </h2>
        <div className="mt-4 flex flex-wrap gap-2 ">
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

        <div className="apply-prose mt-8 ">
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

          <p>
            A lot of the components powering this website are originally from
            {` `}
            <a
              href="https://leerob.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lee Robinson&apos;s website
            </a>
            , and{` `}
            <a
              href="https://braydoncoyer.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Braydon Coyer&apos;s website
            </a>
            .{` `}
          </p>
          <p>
            My website wouldn&apos;t have been possible without these people,
            and the open source community which developed the packages I use.
          </p>
        </div>
      </div>
    </Layout>
  )
}
export default About
