import NextImage, { ImageProps } from 'next/image'

const imageKitLoader = ({ src, width, quality }) => {
    return `/api/image/preview?slug=${src}&w=${width}&q=${quality || `75`}`
}

const Image: React.FC<ImageProps> = (props) => {
    return <NextImage loader={imageKitLoader} {...props} />
}

export default Image
