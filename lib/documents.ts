

import { read } from 'to-vfile'
import { process } from 'lib/markdown'
import tree from 'assets/tree.json'
import glob from 'tiny-glob'
import { TreeNode } from 'types/TreeNode'
import readingTime from 'reading-time'
import filemap from 'assets/filemap.json'
import type { VFile } from 'vfile'
import backlinks from 'assets/backlinks.json'

export async function getDocument({ slug }: { slug: string[] | string }) {
    if (typeof slug === 'string') slug = slug.split('/')

    const target = slug.map(s => decodeURIComponent(s)).join('/')
    if (!filemap[target]) return null

    const file = 'data/' + filemap[target]
    try {
        const f = await process(await read(file))
        const path = f.history[0].replace('data/', '')

        f.data.title = path.split('/').pop().replace('.md', '')
        f.data.slug = path.replaceAll(' ', '-').replace('.md', '')
        f.data.readingTime = readingTime(f.value)
        f.data.rawpath = path

        return f

    } catch (err) {
        throw new Error(err)
    }
}


export const getAllDocuments = async () => {
    const files = await glob('data/' + '**/*.md')

    const docs = await Promise.all(files.map(async (file) => {
        const f: VFile = await process(await read(file))
        const path = f.history[0].replace('data/', '')

        f.data.title = path.split('/').pop().replace('.md', '')
        f.data.slug = path.replace(' ', '-').replace('.md', '')
        f.data.rawpath = path

        return f
    }))

    return docs
}

export const getBacklinks = async (slug: string) => {
    if (!backlinks[slug]) return []
    return await Promise.all(backlinks[slug].map(async (mentionedIn) => {
        const doc = await read(`data/${filemap[mentionedIn]}`)

        const linkedFile = filemap[slug].replace('.md', '')

        const line = String(doc.value).split('\n').find(line => {
            return line.includes(`[[${linkedFile}`) || line.includes(`[[${linkedFile.split('/').pop()}`)
        })

        // keep only 6 words around the linkconst wordsToKeep = 6;
        const wordsToKeep = 6;
        const mentionedFile = filemap[slug].replace('.md', '');

        let before: string, center: string, after: string;
        let regex = new RegExp(`\\[\\[(${mentionedFile}|${mentionedFile.split('/').pop()})(?:\\|(.*?))?\\]\\]`);
        let match = line?.match(regex);

        if (!line) {
            throw new Error(`Backlink not found in ${mentionedIn} for ${slug}`);

        }

        if (match) {
            let [fullMatch, fileName, displayName] = match;
            before = line.split(fullMatch)[0].split(' ').slice(-wordsToKeep).join(' ');
            center = displayName || fileName;
            after = line.split(fullMatch)[1].split(' ').slice(0, wordsToKeep).join(' ');
        } else {
            throw new Error(`Backlink not found in ${mentionedIn} for ${slug}`);
        }
        const text = `${before} [[${center}]] ${after}`;
        const title = doc.history[0].split('/').pop().replace('.md', '')

        return {
            title,
            url: doc.history[0].replace('data/', '').replace('.md', '').replaceAll(' ', '-'),
            text: text
        }


    })
    )
}
