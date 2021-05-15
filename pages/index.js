import { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

import { useWallet } from '../providers/Wallet'
import { useBalance } from '../hooks/useRoundInfo'
import { fromWei } from '../lib/web3-utils'

import Backdrop from '../components/Backdrop'
import Rules from '../components/Rules'
import Roadmap from '../components/Roadmap'
import AccountModule from '../components/AccountModule'
import App from '../components/App'
import Withdraw from '../components/Withdraw'
import Transaction from '../components/Transaction'
import * as Dalmatian from '../assets/animation/dalmatian.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Dalmatian.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Home = () => {
  const wallet = useWallet()
  const { status } = wallet
  const [ruleModal, setRuleModal] = useState(false)
  const [roadmapModal, setRoadmapModal] = useState(false)
  const [appModal, setAppModal] = useState(false)
  const [transactionModal, setTransactionModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [balance, setBalance] = useState(0)

  const getBalance = useBalance()

  useEffect(async () => {
    if (status === 'connected') {
      const balanceWei = await getBalance()
      const balance = fromWei(balanceWei.toString())

      setBalance(balance)
    }
  }, [status])

  useEffect(async () => {
    if (status === 'connected') {
      const balanceWei = await getBalance()
      const balance = fromWei(balanceWei.toString())

      setBalance(balance)
    }
  }, [withdrawModal])

  return (
    <div className="main-layer">
      <div className="head-text">
        101 Dalmatian
      </div>
      <div className="sub-text">
        Meeeeeee.......eeeeeeeM!
      </div>
      <Lottie options={defaultOptions}
              height={400}
              width={400}
      />
      <div className="desc-text">
        World's first daily reducing<br />
        doggy auction!
      </div>
      {status === 'connected' && (
        <div className="buy-btn-wrap">
          <div className="buy-btn" onClick={() => setAppModal(true)}>
            BUY DALMATIAN
          </div>
          {Number(balance) > 0 && (
            <div className="withdraw-btn" onClick={() => setWithdrawModal(true)}>
              You got a Dalmatian!
            </div>
          )}
        </div>
      )}
      <div className="side-bar">
        <ul>
          <li>
            <div onClick={() => setRuleModal(true)}>Rules</div>
          </li>
          <li>
            <div onClick={() => setRoadmapModal(true)}>Roadmap</div>
          </li>
          <li>
            <div onClick={() => setTransactionModal(true)}>Transactions</div>
          </li>
        </ul>
      </div>
      <div className="account-bar">
        <AccountModule />
      </div>
      <Backdrop open={ruleModal}>
        <Rules setRuleModal={setRuleModal} />
      </Backdrop>
      <Backdrop open={roadmapModal}>
        <Roadmap setRoadmapModal={setRoadmapModal} />
      </Backdrop>
      {status === 'connected' && (
        <Backdrop open={appModal}>
          <App setAppModal={setAppModal} />
        </Backdrop>
      )}
      {(status === 'connected' && Number(balance) > 0) && (
        <Backdrop open={withdrawModal}>
          <Withdraw setWithdrawModal={setWithdrawModal} balance={balance} />
        </Backdrop>
      )}
      <Backdrop open={transactionModal}>
        <Transaction setTransactionModal={setTransactionModal} />
      </Backdrop>
    </div>
  )
}

export default Home