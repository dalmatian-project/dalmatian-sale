import { AiOutlineClose } from 'react-icons/ai'

const Roadmap = props => {
  const { setRoadmapModal } = props

  return (
    <div className="modal-card roadmap">
      <div className="modal-header">
        <div className="modal-header-text">101 Dalmatian Roadmap</div>
        <div className="modal-close" onClick={() => setRoadmapModal(false)}>
          <AiOutlineClose size={25} />
        </div>
      </div>
      <div className="modal-body">
        <ul className="roadmap-list">
          <li className="active">
            <div className="text">
              Initial auction offering during 101 days
            </div>
            <div className="round"></div>
          </li>
          <li>
            <div className="text">
              LP Providing & DEX offering
            </div>
            <div className="round"></div>
          </li>
          <li>
            <div className="text">
              Farming Start
            </div>
            <div className="round"></div>
          </li>
          <li>
            <div className="text">
              Dalmatian NFT Market
            </div>
            <div className="round"></div>
          </li>
          <li>
            <div className="text">
              Launching Dalmatian ECO Fund
            </div>
            <div className="round"></div>
          </li>
          <li>
            <div className="text">
              Dalmatian DAO Lending
            </div>
            <div className="round"></div>
          </li>
          <li>
            <div className="text">
              Dalmatian Hackaton
            </div>
            <div className="round"></div>
          </li>
        </ul>
        <div className="dot">.</div>
        <div className="dot">.</div>
        <div className="dot">.</div>
        <div className="dot">.</div>
        <div className="roadmap-text">
          World's Biggest MEEM COIN!
        </div>
      </div>
    </div>
  )
}

export default Roadmap