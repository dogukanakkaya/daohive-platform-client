import { API_URL } from '@/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000', // API_URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})