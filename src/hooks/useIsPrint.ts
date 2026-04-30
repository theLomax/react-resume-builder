import { useState, useEffect } from 'react'

export function useIsPrint() {
  const [isPrint, setIsPrint] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('print')
    setIsPrint(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsPrint(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isPrint
}