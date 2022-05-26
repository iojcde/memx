import Link from 'next/link'

const Details = () => {
  return (
    <div className="slide-section overflow-hidden text-black">
      <div className="wrapper float-left mt-16 w-full max-w-7xl rounded-sm bg-teal-200 p-4 sm:p-8">
        <h1 className="text-4xl leading-tight lg:text-6xl">
          I design websites and develop software.
        </h1>
        <div className="mt-4 max-w-2xl text-lg leading-none lg:text-xl">
          {` `}
          <p>
            I currently volunteer at {` `}
            <b>
              <a href="https://fosshost.org">Fosshost</a>
              {` `}
            </b>
            , a non-profit provider of cloud services for the open source
            community.
          </p>
          <p className="mt-4">
            I&apos;m a Core Developer at{` `}
            <b>
              <a href="https://vignetteapp.org">Vignette</a>,
            </b>
            {` `}
            where I help out with <span className="underline">design</span>,
            <br /> <span className="underline">web development</span>, and
            {` `}
            <span className="underline">managing infrastructure</span>.{` `}
          </p>
          {` `}
          <p className="mt-8">
            I also am a community moderator for the project, which means I help
            moderate the Vignette
            {` `}
            <b>
              {` `}
              <a href="https://go.vignetteapp.org/discord">Discord Server</a>
            </b>
            {` `}.
          </p>
        </div>

        <div className="mt-6 text-lg underline lg:mt-12">
          <Link href="/about">Learn more -&gt; </Link>
        </div>
      </div>
    </div>
  )
}
export default Details
