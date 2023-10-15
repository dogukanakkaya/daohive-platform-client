'use client'
import { useState } from 'react'
import Button, { Variant } from '../Button'
import Dialog from '../Dialog'
import LoadingOverlay from '../LoadingOverlay'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase.types'
import { useRouter } from 'next/navigation'
import { cookieOptions } from '@/config'

export default function PrivacySecurity() {
  const supabase = createClientComponentClient<Database>({ cookieOptions })
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [confirmType, setConfirmType] = useState('')
  const router = useRouter()

  const handleDeleteAccount = async () => {
    const { status } = await supabase.rpc('delete_user')
    if (status === 204) {
      router.push('/auth/logout')
    }
  }

  return (
    <div>
      <div className="w-max">
        <Button onClick={() => setDeleteAccount(true)} className="bg-red-600">Delete Account <i className="bi bi-person-x"></i></Button>
      </div>
      <Dialog title="Delete Account" isOpen={deleteAccount} setIsOpen={setDeleteAccount}>
        {false && <LoadingOverlay />}
        <div className="space-y-2">
          <p>All of your contracts, proposals, voters any other kind of data you have will be <b className="font-bold">deleted permanently</b>.</p>
          <div className="mb-4">
            <label className="form-label select-none">Type <b className="font-bold">DELETE</b> to confirm</label>
            <input value={confirmType} onChange={e => setConfirmType(e.target.value)} className="form-input" type="text" placeholder="DELETE" autoFocus />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button onClick={() => setDeleteAccount(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button isEnabled={confirmType === 'DELETE'} onClick={handleDeleteAccount}>Confirm <i className="bi bi-check-lg text-lg"></i></Button>
        </div>
      </Dialog>
    </div>
  )
}
