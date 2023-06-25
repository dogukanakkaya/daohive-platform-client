'use client'
import { useRouter } from 'next/navigation'
import Button, { Variant } from './Button'
import { useState } from 'react'

export default function Refresh() {
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setRefreshing(true) // @todo: need this to be set to false again after refresh could not find a way atm
    router.refresh()
  }

  return (
    <Button onClick={handleClick} variant={Variant.Secondary} className="flex items-center shadow-lg">
      <i className={`bi bi-arrow-repeat text-lg ${refreshing ? 'animate-spin' : ''}`}></i> <span className="border-l ml-2 pl-2 dark:border-gray-700">Refresh</span>
    </Button>
  )
}