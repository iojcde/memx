export type TreeNode = {
  title: string
  nav_title?: string
  label?: string
  urlPath: string
  children?: TreeNode[]
  collapsible?: boolean
  collapsed?: boolean
  excerpt?: string
}
