'use client'
import Button, { Variant } from '../Button'
import GroupCard from './GroupCard'
import { useState } from 'react'
import { useFormValidation, useEffectState } from '@/hooks'
import { VoterGroup } from '@/utils/zod/voter-group'
import Dialog from '../Dialog'
import { withLoadingToastr } from '@/utils/hof'
import { voterGroupQuery } from '@/queries'
import { VoterGroupsResponse } from '@/types/voter-group'
import { VotersResponse } from '@/types/voter'

interface Props {
  data: VoterGroupsResponse
  voters: VotersResponse
}

enum ActionType {
  Create = 'create',
  Edit = 'edit',
  Remove = 'remove',
}

export default function Group({ data: voterGroups, voters }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    state: { name, voterIds },
    setState: setGroupState,
    errors,
    handleChange,
    validateForm,
    isFormValid,
    reset
  } = useFormValidation({ name: '', voterIds: [] as number[] }, VoterGroup)
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
    const { name, voter_group_voters } = await voterGroupQuery().getVoterGroup(id, `
      id,name,
      voter_group_voters (voter_id)
    `)

    setGroupState({ name, voterIds: voter_group_voters.map(v => v.voter_id) })
    setAction({ id, type: ActionType.Edit })
    setIsDialogOpen(true)
  }

  const handleSubmit = withLoadingToastr(async () => {
    if (action.id) {
      await voterGroupQuery().updateVoterGroup(action.id, { name, voterIds })

      setData(data.map(voterGroup => voterGroup.id === action.id ? { ...voterGroup, name } : voterGroup))
    } else {
      const voterGroup = await voterGroupQuery().createVoterGroup({ name, voterIds })

      setData([...data, { ...voterGroup, name }])
    }

    setIsDialogOpen(false)
    reset()
    setAction({ id: 0, type: ActionType.Create })
  })

  const handleRemove = (id: number) => action.type === ActionType.Remove && action.id === id ? withLoadingToastr(async () => {
    await voterGroupQuery().deleteVoterGroup(id)
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
      <Dialog title={action.id ? `Edit "${name}" group` : 'Create new whitelist group'} isOpen={isDialogOpen}>
        <div className="mb-4">
          <label className="form-label">Group Name <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter Group Name" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Voters <span className="text-xs font-light">(Hold <b className="font-medium">CTRL</b> or <b className="font-medium">CMD</b> and click to select multiple)</span></label>
          <select value={voterIds as unknown as string[]} onChange={handleChange} className="form-input" multiple name="voterIds">
            {voters.map(voter => <option key={voter.id} value={voter.id}>{voter.name}</option>)}
          </select>
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.voterIds}</small>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button onClick={handleSubmit} isEnabled={isFormValid}>{action.id ? 'Update' : 'Create'}</Button>
        </div>
      </Dialog>
    </div>
  )
}
