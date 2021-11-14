import nightwind from '@jcdea/nightwind/helper'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useState } from 'react'

const Toggle: React.FC = () => {
  const [dark, setDark] = useState(false)

  const toggle = () => {
    if (!document.documentElement.classList.contains(`dark`)) {
      setDark(true)
      nightwind.toggle()
    } else {
      setDark(false)
      nightwind.toggle()
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="rounded-md p-2 bg-secondary"
      >
        {dark === true ? <HiSun color="white" /> : <HiMoon />}
      </button>
    </>
  )
}

export default Toggle
