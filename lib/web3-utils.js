import Web3 from 'web3'

import { networkEnvironment } from '../environment'

const { endpoints } = networkEnvironment
const web3 = new Web3(endpoints.ethereum)

export const getNetworkName = chainId => {
  if (chainId === 1) {
    return 'Ethereum'
  }

  if (chainId === 3) {
    return 'Ropsten'
  }

  return 'Unknown'
}

export const shortenAddress = (address, charsLength = 4) => {
  const prefixLength = 2 // "0x"
  if (!address) {
    return ''
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    '…' +
    address.slice(-charsLength)
  )
}

export const fromWei = (number, reverse = false) => {
  if (reverse) {
    return Web3.utils.toWei(number)
  }

  return Web3.utils.fromWei(number)
}

export const getCurrentBlock = async () => {
  return await web3.eth.getBlockNumber()
}