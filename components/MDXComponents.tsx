import Link from 'next/link'
import Image from 'next/image'
import { ImageProps } from 'next/image'

const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith(`/`) || href.startsWith(`#`))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const RoundedImage = (props: ImageProps) => {
  return <Image alt={props.alt} className="rounded-xl" {...props} />
}

const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
}

export default MDXComponents
