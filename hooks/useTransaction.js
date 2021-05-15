import { useCallback } from 'react'
import Contract from 'web3-eth-contract'

import { networkEnvironment } from '../environment'
import saleAbi from './abi/TokenSale.json'

const { endpoints, contracts } = networkEnvironment

Contract.setProvider(endpoints.ethereum)

export const useTransaction = () => {
  const saleContract = new Contract(saleAbi, contracts.saleContract)

  return useCallback(async () => {
    try {
      const deposit = await saleContract.getPastEvents('DepoistForBuy', {
        fromBlock: 0,
        toBlock: 'latest'
      })

      const withdraw = await saleContract.getPastEvents('RewardToken', {
        fromBlock: 0,
        toBlock: 'latest'
      })

      return {
        deposit,
        withdraw
      }
    } catch (err) {
      console.error(err)

      return null
    }
  })
}