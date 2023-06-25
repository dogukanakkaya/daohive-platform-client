import { VoterGroupSelect } from '@/app/(dashboard)/voters/types'
import Link from 'next/link'
import React from 'react'

interface Props {
  group: VoterGroupSelect
}

export default function GroupCard({ group }: Props) {
  return (
    <Link href={`/voters/groups/${group.id}`}>
      <div className="w-60 h-32 shadow rounded bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 flex-center">
        <h3>{group.name}</h3>
      </div>
    </Link>
  )
}
