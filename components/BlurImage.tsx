import NextImage, { ImageProps } from 'next/image'

const BlurImage = (props: ImageProps) => {
  const isStatic = typeof props.src != `string`
  return (
    <NextImage
      src={props.src}
      blurDataURL={!isStatic && (props.src as string)}
      placeholder="blur"
      {...props}
    />
  )
}
export default BlurImage
