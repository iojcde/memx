const SkillsSection = ({ sectionRef }) => {
  return (
    <div className=" overflow-hidden text-black " ref={sectionRef}>
      <div className="wrapper float-right mt-8 w-full max-w-2xl bg-violet-300 p-4 lg:mt-16 lg:max-w-7xl lg:p-8">
        <h2 className="text-5xl leading-tight lg:text-6xl"> Skills</h2>
        <div className="grid grid-cols-2 lg:grid-cols-1">
          <ul className="flex flex-col gap-1 text-lg">
            <li>Go</li>
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>Next.js</li>
            <li>TailiwndCSS</li>
            <li>React</li>
          </ul>
          <ul className="flex flex-col gap-1 text-lg">
            <li>Rust</li>
            <li>Python</li>
            <li>
              Linux{` `}
              <span className="text-gray-500 line-through ">
                (I use arch btw)
              </span>
            </li>
            <li>GraphQL</li>
            <li>Kubernetes</li>
            <li>Git</li>
            <li>...more</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default SkillsSection
