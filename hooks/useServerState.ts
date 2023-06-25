import { useEffect, useState } from 'react'

export default function useServerState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState)

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  return [state, setState]
}