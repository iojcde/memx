import { allResearch, allBlogs } from 'contentlayer/generated'
import { TreeNode } from 'types/TreeNode'

export const buildTree = (): TreeNode[] => {
  const research = allResearch.map<TreeNode>((note) => ({
    title: note.title,
    excerpt: note.body.raw.slice(0, 40) ?? null,
    urlPath: `/${note.hex}`,
    collapsible: false,
    collapsed: false,
    children: [],
  }))

  const blog = allBlogs.map<TreeNode>((note) => ({
    title: note.title,
    excerpt: note.body.raw.slice(0, 40) ?? null,
    urlPath: `/${note.hex}`,
    collapsible: false,
    collapsed: false,
    children: [],
  }))

  return [
    { title: `blog`, children: blog, collapsible: true, urlPath: `/blog` },
    {
      title: `research`,
      children: research,
      collapsible: true,
      collapsed: true,
      urlPath: `/research`,
    },
  ]
}
