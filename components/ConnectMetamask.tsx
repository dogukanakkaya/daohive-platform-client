'use client'
import Image from 'next/image'
import Button, { Variant } from './Button'
import { useMetamask } from '@/hooks/useMetamask'
import { api } from '@/utils/api'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { withLoading } from '@/utils/hof'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConnectMetamask({ setLoading }: Props) {
  const supabase = createClientComponentClient()
  const { isMetamaskConnected, connectToMetamask } = useMetamask()

  const connectWithMetamask = withLoading(async () => {
    if (!isMetamaskConnected) return connectToMetamask()

    const selectedAddress = window.ethereum.selectedAddress

    const { data: { nonce } } = await api.get(`/auth/metamask/nonce?address=${selectedAddress}`)
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [nonce, selectedAddress]
    })

    const { data: { email, password } } = await api.post(`/auth/metamask/login?address=${selectedAddress}`, { signature })
    await supabase.auth.signInWithPassword({ email, password })
  }, setLoading)

  return (
    <Button onClick={connectWithMetamask} variant={Variant.Tertiary} className="shadow-md flex items-center gap-4 rounded">
      <Image
        className="relative"
        src="/images/metamask.svg"
        alt="Sign in with GitHub"
        width={32}
        height={32}
        priority
      />
      Connect with MetaMask
    </Button>
  )
}
