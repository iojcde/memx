import Tag from 'components/Tag'
import Layout from 'components/Layout'
import { BsFillHeartFill } from 'react-icons/bs'
import Image from 'next/image'
export const About = (): JSX.Element => {
  return (
    <Layout title="About - Jeeho Ahn">
      <div className="container px-4">
        <h1
          className="text-4xl dark:text-white sm:text-6xl lg:text-7xl"
          data-cursor="-opaque"
        >
          Who am I???
        </h1>
        <div className="apply-prose  pt-2 text-lg prose-h2:font-normal lg:text-xl">
          <p>
            I&apos;m an open source software and privacy advocate. I also happen
            to be intersted in full-stack development, and web design.
          </p>
          <h2 className="mt-2 text-2xl lg:text-4xl">Past work</h2>
          <p>
            I&apos;m a core developer at{` `}
            <a
              href="https://vignetteapp.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vignette
            </a>
            , the open source, modular streaming toolkit for virtual streaming.
            <br />
            <br />I led the development of our website and blog. &darr;
          </p>
        </div>

        <Image
          src="https://owo.whats-th.is/4c2J1EH.png"
          width={1878}
          height={1080}
          className="my-2"
          alt=""
          layout="raw"
        />
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
        </div>
      </div>
    </Layout>
  )
}
export default About
