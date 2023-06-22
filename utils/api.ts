import { API_URL } from '@/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const toQueryString = (query: QueryParams) => {
  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.append(key, value)
    }
  })

  return params.toString()
}

export interface SuccessResponse<T> {
  data: T;
}

export type QueryParams = Record<string, string | string[]>;