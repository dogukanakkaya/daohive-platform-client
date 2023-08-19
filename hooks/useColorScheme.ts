import { useEffect, useMemo, useState } from 'react'

type ColorScheme = 'dark' | 'light'

export default function useColorScheme(): ColorScheme {
  const mediaQuery = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)'), [])
  const [state, setState] = useState<ColorScheme>(mediaQuery.matches ? 'dark' : 'light')

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => setState(event.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return state
}