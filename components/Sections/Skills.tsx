const SkillsSection = ({ sectionRef }) => {
  return (
    <div className=" overflow-hidden text-black " ref={sectionRef}>
      <div className="wrapper float-right mt-8 w-full max-w-7xl bg-violet-300 p-2 lg:mt-16 lg:p-8">
        <h2 className="text-5xl leading-tight lg:text-6xl"> Skills</h2>

        <ul className="flex flex-col gap-1 text-lg">
          <li>Go</li>
          <li>TypeScript</li>
          <li>JavaScript</li>
          <li>Next.js</li>
          <li>TailiwndCSS</li>
          <li>React</li>
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
  )
}
export default SkillsSection
