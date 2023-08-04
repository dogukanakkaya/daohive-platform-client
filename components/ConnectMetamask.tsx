'use client'
import Image from 'next/image'
import Button, { Variant } from './Button'
import { useMetamask } from '@/hooks/useMetamask'
import { api } from '@/utils/api'

export default function ConnectMetamask() {
  const { isMetamaskConnected, connectToMetamask } = useMetamask()

  const connectWithMetamask = async () => {
    if (!isMetamaskConnected) return connectToMetamask()

    const selectedAddress = window.ethereum.selectedAddress

    const { data: { nonce } } = await api.get(`/auth/metamask/nonce?address=${selectedAddress}`)
  }

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
