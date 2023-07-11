'use client'
import { ApiCredentialResponse } from '@/modules/developer'
import Button from '../Button'
import Tooltip from '../Tooltip'

interface Props {
  apiCredentials: ApiCredentialResponse<'id' | 'name' | 'expires_at' | 'created_at'>[]
}

export default function ApiCredentialCard({ apiCredentials }: Props) {
  return (
    <>
      {apiCredentials.map(credential => (
        <div key={credential.id} className="p-5 relative bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">{credential.name}</h1>
            <div className="flex items-center gap-4">
              {<span className="text-sm">Expires at: <b className="font-semibold">{credential.expires_at ?? 'Never'}</b></span>}
              <Button className="bg-red-600">Delete <i className="bi bi-trash text-lg"></i></Button>
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2">
              API Key:&nbsp;
              <Tooltip className="mt-2" text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
                <span className="cursor-pointer font-semibold">********************************</span>
              </Tooltip>
              <i className="bi bi-eye text-lg"></i>
            </h3>
          </div>
        </div>
      ))}
    </>
  )
}
