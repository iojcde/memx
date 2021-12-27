import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const Toggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  const toggle = () => {
    if (theme == `light`) {
      setTheme(`dark`)
    } else {
      setTheme(`light`)
    }
  }

  if (theme != undefined) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="rounded-md p-2"
        aria-hidden
      >
        {theme === `dark` ? <HiSun color="white" /> : <HiMoon />}
      </button>
    )
  } else {
    return null
  }
}

export default Toggle
