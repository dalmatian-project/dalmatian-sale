import Backdrop from './Backdrop'
import { AiOutlineClose } from 'react-icons/ai'

const AccountModal = props => {
  const { visible, heading, onClose, walletData, children } = props

  return (
    <Backdrop open={visible}>
      <div className="wallet-card">
        <div className="wallet-header">
          <div className="wallet-header-text">{heading}</div>
          <div className="wallet-close" onClick={() => onClose()}>
            <AiOutlineClose size={25} />
          </div>
        </div>
        {children(walletData)}
      </div>
    </Backdrop>
  )
}

export default AccountModal