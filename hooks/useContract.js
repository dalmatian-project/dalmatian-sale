import { useCallback, useMemo } from 'react'
import {
  Contract as EthersContract,
  providers as Providers,
  BigNumber
} from 'ethers'

import { useWallet } from '../providers/Wallet'
import { networkEnvironment } from '../environment'

import tokenAbi from './abi/DMTN.json'
import saleAbi from './abi/TokenSale.json'

const { endpoints, contracts } = networkEnvironment

const DEFAULT_PROVIDER = new Providers.JsonRpcProvider(endpoints.ethereum)

const getContract = (address, abi, provider = DEFAULT_PROVIDER) => {
  return new EthersContract(address, abi, provider)
}

const useContract = (address, abi, signer = true, readOnly = false) => {
  const { account, ethers } = useWallet()

  return useMemo(() => {
    if (!address) {
      return null
    }

    if (readOnly) {
      return getContract(address, abi)
    }

    if (!ethers || !account) {
      return null
    }
    
    return getContract(address, abi, signer ? ethers.getSigner() : ethers)
  }, [abi, account, address, ethers, signer, readOnly])
}

export const useTokenContract = readOnly => {
  const { tokenContract } = contracts

  return useContract(tokenContract, tokenAbi, readOnly)
}

export const useSaleContract = readOnly => {
  const { saleContract } = contracts

  return useContract(saleContract, saleAbi, readOnly)
}

export const useBuy = () => {
  const { account } = useWallet()
  const saleContract = useSaleContract(true)

  return useCallback(async value => {
    try {
      if (!account) {
        throw new Error('[useBuy] Account is not connected!')
      }

      const overrides = {
        from: account,
        value: BigNumber.from(value)
      }

      return await saleContract.buy(overrides)
    } catch (err) {
      console.error(err)

      return null
    }
  }, [account, saleContract])
}

export const useWithdraw = () => {
  const { account } = useWallet()
  const saleContract = useSaleContract(true)

  return useCallback(async () => {
    try {
      if (!account) {
        throw new Error('[useWithdraw] Account is not connected!')
      }

      return await saleContract.withdraw()
    } catch (err) {
      console.error(err)

      return null
    }
  }, [account, saleContract])
}
