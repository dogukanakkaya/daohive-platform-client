import { TOAST_AUTO_CLOSE } from '@/config'
import { Dispatch, SetStateAction } from 'react'
import { Icons, toast } from 'react-toastify'

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

export const withLoadingToastr = <T extends (...args: any[]) => Promise<any>>(fn: T) => async (...args: Parameters<T>) => {
  const toastId = toast.loading('Action in progress, please wait...', { type: 'default' })

  try {
    await fn(...args)
    toast.update(toastId, { type: 'success', render: 'Action completed successfully.', icon: Icons.success, autoClose: TOAST_AUTO_CLOSE, isLoading: false })
  } catch (error: any) {
    toast.update(toastId, { type: 'error', render: error.message, icon: Icons.error, autoClose: TOAST_AUTO_CLOSE, isLoading: false })
  }
}