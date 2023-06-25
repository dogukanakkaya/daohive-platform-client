import { ChangeEvent, useState } from 'react'
import { z } from 'zod'

type FormErrors = Record<string, string>;

const INITIAL_ERROR_STATE = Object.freeze({ _: '_' })

export default function useFormValidation<T = Record<string, unknown>>(initialState: T, schema: z.Schema) {
  const [state, setState] = useState<T>(initialState)
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERROR_STATE)

  const validateForm = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    try {
      await schema.parseAsync(state)
      setErrors({})
    } catch (error: any) {
      const formattedErrors = error.format()
      setErrors({ ...errors, [e.target.name]: formattedErrors[e.target.name]?._errors[0] || '' })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, multiple } = e.target
    let _value: unknown = value

    if (multiple) {
      const el = e.target as HTMLSelectElement
      _value = Array.from(el.selectedOptions).map(o => o.value)
    }

    setState(prevState => ({ ...prevState, [name]: _value }))
  }

  const reset = () => {
    setState(initialState)
    setErrors(INITIAL_ERROR_STATE)
  }

  const isFormValid = Object.values(errors).every((error) => !error)

  return { state, errors, isFormValid, validateForm, handleChange, reset }
}