import { BLOCKCHAIN_SERVICE_URL } from '@/config'
import axios from 'axios'

export const services = {
  default: axios.create(),
  blockchain: axios.create({
    baseURL: BLOCKCHAIN_SERVICE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    withCredentials: true
  })
}

services.blockchain.interceptors.response.use(
  (response) => response,
  (error) => {
    const retryStatuses = [503]
    if (retryStatuses.includes(error.response?.status)) {
      const retryDelay = error.response?.headers['Retry-After'] || 5

      return new Promise((resolve) => setTimeout(() => resolve(services.blockchain.request(error.config)), retryDelay * 1000))
    }
  }
)

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