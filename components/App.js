import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
import Lottie from 'react-lottie'

import { useWallet } from '../providers/Wallet'
import { useBuy } from '../hooks/useContract'
import { useRound } from '../hooks/useRoundInfo'
import useInterval from '../hooks/useInterval'
import { fromWei, getCurrentBlock } from '../lib/web3-utils'

import Ethereum from '../assets/coin/ethereum.svg'
import * as Pending from '../assets/animation/pending.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Pending.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const App = props => {
  const { setAppModal } = props
  const wallet = useWallet()
  const { account, balance } = wallet
  const [roundLoading, setRoundLoading] = useState(true)
  const [buyLoading, setBuyLoading] = useState(false)
  const [round, setRound] = useState(null)
  const [rounds, setRounds] = useState(null)
  const [block, setBlock] = useState(null)
  const [amount, setAmount] = useState('')
  const getRound = useRound()
  const buy = useBuy()

  const handleClose = () => {
    setAmount('')
    setAppModal(false)
  }

  const handleBuy = useCallback(() => {
    if (amount >= fromWei(balance)) {
      return false
    }

    if (amount < 0.1) {
      return false
    }

    setBuyLoading(true)

    const reverse = fromWei(amount, true)

    buy(reverse).then(async result => {
      if (result) {
        const confirmed = await result.wait(1)

        if (confirmed) {
          setAmount('')
          setBuyLoading(false)
        }
      } else {
        setAmount('')
        setBuyLoading(false)
      }
    }).catch(error => {
      console.log(error)
      setAmount('')
      setBuyLoading(false)
    })
  }, [amount, buy])

  useEffect(async () => {
    const roundData = await getRound()
    const blockNumber = await getCurrentBlock()
    setRound(roundData.round.toNumber())
    setRounds(roundData.rounds)
    setBlock(blockNumber)

    setRoundLoading(false)
  }, [getRound])

  useInterval(async () => {
    const roundData = await getRound()
    const blockNumber = await getCurrentBlock()
    setRound(roundData.round.toNumber())
    setRounds(roundData.rounds)
    setBlock(blockNumber)
  }, 5000)

  return (
    <div className="app">
      {buyLoading && (
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
      <div className="app-header">
        <div className="app-header-text">101 Dalmatian Info</div>
        <div className="app-close" onClick={() => handleClose()}>
          <AiOutlineClose size={25} />
        </div>
      </div>
      <div className="app-body">
        <div className="app-left">
          <div>
            <div>Ethereum Deposit</div>
            <div className="input-wrap">
              <div className="input-box">
                <Image src={Ethereum} width={30} height={30} />
                <input
                  placeholder="0.0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <div>ETH</div>
              </div>
              <div className="balance">
                <div>My Balance:</div>
                <div className="balance-number">
                  {(Math.floor(Number(fromWei(balance)) * 10000) / 10000).toLocaleString('en-US', { maximumFractionDigits: 4 })}
                </div>
                <div>ETH</div>
              </div>
              {(round === 101 && block > rounds.endBlock) ? (
                <div 
                  className="deposit-btn disabled"
                >
                  SALE ENDED
                </div>
              ) : (
                <div 
                  className={(Number(balance) > 0.1 && round > 0) ? 'deposit-btn' : 'deposit-btn disabled'}
                  onClick={handleBuy}
                >
                  BUY
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="app-right">
          {roundLoading ? (
            <div>Loading...</div>
          ) : round < 101 ? (
            <div>
              <div className="round-text">Current Round: <span>{round}</span></div>
              {(round > 0 && round < 101 && rounds !== null) && (
                <div>
                  <div className="info-item">
                    <div className="info-title">Current Block</div>
                    <div className="info-value">{block}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-title">Round Start Block</div>
                    <div className="info-value">{rounds.startBlock.toNumber()}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-title">Round End Block</div>
                    <div className="info-value">{rounds.endBlock.toNumber()}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-title">Total Deposit</div>
                    <div className="info-value">{Number(fromWei(rounds.totalQuantity.toString())).toLocaleString('en-US', { maximumFractionDigits: 4 })} <span>ETH</span></div>
                  </div>
                  <div className="info-item">
                    <div className="info-title">Round Sales</div>
                    <div className="info-value">{Number(fromWei(rounds.saleAmount.toString())).toLocaleString('en-US', { maximumFractionDigits: 4 })} <span>DMTN</span></div>
                  </div>
                </div>
              )}
            </div>
          ) : (round === 101 && block > rounds.endBlock) ? (
            <div>
              <div className="info-item">
                <div className="info-title">Current Block</div>
                <div className="info-value">Sale Ended</div>
              </div>
              <div className="info-item">
                <div className="info-title">Round Start Block</div>
                <div className="info-value">{rounds.startBlock.toNumber()}</div>
              </div>
              <div className="info-item">
                <div className="info-title">Round End Block</div>
                <div className="info-value">{rounds.endBlock.toNumber()}</div>
              </div>
              <div className="info-item">
                <div className="info-title">Total Deposit</div>
                <div className="info-value">{Number(fromWei(rounds.totalQuantity.toString())).toLocaleString('en-US', { maximumFractionDigits: 4 })} <span>ETH</span></div>
              </div>
              <div className="info-item">
                <div className="info-title">Round Sales</div>
                <div className="info-value">{Number(fromWei(rounds.saleAmount.toString())).toLocaleString('en-US', { maximumFractionDigits: 4 })} <span>DMTN</span></div>
              </div>
            </div>
          ) : (
            <div>
              <div className="info-item">
                <div className="info-title">Current Block</div>
                <div className="info-value">{block}</div>
              </div>
              <div className="info-item">
                <div className="info-title">Round Start Block</div>
                <div className="info-value">{rounds.startBlock.toNumber()}</div>
              </div>
              <div className="info-item">
                <div className="info-title">Round End Block</div>
                <div className="info-value">{rounds.endBlock.toNumber()}</div>
              </div>
              <div className="info-item">
                <div className="info-title">Total Deposit</div>
                <div className="info-value">{Number(fromWei(rounds.totalQuantity.toString())).toLocaleString('en-US', { maximumFractionDigits: 4 })} <span>ETH</span></div>
              </div>
              <div className="info-item">
                <div className="info-title">Round Sales</div>
                <div className="info-value">{Number(fromWei(rounds.saleAmount.toString())).toLocaleString('en-US', { maximumFractionDigits: 4 })} <span>DMTN</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App