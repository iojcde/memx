import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { ReactNode } from 'react'
import { isExternal } from 'util/types'

interface Props {
    children: ReactNode
    href: string
    className?: string
}

const CustomLink = (props: Props) => {
    const href = props.href
    const isBacklink =
        href &&
        props.className?.includes(`internal`) &&
        props.href.startsWith(`/`)

    if (isExternal(href)) {
        return <a target="_blank" rel="noopener noreferrer" {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const RoundedImage = (props: ImageProps) => {
    return <Image className=" rounded-lg" {...props} />
}

const MDXComponents = {
    Image: RoundedImage,
    a: CustomLink,
    div: (props) => <div id="fuck" {...props} />,
}

export default MDXComponents
