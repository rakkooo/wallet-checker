'use client'

import { ReactNode } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { http } from 'viem'
import { createConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '537ec6bc395c2ed56829831de13c3cd7'

const metadata = {
  name: 'FCFS Wallet Checker',
  description: 'Check if your wallet is eligible for FCFS',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://fcfs-checker.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: [mainnet, sepolia],
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  )
}
