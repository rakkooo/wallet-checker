// lib/wagmi-config.ts
"use client"

import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { mainnet, sepolia } from "wagmi/chains"

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || ""

if (!projectId) {
  // Vercel に環境変数が無いとウォレット一覧が出ないので、ローカルでは警告
  console.warn("NEXT_PUBLIC_WC_PROJECT_ID is not set")
}

export const chains = [mainnet, sepolia] as const

export const config = defaultWagmiConfig({
  projectId,
  chains,
  metadata: {
    name: "FCFS Wallet Checker",
    description: "Check if your wallet is eligible",
    url: "https://wallet-checker.vercel.app", // 自分の本番 URL に合わせて変更
    icons: ["https://wallet-checker.vercel.app/icon.png"], // 適当なアイコン URL に変更OK
  },
})

// Web3Modal の初期化
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  enableAnalytics: false,
  enableOnramp: false,
})
