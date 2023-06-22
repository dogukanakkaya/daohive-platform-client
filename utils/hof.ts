import { Dispatch, SetStateAction } from 'react'

export const withLoading = <T extends (...args: any[]) => Promise<any>>(fn: T, setLoading: Dispatch<SetStateAction<boolean>>) => async (...args: Parameters<T>) => {
  setLoading(true)

  try {
    const result = await fn(...args)
    setLoading(false)
    return result
  } catch (error) {
    setLoading(false)
    throw error
  }
}