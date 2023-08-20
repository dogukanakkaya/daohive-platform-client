import { useState } from 'react'
import { z } from 'zod'

type FormErrors<T> = Record<keyof T, string> | { [key: string]: string }

const INITIAL_ERROR_STATE = Object.freeze({})

export default function useFormValidation<T = Record<string, unknown>>(initialState: T, schema: z.Schema) {
  const [state, setState] = useState<T>(initialState)
  const [errors, setErrors] = useState<FormErrors<T>>(INITIAL_ERROR_STATE)

  const validateForm = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    try {
      await schema.parseAsync(state)
      setErrors(INITIAL_ERROR_STATE)
    } catch (error: any) {
      const { fieldErrors } = (error as z.ZodError).flatten()
      setErrors({ ...errors, [e.target.name]: fieldErrors[e.target.name]?.[0] || '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let _value: unknown = value

    if (!(e.target instanceof HTMLTextAreaElement) && e.target.multiple) {
      const el = e.target as HTMLSelectElement
      _value = Array.from(el.selectedOptions).map(o => o.value)
    }

    setState(prevState => ({ ...prevState, [name]: _value }))
  }

  const reset = () => {
    setState(initialState)
    setErrors(INITIAL_ERROR_STATE)
  }

  const isFormValid = Object.values(errors).every(error => !error)

  return { state, setState, errors, isFormValid, validateForm, handleChange, reset }
}