import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { 
  getProviderFromUseWalletId,
  getUseWalletProviders 
} from '../providers/ethereum-providers'

const ProviderButton = props => {
  const { id, provider, onActivate } = props

  const handleClick = useCallback(() => {
    onActivate(id)
  }, [onActivate, id])

  return (
    <div className="wallet-item" onClick={handleClick}>
      <div className="wallet-icon">
        <Image src={provider.image} width={30} height={30} />
      </div>
      <div className="wallet-name">{provider.name}</div>
    </div>
  )
}

const WalletProviders = props => {
  const { onActivate } = props
  const [providers, setProviders] = useState([])

  useEffect(() => {
    setProviders(getUseWalletProviders().map(provider => [
      provider.id,
      getProviderFromUseWalletId(provider.id)
    ]))
  }, [])

  return (
    <div>
      {providers.map(([id, provider]) => (
        <ProviderButton
          key={id}
          id={id}
          provider={provider}
          onActivate={onActivate}
        />
      ))}
      <div className="provider-link">
        <a href="https://ethereum.org/wallets/" target="_blank">
          What is an Ethereum provider
        </a>
      </div>
    </div>
  )
}

export default WalletProviders