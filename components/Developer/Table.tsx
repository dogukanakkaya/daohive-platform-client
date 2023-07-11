'use client'
import { ApiCredentialResponse } from '@/modules/developer'

interface Props {
  apiCredentials: ApiCredentialResponse<'id' | 'name' | 'permissions' | 'active' | 'expires_at' | 'created_at'>[]
}

export default function Table({ apiCredentials }: Props) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Secret</th>
          <th scope="col" className="px-6 py-3">Permissions</th>
          <th scope="col" className="px-6 py-3">Active</th>
          <th scope="col" className="px-6 py-3">Expires at</th>
          <th scope="col" className="px-6 py-3">Created at</th>
        </tr>
      </thead>
      <tbody>
        {apiCredentials.map(credential => (
          <tr key={credential.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{credential.name}</td>
            <td className="px-6 py-4">**************************** <i className="bi bi-eye text-lg"></i></td>
            <td className="px-6 py-4">{credential.permissions}</td>
            <td className="px-6 py-4">{credential.active}</td>
            <td className="px-6 py-4">{credential.expires_at}</td>
            <td className="px-6 py-4">{credential.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
