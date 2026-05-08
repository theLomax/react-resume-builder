import { useState, useEffect } from 'react'

export function useDarkMode() {
	const [dark, setDark] = useState(() =>
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)')
		const handler = (e: MediaQueryListEvent) => setDark(e.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [])

	return dark
}
