import {
  getProviderFromUseWalletId,
  getProviderString,
} from '../providers/ethereum-providers'
import Lottie from 'react-lottie'

import * as Wait from '../assets/animation/wait.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Wait.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const WalletConnecting = props => {
  const { providerId, onCancel } = props

  const provider = providerId
    ? getProviderFromUseWalletId(providerId) 
    : { id: undefined, image: '', name: '' }

  return (
    <div className="connecting-wrap">
      <div className="connecting-inner">
        <div className="loading-wrap">
          <Lottie options={defaultOptions}
                height={200}
                width={200}
          />
        </div>
        <div className="connecting-text">
          Connecting to {provider.name}
        </div>
        <div className="connecting-text">
          Log into {getProviderString('your Ethereum wallet', provider.id)}.<br />You
          may be temporarily redirected to a new screen.
        </div>
        <div className="cancel-btn" onClick={() => onCancel()}>
          Cancel
        </div>
      </div>
    </div>
  )
}

export default WalletConnecting