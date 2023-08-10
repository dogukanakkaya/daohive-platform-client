'use client'
import { useState } from 'react'
import LoadingOverlay from '../LoadingOverlay'
import { useFormValidation } from '@/hooks'
import Button from '../Button'
import { ApiCredentialSchema, ApiPermissionResponse, developerQuery } from '@/modules/developer'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import { nullifyEmpty } from '@/utils/parser'
import { useRouter } from 'next/navigation'

interface Props {
  permissions: ApiPermissionResponse<'id' | 'name' | 'description'>[]
}

export default function DeveloperForm({ permissions }: Props) {
  const [loading, setLoading] = useState(false)
  const {
    state: { name, expiresAt, permissionIds },
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation({ name: '', expiresAt: '', permissionIds: [] as number[] }, ApiCredentialSchema)
  const router = useRouter()

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    const newPermissionIds = checked ? [...permissionIds, Number(value)] : permissionIds.filter(id => id !== Number(value))
    handleChange({ target: { name: 'permissionIds', value: newPermissionIds } } as any)
  }

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    await developerQuery().createApiCredential({
      expires_at: nullifyEmpty(expiresAt),
      name,
      permissionIds
    })

    router.refresh(); router.replace('/developer/api')
  }), setLoading)

  return (
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-xl shadow">
      {loading && <LoadingOverlay />}
      <div className="mb-4">
        <label className="form-label">API Key Name <span className="text-xs text-red-500">*</span></label>
        <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter api key name" autoFocus />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
      </div>
      <div className="mb-4">
        <label className="form-label">Expiry Date <span className="text-xs">(Never expires if you don&apos;t enter)</span></label>
        <input value={expiresAt} onChange={handleChange} onBlur={validateForm} className="form-input" type="date" name="expiresAt" />
        <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.expiresAt}</small>
      </div>
      <div className="mb-4">
        <h3 className="section-text text-xl mb-2">Permissions</h3>
        <div className="md:flex items-center flex-wrap">
          {permissions.map(permission => (
            <div key={permission.name} className="w-1/2 xl:w-1/4">
              <label className="flex items-center gap-2" htmlFor={`checkbox-${permission.name}`}>
                <input value={permission.id} onChange={handlePermissionChange} checked={permissionIds.includes(permission.id)} className="w-4 h-4 form-input" id={`checkbox-${permission.name}`} type="checkbox" name="permissionIds" /> {permission.name}
              </label>
              <p>{permission.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Button onClick={handleSubmit} isEnabled={isFormValid} className="flex items-center gap-2">Create API Key <i className="bi bi-plus text-lg"></i></Button>
      </div>
    </div>
  )
}
