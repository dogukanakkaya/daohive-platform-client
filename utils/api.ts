import { API_URL, LEGACY_API_URL } from '@/config'
import axios from 'axios'

export const legacyApi = axios.create({
  baseURL: LEGACY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})