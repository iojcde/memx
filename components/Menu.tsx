///wip
const Menu = () => {
  return (
    <>
      <div className="menu-overlay fixed h-screen w-screen"></div>
      <button
        className="group fixed top-10 right-[3.3rem] flex items-center justify-end sm:top-11 lg:top-[3.3rem] lg:w-16"
        id="burger-container"
        data-cursor="-menu"
        data-cursor-stick="#burger"
      >
        <div id="burger" className="relative w-[25px] space-y-[4px]">
          <span />
          <span />
        </div>
      </button>
    </>
  )
}
export default Menu
