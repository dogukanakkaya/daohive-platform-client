import Link from 'next/link'
import React from 'react'
import Tooltip from '../Tooltip'
import { VoterGroupsResponse } from '@/modules/voter-group'

interface Props {
  group: VoterGroupsResponse[number]
  remove: number
  handleRemove: (id: number) => void
  handleEdit: (id: number) => void
}

export default function GroupCard({ group, remove, handleRemove, handleEdit }: Props) {
  return (
    <div className="relative w-60 h-32 shadow rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4">
      <h3 className="mr-12 dark:hover:text-gray-100">{group.name}</h3>
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
