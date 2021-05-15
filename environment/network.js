const networks = new Map([
  [
    'ethereum',
    {
      chainId: 1,
      legacyNetworkType: 'main',
      endpoints: {
        ethereum: 'https://mainnet.infura.io/v3/b06406ad2eed44eb876d2b256696bfc1',
        scan: 'https://etherscan.io/'
      },
      admin: '',
      contracts: {
        tokenContract: '',
        saleContract: ''
      }
    }
  ],
  [
    'ropsten',
    {
      chainId: 3,
      legacyNetworkType: 'ropsten',
      endpoints: {
        ethereum: 'https://ropsten.infura.io/v3/b06406ad2eed44eb876d2b256696bfc1',
        scan: 'https://ropsten.etherscan.io/'
      },
      admin: '0xAD532cf6ae251355db7fa03Fed07c087866080ea',
      contracts: {
        tokenContract: '0x314B1fEF5B941E8E69FCA5196b4C8f2856fe432A',
        saleContract: '0x85d1ab1d791883CdDC83ca0313c4e5308b3e5Bc5'
      }
    }
  ]
])

export const getNetworkConfig = name => {
  return networks.get(name)
}