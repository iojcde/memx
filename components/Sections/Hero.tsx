const Hero = () => {
  return (
    <div className="h-[90vh]">
      <div className="float-right flex h-[90vh] w-full max-w-7xl bg-rose-200 transition duration-100 dark:border-gray-500 dark:bg-black dark:lg:border-y dark:lg:border-l">
        <div className="mt-24 px-4 pb-8 md:mt-36 lg:mt-40 lg:px-12">
          <h1 className="text-[18vw] text-6xl leading-tight dark:text-white sm:text-7xl lg:text-8xl">
            <b> I&apos;m a full-stack developer & designer based in Seoul.</b>
          </h1>
          <h2 className="mt-6 text-2xl font-medium">
            <b>
              <a className="font-bold" href="https://vignetteapp.org">
                Vignette
              </a>
            </b>
            {` `}Core Developer
          </h2>
        </div>
      </div>
    </div>
  )
}
export default Hero
