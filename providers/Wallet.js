import { useContext, useMemo, createContext } from 'react'
import { UseWalletProvider, useWallet } from 'use-wallet'
import { providers as EthersProviders } from 'ethers'
import { networkEnvironment } from '../environment'
import { getUseWalletConnectors } from './ethereum-providers'

const WalletAugmentedContext = createContext(null)

const WalletAugmented = ({ children }) => {
  const wallet = useWallet()
  const { ethereum } = wallet

  const ethers = useMemo(() => (
    ethereum ? new EthersProviders.Web3Provider(ethereum) : null
  ), [ethereum])

  const contextValue = useMemo(() => ({ ...wallet, ethers }), [wallet, ethers])

  return (
    <WalletAugmentedContext.Provider value={contextValue}>
      {children}
    </WalletAugmentedContext.Provider>
  )
}

const WalletProvider = ({ children }) => {
  return (
    <UseWalletProvider
      chainId={networkEnvironment.chainId}
      connectors={getUseWalletConnectors()}
    >
      <WalletAugmented>{children}</WalletAugmented>
    </UseWalletProvider>
  )
}

const useWalletAugmented = () => {
  return useContext(WalletAugmentedContext)
}

export { useWalletAugmented as useWallet, WalletProvider }