import { VoterGroupSelect } from '@/app/(dashboard)/voters/types'
import Link from 'next/link'
import React from 'react'
import Tooltip from '../Tooltip'

interface Props {
  group: VoterGroupSelect
  handleRemove: (id: number) => void
}

export default function GroupCard({ group, handleRemove }: Props) {
  return (
    <div className="relative w-60 h-32 shadow rounded-lg bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4">
      <Link href={`/voters/groups/${group.id}`} className="w-max">
        <h3 className="dark:hover:text-gray-100">{group.name} <i className="bi bi-box-arrow-in-up-right text-blue-500"></i></h3>
      </Link>
      <div className="absolute flex items-center right-4 top-4">
        <Tooltip text="Delete" position="top">
          <span onClick={() => handleRemove(group.id)} className="text-red-500 hover:text-red-600 cursor-pointer">
            <i className="bi bi-trash3"></i>
          </span>
        </Tooltip>
      </div>
    </div>
  )
}
