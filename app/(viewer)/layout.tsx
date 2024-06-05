'use client'
import { Sidebar } from './Sidebar'
import tree from 'assets/tree.json'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div
        style={{ height: `calc(100vh - 64px)` }}
        className=" sticky top-16 hidden shrink-0 border-r border-neutral-200 dark:border-neutral-800 lg:block"
      >
        <div className=" -ml-3 h-full overflow-y-scroll p-8 pl-16">
          <Sidebar tree={tree} />
        </div>
      </div>
      {children}
    </div>
  )
}
export default Layout
