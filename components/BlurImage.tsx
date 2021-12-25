import NextImage, { ImageProps } from 'next/image'

interface Props extends ImageProps {
  noRounded?: boolean
}
const Image = (props: Props) => {
  const isStatic = typeof props.src != `string`

  return (
    <div
      className={`${
        !props.noRounded && `rounded-md`
      } overflow-hidden inline-flex`}
    >
      <NextImage
        src={props.src}
        blurDataURL={!isStatic && (props.src as string)}
        placeholder="blur"
        {...props}
      />
    </div>
  )
}
export default Image
