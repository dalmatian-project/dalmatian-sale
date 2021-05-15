import Image from 'next/image'
import { IdentityBadge } from '@aragon/ui'
import { AiOutlineCopy, AiOutlineCheckCircle } from 'react-icons/ai'

import { networkEnvironment } from '../environment'
import { getProviderFromUseWalletId } from '../providers/ethereum-providers'
import { useWallet } from '../providers/Wallet'
import useCopyToClipboard from '../hooks/useCopyToClipboard'

const WalletConnected = () => {
  const { account, reset, connector, networkName: walletNetworkName } = useWallet()
  const copy = useCopyToClipboard()
  const providerInfo = getProviderFromUseWalletId(connector)

  return (
    <div>
      <div className="connected-wrap">
        <div className="connected-icon">
          <Image src={providerInfo.image} width={24} height={24} />
          <span>{providerInfo.id === 'unknown' ? 'Wallet' : providerInfo.name}</span>
        </div>
        <div 
          className="connected-account" 
          onClick={() => copy(account ? account : '', 'Address copied to clipboard')}
        >
          <IdentityBadge
            entity={account ? account : ''}
            networkType={networkEnvironment.legacyNetworkType}
            compact
            badgeOnly
          />
          <AiOutlineCopy size={18} color={'#999'} />
        </div>
      </div>
      <div className="connected-text">
        <div className="connected-text-icon">
          <AiOutlineCheckCircle size={18} />
        </div>
        <div className="connected-label">
          {`Connected to Ethereum ${walletNetworkName} Network`}
        </div>
      </div>

      <div className="disconnect-btn" onClick={() => reset()}>
        Disconnect
      </div>
    </div>
  )
}

export default WalletConnected