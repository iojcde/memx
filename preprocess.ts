import glob from 'tiny-glob';
import path from 'path';
import fs from 'fs';
import type { DirectoryNode } from 'types/TreeNode'

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

    const newSlug = filePath.split('/').pop()?.replace('.md', '').replace(' ', '-').toLowerCase() as string;

    if (currentSlug && currentSlug !== newSlug) {
        addOldRedirection(currentSlug, newSlug);


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
        excerpt: content.split('---').slice(2, lines + 2).join('---'),
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

const saveTreeToFile = (tree: DirectoryNode, filePath: string): void => {
    const treeJson = JSON.stringify(tree, null, 2);
    fs.writeFileSync(filePath, treeJson, 'utf-8');
    console.log(`Tree structure saved to ${filePath}`);
};

(async function () {
    const tree = await buildTree();
    saveTreeToFile(tree, './assets/tree.json');
})();