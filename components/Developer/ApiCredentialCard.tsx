'use client'
import { ApiCredentialResponse, ApiPermissionResponse } from '@/modules/developer'
import Button from '../Button'
import Tooltip from '../Tooltip'
import { useRef, useState } from 'react'

interface ApiCredentialApiPermissions {
  api_credential_api_permissions: {
    api_permissions: ApiPermissionResponse<'name' | 'description'> | null
  }[]
}

interface Props {
  credential: ApiCredentialResponse<'id' | 'secret' | 'name' | 'expires_at' | 'created_at'> & ApiCredentialApiPermissions
  permissions: ApiPermissionResponse<'name' | 'description'>[]
}

export default function ApiCredentialCard({ credential, permissions }: Props) {
  const [showSecret, setShowSecret] = useState(false)

  const handleShowSecret = () => {
    setShowSecret(true)

    setTimeout(() => {
      setShowSecret(false)
    }, 10000)
  }

  return (
    <div key={credential.id} className="p-5 relative bg-white dark:bg-gray-900 shadow-lg rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">{credential.name}</h1>
        <div className="flex items-center gap-4">
          {<span className="text-sm">Expires at: <b className="font-semibold">{credential.expires_at ?? 'Never'}</b></span>}
          <Button className="bg-red-600">Delete <i className="bi bi-trash text-lg"></i></Button>
        </div>
      </div>
      <div>
        <h3 className="flex items-center gap-2 h-[30px]">
          API Key:&nbsp;
          <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
            <span onClick={() => navigator.clipboard.writeText(credential.secret)} className={`cursor-pointer text-sm font-semibold ${!showSecret ? 'tracking-wider' : ''}`}>
              {!showSecret ? '********************************' : credential.secret}
            </span>
          </Tooltip>
          {!showSecret && <i onClick={handleShowSecret} className="bi bi-eye text-lg cursor-pointer"></i>}
        </h3>
      </div>
      <div className="border-t dark:border-gray-600">
        <h3 className="section-title mb-2">Permissions</h3>
        <div className="md:flex items-center justify-between flex-wrap">
          {permissions.map(permission => {
            const hasPermission = credential.api_credential_api_permissions.findIndex(credentialPermission => credentialPermission.api_permissions?.name === permission.name)

            return (
              <div key={permission.name} className="w-1/2">
                <label className="flex items-center gap-2" htmlFor={`checkbox-${permission.name}`}>
                  <input checked={hasPermission !== -1} id={`checkbox-${permission.name}`} type="checkbox" className="w-4 h-4 form-input" /> {permission.name}
                </label>
                <p>{permission.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
