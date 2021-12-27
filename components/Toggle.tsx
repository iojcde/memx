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
      className="rounded-md p-2 w-8 h-8"
      aria-hidden
    >
      {mounted && (theme === `dark` ? <HiSun color="white" /> : <HiMoon />)}
    </button>
  )
}

export default Toggle
