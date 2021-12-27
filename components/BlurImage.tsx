import NextImage, { ImageProps } from 'next/image'

const Image = (props: ImageProps) => {
  const isStatic = typeof props.src != `string`

  return (
    <div className={` overflow-hidden inline-flex`}>
      <NextImage
        src={props.src}
        blurDataURL={!isStatic && (props.src as string)}
        placeholder={props.width > 40 ? `blur` : `empty`}
        {...props}
      />
    </div>
  )
}
export default Image
