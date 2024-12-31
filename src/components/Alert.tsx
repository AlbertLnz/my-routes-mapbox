import { useEffect, useState } from 'react'
import '../styles/alert.css'

type Props = {
  seconds: number
  children: React.ReactNode
}

export const Alert = ({ seconds, children }: Props) => {
  const [isVisible, setIsVisible] = useState(true)

  const hideAlert = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideAlert()
      }, seconds * 1000)
      return () => clearTimeout(timer)
    }
  }, [seconds, isVisible])

  return (
    <div id='alert' className={isVisible ? 'show' : 'hide'}>
      {children}
    </div>
  )
}
