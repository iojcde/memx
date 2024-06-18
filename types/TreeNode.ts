export interface FileNode {
  type: 'file'
  name: string
  slug: string
  excerpt: string
}

export interface DirectoryNode {
  type: 'dir'
  name: string
  slug: string
  children: TreeNode[]
}

export type TreeNode = FileNode | DirectoryNode
