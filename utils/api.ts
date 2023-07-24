import { LEGACY_API_URL } from '@/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: LEGACY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})