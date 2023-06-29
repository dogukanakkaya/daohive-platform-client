import { ARWEAVE_URL, BLOCKCHAIN_SERVICE_URL } from '@/config'
import axios from 'axios'

export const services = {
  arweave: axios.create({ baseURL: ARWEAVE_URL }),
  blockchain: axios.create({
    baseURL: BLOCKCHAIN_SERVICE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

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