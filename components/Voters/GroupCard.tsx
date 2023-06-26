import { VoterGroupSelect } from '@/app/(dashboard)/voters/types'
import Link from 'next/link'
import React from 'react'
import Tooltip from '../Tooltip'

interface Props {
  group: VoterGroupSelect
  remove: number
  handleRemove: (id: number) => void
  handleEdit: (id: number) => void
}

export default function GroupCard({ group, remove, handleRemove, handleEdit }: Props) {
  return (
    <div className="relative w-60 h-32 shadow rounded-lg bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4">
      <Link href={`/voters/groups/${group.id}`} className="w-max">
        <h3 className="mr-12 dark:hover:text-gray-100">{group.name}</h3>
      </Link>
      <div className="absolute flex items-center gap-2 right-4 top-4">
        <Tooltip text="Edit" position="top">
          <span onClick={() => handleEdit(group.id)} className="text-blue-500 hover:text-blue-600 cursor-pointer">
            <i className="bi bi-pencil-square"></i>
          </span>
        </Tooltip>
        <Tooltip text={remove === group.id ? 'Confirm' : 'Delete'} position="top">
          <span onClick={() => handleRemove(group.id)} className="text-red-500 hover:text-red-600 cursor-pointer">
            {remove === group.id ? <i className="bi bi-check-lg"></i> : <i className="bi bi-trash3"></i>}
          </span>
        </Tooltip>
      </div>
    </div>
  )
}
