import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'NotFoundTrade',
  projectId: 'notfoundtrade',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Not Found Trades</title>
        <meta
          name="description"
          content="Utilities for ERC404. Aggregator, roller, launchpad, and transfers. Home of the Founders."
        />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })
