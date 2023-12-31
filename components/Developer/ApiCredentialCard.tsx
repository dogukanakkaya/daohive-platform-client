'use client'
import { ApiCredentialApiPermissions, ApiCredentialResponse, ApiPermissionResponse, DecryptedSecret, developerQuery } from '@/modules/developer'
import Button from '../Button'
import Tooltip from '../Tooltip'
import { useState } from 'react'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { useRouter } from 'next/navigation'
import LoadingOverlay from '../LoadingOverlay'
import { DateTime } from 'luxon'

export interface Props {
  credential: ApiCredentialResponse<'id' | 'name' | 'expires_at' | 'created_at'> & { decrypted_secret: DecryptedSecret } & ApiCredentialApiPermissions<'name' | 'description'>
  permissions: ApiPermissionResponse<'name' | 'description'>[]
}

export default function ApiCredentialCard({ credential, permissions }: Props) {
  const [showSecret, setShowSecret] = useState(false)
  const [loading, setLoading] = useState(false)
  const [remove, setRemove] = useState('')
  const router = useRouter()
  const { deleteApiCredential } = developerQuery()

  const handleShowSecret = () => {
    setShowSecret(true)

    setTimeout(() => {
      setShowSecret(false)
    }, 5000)
  }

  const handleRemove = remove === credential.id ? withLoading(withLoadingToastr(async () => {
    setRemove('')
    await deleteApiCredential(credential.id)
    router.refresh()
  }), setLoading) : () => setRemove(credential.id)

  return (
    <div key={credential.id} className="p-5 relative bg-white dark:bg-gray-900 shadow-lg rounded-lg space-y-4">
      {loading && <LoadingOverlay />}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">{credential.name}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Expires at:&nbsp;
            <b className="font-semibold">
              {credential.expires_at ? DateTime.fromISO(credential.expires_at).toFormat('yyyy-MM-dd') : 'Never'}
            </b>
          </span>
          {
            remove === credential.id
              ? <Button onClick={handleRemove} className="bg-red-600 flex items-center gap-1">Confirm <i className="bi bi-check-lg text-lg"></i></Button>
              : <Button onClick={handleRemove} className="bg-red-600 flex items-center gap-1">Delete <i className="bi bi-trash3 text-lg"></i></Button>
          }
        </div>
      </div>
      <div>
        <h3 className="flex items-center gap-2">
          API Key:
          <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>}>
            <span onClick={() => navigator.clipboard.writeText(credential.decrypted_secret)} className={`cursor-pointer text-sm font-semibold block max-w-[400px] break-words ${!showSecret ? 'mt-1 tracking-wider' : 'mt-0.5'}`}>
              {!showSecret ? '********************************' : credential.decrypted_secret}
            </span>
          </Tooltip>
          {!showSecret && <i onClick={handleShowSecret} className="bi bi-eye text-lg cursor-pointer"></i>}
        </h3>
      </div>
      <div className="border-t dark:border-gray-700">
        <h3 className="section-text mb-2">Permissions</h3>
        <div className="md:flex items-center justify-between flex-wrap space-y-4">
          {permissions.map(permission => {
            const hasPermission = credential.api_credential_api_permissions.findIndex(credentialPermission => credentialPermission.api_permissions?.name === permission.name)

            return (
              <div key={permission.name} className="w-1/2">
                <label className="flex items-center gap-2" htmlFor={`checkbox-${permission.name}`}>
                  <input onChange={() => { }} checked={hasPermission !== -1} className="w-4 h-4 form-input" id={`checkbox-${permission.name}`} type="checkbox" /> {permission.name}
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
