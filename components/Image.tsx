import NextImage, { ImageProps } from 'next/image'
import React from 'react'

const myLoader = ({ src, width, quality }) => {
  return `https://jcdea-website.vercel.app/_next/image/${src}?w=${width}&q=${
    quality || 75
  }`
}

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage loader={myLoader} {...props} />
}

export default Image
