"use client"

import { createConfig, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { createWeb3Modal } from "@web3modal/wagmi/react"

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || ""

if (!projectId) {
  console.warn("NEXT_PUBLIC_WC_PROJECT_ID is not set")
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: false,
})
