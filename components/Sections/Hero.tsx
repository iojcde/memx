const Hero = () => {
  return (
    <div className="h-[90vh]">
      <div className="float-right flex h-[90vh] w-full max-w-7xl rounded-sm bg-rose-200 transition duration-100 dark:border-gray-600 dark:bg-black dark:lg:border-y dark:lg:border-l">
        <div className="mt-24 px-4 pb-8 md:mt-36 lg:mt-40 lg:px-12">
          <h1
            id="hero-text"
            className="text-[18vw] text-6xl font-semibold leading-tight dark:text-white sm:text-7xl lg:text-8xl"
          >
            Full-stack Developer & Designer based in Seoul.
          </h1>
          <h2 className="mt-6 flex font-mono text-xl">
            Portfolio of Jeeho Ahn{` `}
            <span className="my-auto ml-4 inline-block h-0 w-20 border-b-2 border-black dark:border-gray-100"></span>
          </h2>
        </div>
      </div>
    </div>
  )
}
export default Hero
