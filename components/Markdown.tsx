import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import MDXComponents from './MDXComponents'
import rehypePrism from 'rehype-prism-plus'
import remarkMdx from 'remark-mdx'

export default async function Markdown({ content }) {
    // Compile the MDX source code to a function body
    console.log(content.value)
    const code = String(
        await compile(content, {
            outputFormat: `function-body`,
            rehypePlugins: [rehypePrism],
            remarkPlugins: [remarkMdx],
        }),
    )

    // You can then either run the code on the server, generating a server
    // component, or you can pass the string to a client component for
    // final rendering.

    // Run the compiled code with the runtime and get the default export
    const { default: MDXContent } = await run(code, {
        ...runtime,
        baseUrl: import.meta.url,
    })

    // Render the MDX content, supplying the ClientComponent as a component
    return <MDXContent components={MDXComponents} />
}
