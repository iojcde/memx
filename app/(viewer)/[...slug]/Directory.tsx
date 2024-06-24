import Link from 'next/link'
import filemap from 'assets/filemap.json'
import TopContext from './TopContext'
import tree from 'assets/tree.json'
const DirectoryPage = ({ files, cwd }) => {
    const context = cwd.split(`/`).slice(0, -1).join(`/`)

    return (
        <>
            <TopContext
                title={filemap[cwd + `/`]}
                tree={tree}
                context={context}
            />

            <div className="relative mb-16 mt-16 w-full max-w-4xl flex-col items-start justify-center px-6 lg:mt-0 lg:px-8">
                {` `}

                <h1 className="mt-4 text-3xl font-semibold capitalize text-neutral-800 dark:text-neutral-200 lg:text-4xl">
                    {filemap[cwd + `/`]}
                </h1>

                <p className="mt-4">{files.length} items under this folder.</p>

                <div className="apply-prose mt-8 flex flex-col gap-2">
                    {files.map((f) => (
                        <Link className="text-lg" key={f} href={cwd + `/` + f}>
                            {f}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DirectoryPage
