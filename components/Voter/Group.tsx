'use client'
import Button, { Variant } from '../Button'
import { useState } from 'react'
import { useFormValidation, useEffectState } from '@/hooks'
import Dialog from '../Dialog'
import { withLoadingToastr } from '@/utils/hof'
import GroupCard from './GroupCard'
import { VoterGroupResponse, VoterGroupSchema } from '@/modules/voter-group'
import { VoterResponse } from '@/modules/voter'
import ZeroRecord from '../ZeroRecord'
import SectionDivider from '../SectionDivider'
import { useLazyQuery, useMutation } from '@apollo/client'
import { gql } from '@/__generated__/graphql'

interface Props {
  data: VoterGroupResponse<'id' | 'name'>[]
  voters: VoterResponse<'id' | 'address' | 'name' | 'email'>[]
}

enum ActionType {
  Create = 'create',
  Edit = 'edit',
  Remove = 'remove',
}

export default function Group({ data: voterGroups, voters }: Props) {
  const {
    state: { name, voterIds },
    setState: setGroupState,
    errors,
    handleChange,
    validateForm,
    isFormValid,
    reset
  } = useFormValidation({ name: '', voterIds: [] as string[] }, VoterGroupSchema)
  const [data, setData] = useEffectState(voterGroups)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [action, setAction] = useState<{ id: string, type: ActionType }>({ id: '', type: ActionType.Create })

  const [execVoterGroup] = useLazyQuery(gql(`
    query GetVoterGroup ($id: ID!) {
      voterGroup(id: $id) {
        name,
        voters {
          id
        }
      }
    }
  `))

  const [createMutation] = useMutation(gql(`
    mutation CreateVoterGroup ($input: VoterGroupInput!) {
      createVoterGroup(input: $input) {
        id
      }
    }
  `))

  const [deleteMutation] = useMutation(gql(`
    mutation DeleteVoterGroup ($id: ID!) {
      deleteVoterGroup(id: $id)
    }
  `))

  const [updateMutation] = useMutation(gql(`
    mutation UpdateVoterGroup ($id: ID!, $input: VoterGroupInput!) {
      updateVoterGroup(id: $id, input: $input) {
        id
      }
    }
  `))

  const handleCreate = () => {
    if (action.id) {
      setAction({ id: '', type: ActionType.Create })
      reset()
    }
    setIsDialogOpen(true)
  }

  const handleEdit = async (id: string) => {
    const { data } = await execVoterGroup({ variables: { id } })
    if (!data) return
    const { name, voters } = data.voterGroup

    setGroupState({ name, voterIds: voters.map(v => v.id) })
    setAction({ id, type: ActionType.Edit })
    setIsDialogOpen(true)
  }

  const handleSubmit = withLoadingToastr(async () => {
    if (action.id) {
      // await updateVoterGroup(action.id, { name, voterIds })
      const { data: update } = await updateMutation({
        variables: { id: action.id, input: { name, voters: voterIds } }
      })
      if (!update) return
      setData(data.map(voterGroup => update.updateVoterGroup.id === action.id ? { ...voterGroup, name } : voterGroup))
    } else {
      const { data: create } = await createMutation({
        variables: { input: { name, voters: voterIds } }
      })
      if (!create) return
      setData([...data, { id: create.createVoterGroup.id, name }])
    }

    setIsDialogOpen(false)
    reset()
    setAction({ id: '', type: ActionType.Create })
  })

  const handleRemove = (id: string) => action.type === ActionType.Remove && action.id === id ? withLoadingToastr(async () => {
    setAction({ id: '', type: ActionType.Create })
    await deleteMutation({ variables: { id } })
    setData(data.filter(voter => voter.id !== id))
  })() : setAction({ id, type: ActionType.Remove })

  return (
    <div>
      <SectionDivider>
        <h1 className="section-text">Groups</h1>
        <Button onClick={handleCreate} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
      </SectionDivider>
      {data.length === 0 && (
        <ZeroRecord title="No voter group found">
          <p>Seems like you don&apos;t have any voter group created yet. <span onClick={handleCreate} className="underline text-primary">Click here</span> to create one.</p>
        </ZeroRecord>
      )}
      <div className="flex items-center flex-wrap gap-4">
        {data.map(group => <GroupCard
          key={group.id}
          remove={action.type === ActionType.Remove ? action.id : ''}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          group={group}
        />)}
      </div>
      <Dialog title={action.id ? `Edit "${name}" group` : 'Create new whitelist group'} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <div className="mb-4">
          <label className="form-label">Group Name <span className="text-xs text-red-500">*</span></label>
          <input value={name} onChange={handleChange} onBlur={validateForm} className="form-input" type="text" name="name" placeholder="Enter group name" autoFocus />
          <small className="mt-2 text-xs text-red-600 dark:text-red-500">{errors.name}</small>
        </div>
        <div className="mb-4">
          <label className="form-label">Voters <span className="text-xs font-light">(Hold <b className="font-medium">CTRL</b> or <b className="font-medium">CMD</b> and click to select multiple)</span></label>
          <select value={voterIds} onChange={handleChange} className="form-input h-[300px] overflow-y-scroll" multiple name="voterIds">
            {voters.map(voter => <option key={voter.id} value={voter.id}>{voter.address} {voter.name ? `- ${voter.name}` : ''}</option>)}
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
