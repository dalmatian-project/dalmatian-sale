import { useMemo, useRef } from 'react'
import { ChainUnsupportedError } from 'use-wallet'
import { getNetworkName } from '../lib/web3-utils'
import { networkEnvironment } from '../environment'
import Lottie from 'react-lottie'

import * as ErrorAni from '../assets/animation/error.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: ErrorAni.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const WalletError = props => {
  const { error, onBack } = props
  const elementRef =  useRef(null)

  const [title, secondary] = useMemo(() => {
    const networkName = getNetworkName(networkEnvironment.chainId)

    if (error instanceof ChainUnsupportedError) {
      return [
        'Wrong network',
        `Please select the ${networkName} network in your wallet and try again.`
      ]
    }

    return [
      'Failed to enable your account',
      'You can try another Ethereum wallet.'
    ]
  }, [error])
  
  return (
    <div ref={elementRef}>
      <Lottie options={defaultOptions}
              height={200}
              width={200}
      />
      <div className="error-title">
        {title}
      </div>
      <div className="error-secondary">
        {secondary}
      </div>
      <div className="error-btn" onClick={() => onBack()}>
        OK, try again
      </div>
    </div>
  )
}

export default WalletError