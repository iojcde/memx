import glob from 'tiny-glob';
import path from 'path';
import fs from 'fs';
import type { DirectoryNode, TreeNode } from 'types/TreeNode'
import { read } from 'to-vfile';

const root_folder = 'data';


const addOldRedirection = (oldSlug: string, newSlug: string) => {
    const data = JSON.parse(fs.readFileSync('./assets/redirects.json', 'utf-8'));

    data[oldSlug] = newSlug;

    fs.writeFileSync('./assets/redirects.json', JSON.stringify(data, null, 2), 'utf-8');

    console.log(`slug change detected: added redirection from ${oldSlug} to ${newSlug}`);
}

const getMetadata = (filePath: string, lines: number = 3) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const currentSlug = content.match(/slug: (.*)/)?.[1]

    const newSlug = filePath.split('/').pop()?.replace('.md', '').replace(' ', '-') as string;

    if (currentSlug && currentSlug !== newSlug) {
        addOldRedirection(currentSlug, newSlug);

        if (content.includes('---')) {
            const newContent = content.replace(`slug: ${currentSlug}`, `slug: ${newSlug}`);
            fs.writeFileSync(filePath, newContent, 'utf-8');
        } else {
            const newContent = `---\nslug: ${newSlug}\n---\n${content}`;
            fs.writeFileSync(filePath, newContent, 'utf-8')
        }


    } else if (!currentSlug) {
        console.log(`no slug detected: adding slug ${newSlug} for ${filePath}`);

        if (content.includes('---')) {
            const newContent = content.replace('---', `slug: ${newSlug}\n---`);
            fs.writeFileSync(filePath, newContent, 'utf-8');
        } else {
            const newContent = `---\nslug: ${newSlug}\n---\n${content}`;
            fs.writeFileSync(filePath, newContent, 'utf-8')
        }
    }

    return {
        title: filePath.split('/').pop()?.replace('.md', '') as string,
        slug: newSlug,
        // ignore frontmatter from excerpt for number lines
        excerpt: content.split('---').slice(2, lines + 2).join('').trim().split('\n').slice(0, lines).join('\n')
    }
};

const buildTree = async (): Promise<DirectoryNode> => {


    const files = await glob(root_folder + '/**/*.md');
    const tree: DirectoryNode = { type: 'dir', name: 'data', slug: '', children: [] };

    files.forEach(file => {
        // Remove the root folder part from the file path
        const relativePath = path.relative(root_folder, file);
        const parts = relativePath.split(path.sep); // Split the relative path into parts
        let current: DirectoryNode = tree; // Start at the root of the tree

        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                // Last part is a file
                const meta = getMetadata(file);

                current.children.push({ type: 'file', name: part, excerpt: meta.excerpt, slug: meta.slug, });
            } else {
                // Directory part
                let nextDir = current.children.find(child => child.type === 'dir' && child.name === part) as DirectoryNode;
                if (!nextDir) {
                    nextDir = { type: 'dir', name: part, slug: part.replaceAll(' ', '-'), children: [], };
                    current.children.push(nextDir);
                }
                current = nextDir; // Move deeper into the tree
            }
        });
    });



    return tree;
};

const mapFiles = (tree) => {
    const traverse = (node: TreeNode, parentSlug: string = '', parentName: string = '') => {
        if (node.type === 'file') {
            node.slug = parentSlug;
            node.name = parentName;
            return node;
        } else {
            return node.children.flatMap(child => traverse(child,
                parentSlug ? `${parentSlug}/${child.slug}` : child.slug,
                parentName ? `${parentName}/${child.name}` : child.name))
        }


    }

    const allFiles = traverse(tree);
    //make into slug:title map
    const fileMap = allFiles.reduce((acc, file) => {
        acc[file.slug] = file.name;
        return acc;
    }, {});

    fs.writeFileSync('./assets/filemap.json', JSON.stringify(fileMap, null, 2), 'utf-8');
    console.log(`File map saved to ./assets/filemap.json`);
}

const mapBacklinks = async () => {
    const filemap = JSON.parse(fs.readFileSync('./assets/filemap.json', 'utf-8'));
    const backlinks = {};

    Object.keys(filemap).flatMap(slug => {
        const content = fs.readFileSync(`./data/${filemap[slug]}`, 'utf-8');

        const links = String(content).match(/\[\[(.*?)\]\]/g) || [];

        links.forEach(link => {
            const mentioned = link.match(/\[\[(.*?)(?:\|.*)?\]\]/)[1].trim();

            // search in values of filemap, including relative files
            const [mentionedSlug, _] = Object.entries(filemap)
                .find(([key, value]: [string, string]) => (value === `${mentioned}.md` ||
                    (value.split('/').slice(0, -1).join('/') == filemap[slug].split('/').slice(0, -1).join('/') &&
                        value.split('/').pop()?.replace('.md', '') === mentioned.split('/').pop()))

                ) ?? [];


            if (mentionedSlug) {
                backlinks[mentionedSlug] = [...backlinks[mentionedSlug] ?? [], slug];
                return
            }

            console.log(`warning: found broken backlink [[${mentioned}]] in ${filemap[slug]}`)
        })
    })

    fs.writeFileSync('./assets/backlinks.json', JSON.stringify(backlinks, null, 2), 'utf-8');
    console.log(`Backlinks saved to ./assets/backlinks.json`);
}


const saveTreeToFile = (tree: DirectoryNode, filePath: string): void => {
    const treeJson = JSON.stringify(tree, null, 2);
    fs.writeFileSync(filePath, treeJson, 'utf-8');
    console.log(`Tree structure saved to ${filePath}`);
};

(async function () {
    const tree = await buildTree();
    saveTreeToFile(tree, './assets/tree.json');

    mapFiles(tree);

    mapBacklinks();
})();
