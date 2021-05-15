import frame from './icons/frame.svg'
import cipher from './icons/cipher.png'
import metamask from './icons/metamask.svg'
import status from './icons/status.png'
import wallet from './icons/wallet.svg'
import fortmatic from './icons/fortmatic.svg'
import portis from './icons/portis.svg'
import walletconnect from './icons/wallet-connect.svg'
import { envVar, networkEnvironment } from '../../environment'

const { chainId, endpoints } = networkEnvironment

const PROVIDERS = {
  frame: {
    id: 'frame',
    name: 'Frame',
    type: 'Desktop',
    image: frame,
    strings: {
      'your Ethereum wallet': 'Frame',
    },
  },
  metamask: {
    id: 'metamask',
    name: 'Metamask',
    type: 'Desktop',
    image: metamask,
    strings: {
      'your Ethereum wallet': 'Metamask',
    },
  },
  status: {
    id: 'status',
    name: 'Status',
    type: 'Mobile',
    image: status,
    strings: {
      'your Ethereum wallet': 'Status',
    },
  },
  cipher: {
    id: 'cipher',
    name: 'Cipher',
    type: 'Mobile',
    image: cipher,
    strings: {
      'your Ethereum wallet': 'Cipher',
    },
  },
  walletconnect: {
    id: 'walletconnect',
    name: 'WalletConnect',
    type: 'Any',
    image: walletconnect,
    strings: {
      'your Ethereum wallet': 'WalletConnect',
    },
  },
  fortmatic: {
    id: 'fortmatic',
    name: 'Fortmatic',
    type: 'Any',
    image: fortmatic,
    strings: {
      'your Ethereum wallet': 'Fortmatic',
    },
  },
  portis: {
    id: 'portis',
    name: 'Portis',
    type: 'Any',
    image: portis,
    strings: {
      'your Ethereum wallet': 'Portis',
    },
  },
  unknown: {
    id: 'unknown',
    name: 'Unknown',
    type: 'Desktop',
    image: wallet,
    strings: {
      'your Ethereum wallet': 'your wallet',
    },
  },
}

// Get a providers object for a given ID.
const getProvider = providerId => {
  return PROVIDERS[providerId]
}

// Get a string that depends on the current Ethereum provider.
// The default string is used as an identifier (à la gettext).
const getProviderString = (string, providerId) => {
  const provider = getProvider(providerId)
  return (provider && provider.strings[string]) || string
}

// Get an identifier for the provider, if it can be detected.
const identifyProvider = provider => {
  if (provider && provider.isMetaMask) {
    return 'metamask'
  }
  return 'unknown'
}

// Get a provider from its useWallet() identifier.
const getProviderFromUseWalletId = id => {
  if (id === 'injected') {
    return (
      getProvider(identifyProvider(window.ethereum)) || getProvider('unknown')
    )
  }
  return id in PROVIDERS
    ? getProvider(id)
    : getProvider('unknown')
}

export const getUseWalletProviders = () => {
  const providers = [{ id: 'injected', useWalletConf: null }, { id: 'frame', useWalletConf: null }]

  // TODO: Investigate further
  if (chainId === 1) {
    // WalletConnect is only supported on mainnet environments because the web3-react WalletConnect connector is broken on any chain > 1
    // https://github.com/NoahZinsmeister/web3-react/blob/v6/packages/walletconnect-connector/src/index.ts#L31
    providers.push({
      id: 'walletconnect',
      useWalletConf: { rpcUrl: endpoints.ethereum },
    })
  }

  if (envVar('FORTMATIC_API_KEY')) {
    providers.push({
      id: 'fortmatic',
      useWalletConf: { apiKey: envVar('FORTMATIC_API_KEY') },
    })
  }

  if (envVar('PORTIS_DAPP_ID')) {
    providers.push({
      id: 'portis',
      useWalletConf: { dAppId: envVar('PORTIS_DAPP_ID') },
    })
  }

  return providers
}

const getUseWalletConnectors = () => {
  return getUseWalletProviders().reduce(
    (connectors, provider) => {
      if (provider.useWalletConf) {
        connectors[provider.id] = provider.useWalletConf
      }

      return connectors
    },
    {}
  )
}

export {
  getProvider,
  identifyProvider,
  getProviderString,
  getProviderFromUseWalletId,
  getUseWalletConnectors
}
export default PROVIDERS
