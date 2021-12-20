import NextImage, { ImageProps } from 'next/image'

const imageKitLoader = ({ src, width, quality }) => {
  return `/api/image?src=${src}&w=${width}&q=${quality || `75`}`
}

const PreviewImage: React.FC<ImageProps> = (props) => {
  return <NextImage loader={imageKitLoader} {...props} />
}

export default PreviewImage
