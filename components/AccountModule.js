import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { EthIdenticon, RADIUS } from '@aragon/ui'

import { useWallet } from '../providers/Wallet'
import { useAccountModule } from '../providers/Account'
import { shortenAddress } from '../lib/web3-utils'

import AccountModal from './AccountModal'
import WalletConnecting from './WalletConnecting'
import WalletProviders from './WalletProviders'
import WalletError from './WalletError'
import WalletConnected from './WalletConnected'
 
const SCREENS = [
  { id: 'providers', title: 'Connect Wallet from' },
  { id: 'connecting', title: 'Connect Wallet from' },
  { id: 'connected', title: 'Active account' },
  { id: 'error', title: 'Connection Error' }
]

const AccountModule = () => {
  const wallet = useWallet()
  const { account, connector, error, status } = wallet
  const { accountVisible, showAccount, hideAccount } = useAccountModule()
  const [activatingDelayed, setActivatingDelayed] = useState(null)
  const buttonRef = useRef()
  
  const toggle = useCallback(() => (
    accountVisible ? hideAccount() : showAccount()
  ), [accountVisible, showAccount, hideAccount])

  useEffect(() => {
    let autocloseTimer

    if (status === 'error') {
      setActivatingDelayed(null)
    }

    if (status === 'connecting') {
      setActivatingDelayed(connector)
    }

    if (status === 'connected') {
      autocloseTimer = setTimeout(hideAccount, 500)
    }

    return () => clearTimeout(autocloseTimer)
  }, [connector, status, hideAccount])

  const handleResetConnection = useCallback(() => {
    wallet.reset()
  }, [wallet])

  const handleActivate = useCallback(async providerId => {
    await wallet.connect(providerId)
  }, [wallet])

  const getIdenticon = address => {
    const canvas = createCanvas(30, 30)

    const icon = renderIcon({
      seed: address,
      color: '#dfe',
      size: 8,
      scale: 3
    }, canvas)

    return icon
  }

  const previousScreenIndex = useRef(-1)

  const { screenIndex, direction } = useMemo(() => {
    const screenId = status === 'disconnected' ? 'providers' : status

    const screenIndex = SCREENS.findIndex(screen => screen.id === screenId)
    const direction = previousScreenIndex.current > screenIndex ? -1 : 1

    previousScreenIndex.current = screenIndex

    return { direction, screenIndex }
  }, [status])

  const screen = SCREENS[screenIndex]
  const screenId = screen.id

  return (
    <div ref={buttonRef}>
      {screen.id === 'connected' ? (
        <div
          className="connect-btn"
          onClick={toggle}
        >
          <EthIdenticon
            address={account || ''}
            radius={RADIUS}
          />

          {shortenAddress(account)}
        </div>
      ) : (
        <div 
          className="connect-btn"
          onClick={toggle}
        >
          Connect a Wallet
        </div>
      )}

      <AccountModal
        visible={accountVisible}
        heading={screen.title}
        onClose={hideAccount}
        walletData={{
          account,
          activating: activatingDelayed,
          activationError: error,
          status,
          screenId
        }}
      >
        {({ activating, activationError, screenId}) => {
          if (screenId === 'connecting') {
            return <WalletConnecting providerId={activating} onCancel={handleResetConnection} />
          }

          if (screenId === 'connected') {
            return <WalletConnected />
          }

          if (screenId === 'error') {
            return <WalletError error={activationError} onBack={handleResetConnection} />
          }

          return <WalletProviders onActivate={handleActivate} />
        }}
      </AccountModal>
    </div>
  )
}

export default AccountModule