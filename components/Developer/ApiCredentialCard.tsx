'use client'
import { ApiCredentialResponse, ApiPermissionResponse } from '@/modules/developer'
import Button from '../Button'
import Tooltip from '../Tooltip'

interface Props {
  apiCredentials: ApiCredentialResponse<'id' | 'name' | 'expires_at' | 'created_at'>[]
  apiPermissions: ApiPermissionResponse<'name' | 'description'>[]
}

export default function ApiCredentialCard({ apiCredentials, apiPermissions }: Props) {
  return (
    <>
      {apiCredentials.map(credential => (
        <div key={credential.id} className="p-5 relative bg-white dark:bg-gray-900 shadow-lg rounded-lg space-y-4">
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
          <div className="md:flex items-center justify-between flex-wrap">
            {apiPermissions.map(permission => {
              // @ts-ignore @todo: no way to extract relation types from supabase generated types, maybe manual union? think on it
              const hasPermission = credential.api_credential_api_permissions.find(credentialPermission => credentialPermission.api_permissions.name === permission.name)

              return (
                <div key={permission.name} className="w-1/2">
                  <label className="flex items-center gap-2" htmlFor={`checkbox-${permission.name}`}>
                    <input checked={hasPermission} id={`checkbox-${permission.name}`} type="checkbox" className="w-4 h-4 form-input" /> {permission.name}
                  </label>
                  <p>{permission.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
