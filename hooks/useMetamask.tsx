import { useContext, useState, useEffect, createContext, ReactNode } from 'react'
import { ethers } from 'ethers'
import { CHAIN_ID, NODE_ENV } from '@/config'

interface MetamaskContextProps {
  isMetamaskInstalled: boolean,
  isMetamaskLoading: boolean,
  isMetamaskConnected: boolean,
  accounts: ethers.JsonRpcSigner[],
  provider?: ethers.BrowserProvider,
  connectToMetamask: () => Promise<void>
}

const MetamaskContext = createContext<MetamaskContextProps>({} as MetamaskContextProps)

export function useMetamask() {
  return useContext(MetamaskContext)
}

export function MetamaskProvider({ children }: { children: ReactNode }) {
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false)
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false)
  const [accounts, setAccounts] = useState<MetamaskContextProps['accounts']>([])
  const [provider, setProvider] = useState<MetamaskContextProps['provider']>()

  // Check if Metamask is installed on component mount
  useEffect(() => {
    !async function () {
      if (window.ethereum) {
        setIsMetamaskLoading(true)
        setIsMetamaskInstalled(true)
        const provider = new ethers.BrowserProvider(window.ethereum, 'any')
        const accounts = await provider.listAccounts()
        setProvider(provider)
        setAccounts(accounts)
        setIsMetamaskConnected(accounts.length > 0)
        setIsMetamaskLoading(false)

        provider.on('network', (_newNetwork, oldNetwork) => {
          if (oldNetwork) {
            window.location.reload()
          }
        })
      }
    }()
  }, [])

  async function switchNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }]
      })
    } catch (error: any) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: NODE_ENV === 'development' ? 'Polygon Mumbai' : 'Polygon Mainnet',
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: NODE_ENV === 'development' ? ['https://rpc-mumbai.maticvigil.com/'] : ['https://polygon-rpc.com/'],
              chainId: CHAIN_ID
            }
          ]
        })
      } else {
        if (error.code === 4001) {
          console.error('User rejected to switch network.')
        }

        throw error
      }
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        if (window.ethereum.networkVersion !== CHAIN_ID) await switchNetwork()

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ chainId: CHAIN_ID }] })
        setAccounts(accounts)
        setIsMetamaskConnected(true)
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('Metamask not detected')
    }
  }

  const value = {
    isMetamaskInstalled,
    isMetamaskLoading,
    isMetamaskConnected,
    accounts,
    provider,
    connectToMetamask
  }

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  )
}