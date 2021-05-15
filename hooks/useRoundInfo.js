import { useCallback } from 'react'

import { useSaleContract } from './useContract'
import { useWallet } from '../providers/Wallet'

export const useRound = () => {
  const { account } = useWallet()
  const saleContract = useSaleContract(true)

  return useCallback(async () => {
    try {
      if (!account) {
        throw new Error('[useRound] Account is not connected!')
      }

      const round = await saleContract.round()
      const rounds = await saleContract.rounds(round)

      return {
        round,
        rounds
      }
    } catch (err) {
      console.error(err)

      return null
    }
  }, [account, saleContract])
}

export const useBalance = () => {
  const { account } = useWallet()
  const saleContract = useSaleContract(true)

  return useCallback(async () => {
    try {
      if (!account) {
        throw new Error('[useBalance] Account is not connected!')
      }

      return await saleContract.balances(account)
    } catch (err) {
      console.error(err)

      return null
    }
  }, [account, saleContract])
}