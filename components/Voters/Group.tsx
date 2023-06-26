'use client'
import Button, { Variant } from '../Button'
import { VoterGroupSelect, VoterSelect } from '@/app/(dashboard)/voters/types'
import GroupCard from './GroupCard'
import { useState } from 'react'
import { useFormValidation, useEffectState } from '@/hooks'
import { VoterGroup } from '@/utils/zod/voter-group'
import Dialog from '../Dialog'
import { withLoadingToastr } from '@/utils/hof'
import { createVoterGroup, deleteVoterGroup, getVoterGroup, updateVoterGroup } from '@/queries/voter'

interface Props {
  data: VoterGroupSelect[]
  voters: VoterSelect[]
}

enum ActionType {
  Create = 'create',
  Edit = 'edit',
  Remove = 'remove',
}

export default function Group({ data: voterGroups, voters }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    state: { name, whitelist },
    setState: setGroupState,
    errors,
    handleChange,
    validateForm,
    isFormValid,
    reset
  } = useFormValidation({ name: '', whitelist: [] as string[] }, VoterGroup)
  const [data, setData] = useEffectState(voterGroups)
  const [action, setAction] = useState<{ id: number, type: ActionType }>({ id: 0, type: ActionType.Create })

  const handleCreate = () => {
    if (action.id) {
      setAction({ id: 0, type: ActionType.Create })
      reset()
    }
    setIsDialogOpen(true)
  }

  const handleEdit = async (id: number) => {
    const { name, whitelist } = await getVoterGroup(id)
    setGroupState({ name, whitelist })

    setAction({ id, type: ActionType.Edit })
    setIsDialogOpen(true)
  }

  const handleSubmit = withLoadingToastr(async () => {
    if (action.id) {
      await updateVoterGroup(action.id, { name, whitelist })

      setData(data.map(voterGroup => voterGroup.id === action.id ? { ...voterGroup, name } : voterGroup))
    } else {
      const voterGroup = await createVoterGroup({ name, whitelist })

      setData([...data, { ...voterGroup, name }])
    }

    setIsDialogOpen(false)
    reset()
    setAction({ id: 0, type: ActionType.Create })
  })

  const handleRemove = (id: number) => action.type === ActionType.Remove && action.id === id ? withLoadingToastr(async () => {
    await deleteVoterGroup(id)
    setData(data.filter(voter => voter.id !== id))
    setAction({ id: 0, type: ActionType.Create })
  })() : setAction({ id, type: ActionType.Remove })

  return (
    <div className="border-t-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold my-4">Whitelist Groups</h2>
        <Button onClick={handleCreate} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        {data.map(group => <GroupCard
          key={group.id}
          remove={action.type === ActionType.Remove ? action.id : 0}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          group={group}
        />)}
      </div>
      <Dialog title={action.id ? 'Create new whitelist group' : `Edit "${name}" group`} isOpen={isDialogOpen}>
        <div className="mb-4">
          <label className="form-label">Group Name <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Group Name" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Voters <span className="text-xs font-light">(Hold <b className="font-medium">CTRL</b> or <b className="font-medium">CMD</b> and click to select multiple)</span></label>
          <select value={whitelist} onChange={handleChange} className="form-input" multiple name="whitelist">
            {voters.map(voter => <option key={voter.id} value={voter.id}>{voter.name}</option>)}
          </select>
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.whitelist}</small>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button onClick={handleSubmit} isEnabled={isFormValid}>{action.id ? 'Update' : 'Create'}</Button>
        </div>
      </Dialog>
    </div>
  )
}
