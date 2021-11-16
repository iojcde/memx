import { HiSun, HiMoon } from 'react-icons/hi'
import { useState } from 'react'
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
  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="rounded-md p-2 bg-secondary"
      >
        {theme === `dark` ? <HiSun color="white" /> : <HiMoon />}
      </button>
    </>
  )
}

export default Toggle
