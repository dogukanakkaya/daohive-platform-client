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
  weights: Record<string, number>
  contractAddress: string
}

const INITIAL_FORM = Object.freeze({ address: '', weight: 1 })

export default function Weights({ weights, contractAddress }: Props) {
  const [forms, setForms] = useState([{ ...INITIAL_FORM }])
  const [data, setData] = useEffectState(weights)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [remove, setRemove] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [transactionFee, setTransactionFee] = useState<TransactionFee>()
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const [setWeightsMutation] = useMutation(gql(`
    mutation SetWeights ($input: SetWeightsInput!) {
      setWeights(input: $input)
    }
  `))

  const [execPreSetWeights] = useLazyQuery(gql(`
    query PreSetWeights ($input: SetWeightsInput!) {
      preSetWeights(input: $input) {
        transactionFee {
          usd
          matic
        }
      }
    }
  `))

  const handlePreRemove = () => { }

  const handleRemove = () => { }

  const handlePreSubmit = withLoading(async () => {
    const voters = forms.map(({ address }) => address)
    const weights = forms.map(({ weight }) => weight)

    const { data: preSetWeights } = await execPreSetWeights({
      variables: { input: { address: contractAddress, voters, weights } }
    })

    setRemove([])
    setTransactionFee(preSetWeights?.preSetWeights.transactionFee)
    setIsConfirmationDialogOpen(true)
  }, setLoading)

  const handleSubmit = withLoading(withLoadingToastr(async () => {
    const voters = forms.map(({ address }) => address)
    const weights = forms.map(({ weight }) => weight)

    await setWeightsMutation({
      variables: { input: { address: contractAddress, voters, weights } }
    })

    setData({ ...data, ...forms.reduce((prev, curr) => ({ ...prev, [curr.address]: curr.weight }), {}) })
    setIsDialogOpen(false)
    setIsConfirmationDialogOpen(false)
    setForms([INITIAL_FORM])
  }), setLoading)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const _forms = [...forms]
    const { name, value } = e.target;
    (_forms[i] as Record<string, string | number>)[name] = name === 'weight' ? parseInt(value) : value
    setForms(_forms)
  }

  return (
    <div>
      <SectionDivider>
        <h1 className="section-text">Weights</h1>
        <Button onClick={() => setIsDialogOpen(true)} variant={Variant.Secondary} className="!py-1 !px-2"><i className="bi bi-plus text-lg"></i></Button>
        {remove.length > 0 && <Button onClick={handlePreRemove} className="!py-1 !px-2 bg-red-600"><i className="bi bi-trash3"></i></Button>}
      </SectionDivider>
      <ul className="flex flex-wrap gap-4 relative">
        {loading && <LoadingOverlay />}
        {Object.entries(data).map(([address, weight]) => (
          <li key={address} className="bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded-full">
            <span className="mr-2">{address} - {weight ?? 1}</span>
            <span onClick={() => setRemove(remove.includes(address) ? remove.filter(r => r !== address) : [...remove, address])} className="text-red-500 hover:text-red-600 cursor-pointer">
              {remove.includes(address) ? <i className="bi bi-check-lg"></i> : <i className="bi bi-trash3"></i>}
            </span>
          </li>
        ))}
      </ul>
      <Dialog title="Add new voter" isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} className="relative">
        {loading && <LoadingOverlay />}
        <div className="p-2 -m-2 max-h-[400px] overflow-y-scroll">
          {forms.map(({ address, weight }, i) => (
            <div className="mb-4 flex gap-2" key={i}>
              <input value={address} onChange={e => handleFormChange(e, i)} className="form-input" type="text" name="address" placeholder="Address" />
              <input value={weight} onChange={e => handleFormChange(e, i)} className="form-input w-20" type="number" name="weight" placeholder="Weight" />
              {i === forms.length - 1 && (
                <>
                  <Button onClick={() => setForms(forms.slice(0, -1))} variant={Variant.Tertiary} className="py-3 w-20"><i className="bi bi-dash-lg"></i></Button>
                  <Button onClick={() => setForms([...forms, { ...INITIAL_FORM }])} variant={Variant.Tertiary} className="py-3 w-20"><i className="bi bi-plus-lg"></i></Button>
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
