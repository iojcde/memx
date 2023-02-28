import { Research } from 'contentlayer/generated'
import { TreeNode } from 'types/TreeNode'

export const buildResearchTree = (notes: Research[]): TreeNode[] => {
  return notes.map<TreeNode>((note) => ({
    nav_title: note.title ?? null,
    title: note.title,
    label: null,
    excerpt: note.body.raw.slice(0, 40) ?? null,
    urlPath: `/${note.hex}`,
    collapsible: false,
    collapsed: false,
    children: [],
  }))
}
