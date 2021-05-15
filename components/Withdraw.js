import { useEffect, useState, useCallback } from 'react'
import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai'
import Lottie from 'react-lottie'

import useCopyToClipboard from '../hooks/useCopyToClipboard'
import { networkEnvironment } from '../environment'
import { useWithdraw } from '../hooks/useContract'

import * as Pending from '../assets/animation/pending.json'

const { contracts } = networkEnvironment

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Pending.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Withdraw = props => {
  const { setWithdrawModal, balance } = props
  const [withdrawLoading, setWithdrawLoading] = useState(false)
  const copy = useCopyToClipboard()
  const withdraw = useWithdraw()

  const handleWithdraw = () => {
    setWithdrawLoading(true)

    withdraw().then(async result => {
      if (result) {
        const confirmed = await result.wait(1)

        if (confirmed) {
          setWithdrawLoading(false)
          setWithdrawModal(false)
        }
      } else {
        setWithdrawLoading(false)
      }
    }).catch(error => {
      console.log(error)
    }, [withdraw])
  }

  return (
    <div className="withdraw">
      {withdrawLoading && (
        <div className="loading">
          <Lottie options={defaultOptions}
                  height={150}
                  width={150}
          />
          <div className="pending-text">
            Pending...<br />
            DO NOT CLOSE THIS WINDOW!!
          </div>
        </div>
      )}
      <div className="withdraw-header">
        <div className="withdraw-header-text">101 Dalmatian Withdraw</div>
        <div className="withdraw-close" onClick={() => setWithdrawModal(false)}>
          <AiOutlineClose size={25} />
        </div>
      </div>
      <div className="withdraw-body">
        <div className="notice-title">Notice</div>
        <div className="notice-desc">If your wallet does not have a token set, you may not be able to see the withdrawal amount from your wallet.</div>
        <div className="notice-desc">First, copy the following address and set the token in your wallet.</div>
        <div className="copy-address">
          <div 
            className="token-address" 
            onClick={() => copy(contracts.tokenContract, 'Address copied to clipboard')}
          >
            <div className="contract">{contracts.tokenContract}</div>
            <AiOutlineCopy size={18} color={'#999'} />
          </div>
        </div>
        <div className="withdraw-wrap">
          <div className="amount-value">Withdrawable Amount: <span>{balance}</span> DMTN</div>
          <div 
            className="withdrawl-btn"
            onClick={handleWithdraw}
          >
            WITHDRAW
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw