'use client'
import { useState } from 'react'
import { withLoading, withLoadingToastr } from '@/utils/hof'
import Button, { Variant } from '../Button'
import Dialog from '../Dialog'
import { useEffectState, useFormValidation } from '@/hooks'
import LoadingOverlay from '../LoadingOverlay'
import { useLazyQuery, useMutation } from '@apollo/client'
import { gql } from '@/__generated__/graphql'
import { TransactionFee } from '@/__generated__/graphql/graphql'
import SectionDivider from '../SectionDivider'

interface Props {
  whitelist: string[]
  contractAddress: string
}

export default function Whitelist({ whitelist, contractAddress }: Props) {
  const [voters, setVoters] = useState([''])
  const [data, setData] = useEffectState(whitelist)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [remove, setRemove] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [transactionFee, setTransactionFee] = useState<TransactionFee>()
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const [addMutation] = useMutation(gql(`
    mutation AddToWhitelist ($input: WhitelistInput!) {
      addToWhitelist(input: $input)
    }
  `))

  const [removeMutation] = useMutation(gql(`
    mutation RemoveFromWhitelist ($input: WhitelistInput!) {
      removeFromWhitelist(input: $input)
    }
  `))

  const [execPreAdd] = useLazyQuery(gql(`
    query PreAddToWhitelist ($input: WhitelistInput!) {
      preAddToWhitelist(input: $input) {
        transactionFee {
          usd
          matic
        }
      }
    }
  `))

  const [execPreRemove] = useLazyQuery(gql(`
    query PreRemoveFromWhitelist ($input: WhitelistInput!) {
      preRemoveFromWhitelist(input: $input) {
        transactionFee {
          usd
          matic
        }
      }
    }
  `))

  const handlePreRemove = withLoading(async () => {
    const { data: preRemove } = await execPreRemove({
      variables: { input: { address: contractAddress, voters: remove } }
    })

    setTransactionFee(preRemove?.preRemoveFromWhitelist.transactionFee)
    setIsConfirmationDialogOpen(true)
  }, setLoading)

  const handleRemove = withLoading(withLoadingToastr(async () => {
    await removeMutation({
      variables: { input: { address: contractAddress, voters: remove } }
    })

    setRemove([])
    setData(data.filter(voter => !remove.includes(voter)))
    setIsConfirmationDialogOpen(false)
  }), setLoading)

  const handlePreSubmit = withLoading(async () => {
    const { data: preAdd } = await execPreAdd({
      variables: { input: { address: contractAddress, voters: voters.filter(v => !!v) } }
    })

    setRemove([])
    setTransactionFee(preAdd?.preAddToWhitelist.transactionFee)
    setIsConfirmationDialogOpen(true)
  }, setLoading)

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    const validVoters = voters.filter(v => !!v)
    await addMutation({
      variables: { input: { address: contractAddress, voters: validVoters } }
    })

    setData([...data, ...validVoters])
    setIsDialogOpen(false)
    setIsConfirmationDialogOpen(false)
    setVoters([''])
  }), setLoading)

  const handleVoterFormAddressChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newVoterForms = [...voters]
    newVoterForms[i] = e.target.value
    setVoters(newVoterForms)
  }

  return (
    <div>
      <SectionDivider>
        <h1 className="section-text">Whitelist</h1>
        <Button onClick={() => setIsDialogOpen(true)} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
        {remove.length > 0 && <Button onClick={handlePreRemove} className="!py-1 !px-2 bg-red-600"><i className="bi bi-trash3"></i></Button>}
      </SectionDivider>
      <ul className="flex flex-wrap gap-4 relative">
        {loading && <LoadingOverlay />}
        {data.map(voter => (
          <li key={voter} className="bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded-full">
            <span className="mr-2">{voter}</span>
            <span onClick={() => setRemove(remove.includes(voter) ? remove.filter(r => r !== voter) : [...remove, voter])} className="text-red-500 hover:text-red-600 cursor-pointer">
              {remove.includes(voter) ? <i className="bi bi-check-lg"></i> : <i className="bi bi-trash3"></i>}
            </span>
          </li>
        ))}
      </ul>
      <Dialog title="Add new voter" isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} className="relative">
        {loading && <LoadingOverlay />}
        <div className="p-2 -m-2 max-h-[400px] overflow-y-scroll">
          {voters.map((voter, i) => (
            <div className="mb-4 flex gap-2" key={i}>
              <input value={voter} onChange={e => handleVoterFormAddressChange(e, i)} className="form-input" type="text" name="name" placeholder="Address" />
              {i === voters.length - 1 && (
                <>
                  <Button onClick={() => setVoters(voters.slice(0, -1))} variant={Variant.Tertiary} className="py-3 w-20"><i className="bi bi-dash-lg"></i></Button>
                  <Button onClick={() => setVoters([...voters, ''])} variant={Variant.Tertiary} className="py-3 w-20"><i className="bi bi-plus-lg"></i></Button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button onClick={() => setIsDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
          <Button onClick={handlePreSubmit}>Add</Button>
        </div>
      </Dialog>
      {transactionFee && (
        <Dialog title="Confirm Transaction" isOpen={isConfirmationDialogOpen} setIsOpen={setIsConfirmationDialogOpen} className="relative">
          {loading && <LoadingOverlay />}
          <p>The transaction will cost <b>{transactionFee?.usd.toFixed(6)}$ ({transactionFee?.matic.toFixed(6)} MATIC)</b> approximately. Remember that the cost may vary a bit at the time of deployment depending on the network traffic.</p>
          <div className="flex items-center justify-end gap-4 mt-4">
            <Button onClick={() => setIsConfirmationDialogOpen(false)} variant={Variant.Secondary}>Cancel</Button>
            <Button onClick={remove.length > 0 ? handleRemove : handleSubmit}>Confirm <i className="bi bi-check-lg text-lg"></i></Button>
          </div>
        </Dialog>
      )}
    </div>
  )
}
