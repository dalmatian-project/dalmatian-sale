import { AiOutlineClose } from 'react-icons/ai'

const Rules = props => {
  const { setRuleModal } = props

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-header-text">101 Dalmatian Rules</div>
        <div className="modal-close" onClick={() => setRuleModal(false)}>
          <AiOutlineClose size={25} />
        </div>
      </div>
      <div className="modal-body">
        <div className="main-header">How to Sale</div>
        <ul>
          <li>Dalmatian 101 Token (DMTN) will be sold for a total of 101 rounds.</li>
          <li>The first round of sales is 101,000,000 DMTN.</li>
          <li>The sales amount is reduced by 1,000,000 DMTN each round.</li>
          <li>The last round, 101 rounds, sold 1,010,000 DMTN</li>
          <li>The total sales for all rounds is 5,151,010,000 DMTN</li>
          <li>You have to deposit Ethereum for purchase.</li>
          <li>DMTN will be allocated to the Ethereum amount you deposited among the total Ethereum amount for each round.</li>
          <li>The initial supply of DMTN is zero and will be minted at the end of each round.</li>
          <li>Each round begins when the first Ethereum deposit is made, and the round continues until 6,500 blocks (about 1 day) are created.</li>
        </ul>
        <div className="main-header">How to Buy</div>
        <ul>
          <li>Connect the Ethereum Wallet.</li>
          <li>Input the amount of Ethereum to deposit and click the buy button.</li>
          <li>Wait for the bought round to end.</li>
          <li>Once the round is over, you can check how much DMTN is allocated.</li>
          <li>If you have a DMTN balance, please press the withdrawal button anytime.</li>
          <li>DMTN will be automatically minted to your wallet.</li>
        </ul>
      </div>
    </div>
  )
}

export default Rules