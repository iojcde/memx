import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from 'next-themes'

const Toggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    if (theme == `light`) {
      setTheme(`dark`)
    } else {
      setTheme(`light`)
    }
  }
  if (theme != undefined) {
    return (
      <>
        <button
          type="button"
          onClick={toggle}
          className="rounded-md p-2 bg-secondary"
          aria-hidden
        >
          {theme === `dark` ? <HiSun color="white" /> : <HiMoon />}
        </button>
      </>
    )
  } else {
    return <div className="rounded-md p w-8 p-2 h-8 bg-secondary" />
  }
}

export default Toggle
