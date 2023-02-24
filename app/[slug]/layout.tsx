import { Sidebar } from 'components/Sidebar'

const Layout = ({ children }) => (
  <div className="flex">
    <div
      style={{ height: `calc(100vh - 64px)` }}
      className="sticky top-16 hidden shrink-0 border-r border-gray-200 dark:border-gray-800 lg:block"
    >
      <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
        <Sidebar
          tree={[
            {
              title: `hi`,
              nav_title: `hi`,
              collapsible: false,
              collapsed: false,
              label: `hello`,
              urlPath: `/hi`,
              children: [],
            },
          ]}
        />
      </div>
      {/* <div className="dark:from-gray-950/0 dark:to-gray-950/100 absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100" />
      <div className="dark:from-gray-950/0 dark:to-gray-950/100 absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100" /> */}
    </div>
    {children}
  </div>
)
export default Layout
