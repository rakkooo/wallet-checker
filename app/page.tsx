// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useAccount, useDisconnect } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import WalletChecker from "@/components/wallet-checker"

export default function Home() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* PC 用 背景（sm 以上） */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed blur-md -z-10 hidden sm:block"
        style={{
          backgroundImage: "url('/mint-bg.png')",
        }}
      />

      {/* スマホ用 背景（sm 未満） */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed blur-sm -z-10 block sm:hidden"
        style={{
          backgroundImage: "url('/mint-bg.png')",
        }}
      />

      {/* 暗めのオーバーレイ（共通） */}
      <div className="fixed inset-0 bg-black/40 -z-10" />

      {/* メインカード */}
      <div className="w-full max-w-md px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            FCFS Checker
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Check if your wallet is eligible
          </p>

          {isConnected ? (
            <>
              <WalletChecker address={address} />
              <button
                onClick={() => disconnect()}
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Disconnect Wallet
              </button>
            </>
          ) : (
            <button
              onClick={() => open()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
