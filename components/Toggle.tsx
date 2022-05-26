import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const Toggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const toggle = () => {
    if (theme == `light`) {
      setTheme(`dark`)
    } else {
      setTheme(`light`)
    }
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={toggle}
      className="h-8 w-8 rounded-md p-2"
      aria-hidden
    >
      {mounted &&
        (theme === `dark` ? (
          <HiSun size="20" color="white" />
        ) : (
          <HiMoon size="20" />
        ))}
    </button>
  )
}

export default Toggle
