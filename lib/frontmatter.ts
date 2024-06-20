declare module 'vfile' {
    interface DataMap {
        frontmatter: { [key: string]: unknown } & {
            title: string
        } & Partial<{
                tags: string[]
                aliases: string[]
                description: string
                publish: boolean
                draft: boolean
                lang: string
                enableToc: string
                cssclasses: string[]
            }>
    }
}
