import { useEffect, useMemo, useState } from 'react'

type ColorScheme = 'dark' | 'light'

export default function useColorScheme(): ColorScheme {
  const [state, setState] = useState<ColorScheme>('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setState(mediaQuery.matches ? 'dark' : 'light')
    const handleChange = (event: MediaQueryListEvent) => setState(event.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return state
}