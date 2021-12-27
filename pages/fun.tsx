import Nav from 'components/Nav'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

import { useEffect, useState } from 'react'
import Footer from 'components/Footer'
import Link from 'next/link'

const Fun = () => {
  const { scrollYProgress } = useViewportScroll()
  const scaleX = useTransform(scrollYProgress, [0.4, 1], [1, 12])
  const scaleY = useTransform(scrollYProgress, [0.4, 1], [1, 4])
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(
    () => scrollYProgress.onChange((latest) => setScrollProgress(latest)),
    [scrollYProgress],
  )
  return (
    <div className="w-full">
      <Nav />
      <div className="apply-prose mx-auto px-4">
        <div>
          <h1 className="">Have Fun! :p</h1>

          <h2>framer motion thing </h2>
          <div className=" w-80 h-80 bg-gradient-to-br mx-auto from-purple-500 to-fuchsia-500 rounded-lg flex shadow-inner mb-16">
            <motion.div
              className="bg-white w-24 h-24 m-auto  rounded-3xl drop-shadow-lg"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: `100%`,
              }}
            />
          </div>

          {/*TODO: fix the dvd logo (doesn't work with preact/compat - works with react)*/}
          <h2>The DVD Logo</h2>
          <p className=" lg:hidden">
            tip: for even more fun try to keep the logo centered
          </p>
          <div className="relative">
            <iframe
              className="w-full aspect-[4/3] rounded-lg"
              src="https://dvdlogo.vercel.app/?speed=2"
            ></iframe>
            <Link href="https://dvdlogo.vercel.app/?speed=2" passHref>
              <a className="absolute right-4 bottom-4 text-gray-400 text-xs">
                View in glorious full screen
              </a>
            </Link>
          </div>
          <h2>{scrollProgress > 0.5 ? `Big` : `Small`} Chungus</h2>
          <div
            className=" w-80 h-80 md:w-96 md:h-96 overflow-hidden mx-auto rounded-lg flex shadow-inner m-32"
            style={{
              backgroundImage: `url(images/chungusbg.jpeg)`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
            }}
          >
            <motion.div
              style={{ scaleX: scaleX, scaleY: scaleY }}
              className="m-auto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                width="200"
                height="200"
                src="/images/chungus.png"
                alt="big chungus"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Fun
