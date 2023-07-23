import { BLOCKCHAIN_SERVICE_URL } from '@/config'
import axios from 'axios'

export const services = {
  blockchain: axios.create({
    baseURL: BLOCKCHAIN_SERVICE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    withCredentials: true
  })
}