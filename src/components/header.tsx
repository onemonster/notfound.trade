import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <>
      <div className="flex h-16 justify-between items-center p-2 shadow">
        <div>
          <div className="text-xl px-2 font-bold text-black dark:text-white">
            NotFound.Trade
          </div>
        </div>
        <ConnectButton
          label="Connect"
          chainStatus="icon"
          accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
        />
      </div>
    </>
  )
}

export default Header
