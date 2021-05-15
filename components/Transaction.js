import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { useTransaction } from '../hooks/useTransaction'
import { shortenAddress, fromWei } from '../lib/web3-utils'
import { networkEnvironment } from '../environment'
import useInterval from '../hooks/useInterval'

const { endpoints, contracts } = networkEnvironment

const Transaction = props => {
  const { setTransactionModal } = props
  const getTransaction = useTransaction()
  const [deposit, setDeposit] = useState([])
  const [withdraw, setWithdraw] = useState([])

  useEffect(async () => {
    const transactions = await getTransaction()
    const depositData = [...transactions.deposit].reverse()
    const withdrawData = [...transactions.withdraw].reverse()

    setDeposit(depositData)
    setWithdraw(withdrawData)
  }, [])

  useInterval(async () => {
    const transactions = await getTransaction()
    const depositData = [...transactions.deposit].reverse()
    const withdrawData = [...transactions.withdraw].reverse()

    setDeposit(depositData)
    setWithdraw(withdrawData)
  }, 5000)

  return (
    <div className="transaction">
      <div className="transaction-header">
        <div className="transaction-header-text">Transactions</div>
        <div className="transaction-close" onClick={() => setTransactionModal(false)}>
          <AiOutlineClose size={25} />
        </div>
      </div>
      <div className="transaction-body">
        <div className="transaction-left">
          <div className="title-text">Deposit Transaction</div>
          <div className="list-wrap">
            {deposit.length === 0 ? (
              <div className="no-transaction">Oops, there's nothing here.</div>
            ) : deposit.map((item, index) => (
              <div className="list-item" key={index}>
                <div className="transaction-id">
                  <div className="event blue">{item.event}</div>
                  <div className="transaction-link">
                    <a href={`${endpoints.scan}tx/${item.transactionHash}`} target="_blank">
                      {shortenAddress(item.transactionHash, 10)}
                    </a>
                  </div>
                </div>
                <div className="values">From: <span>{item.returnValues.from}</span></div>
                <div className="values">Quantity: <span>{fromWei(item.returnValues.quantity).toLocaleString('en-US', { maximumFractionDigits: 4 })}</span> ETH</div>
              </div>
            ))}
          </div>
        </div>
        <div className="transaction-right">
          <div className="title-text">Withdraw Transaction</div>
          <div className="list-wrap">
            {withdraw.length === 0 ? (
              <div className="no-transaction">Oops, there's nothing here.</div>
            ) : withdraw.map((item, index) => (
              <div className="list-item" key={index}>
                <div className="transaction-id">
                  <div className="event green">{item.event}</div>
                  <div className="transaction-link">
                    <a href={`${endpoints.scan}tx/${item.transactionHash}`} target="_blank">
                      {shortenAddress(item.transactionHash, 10)}
                    </a>
                  </div>
                </div>
                <div className="values">To: <span>{item.returnValues.to}</span></div>
                <div className="values">Quantity: <span>{fromWei(item.returnValues.quantity).toLocaleString('en-US', { maximumFractionDigits: 4 })}</span> DMTN</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="events-link">
        <a href={`${endpoints.scan}address/${contracts.saleContract}#events`} target="_blank">Click here to view all the Dalmatian 101 events.</a>
      </div>
    </div>
  )
}

export default Transaction