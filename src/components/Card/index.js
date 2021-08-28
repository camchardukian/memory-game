import React from 'react'
import { CARD_TYPES } from '../../utils/constants'
import './styles.scss'
const Card = ({ cardInfo, onClick, index }) => {
   const { type, content, isFlippedToBack } = cardInfo
   if (type === CARD_TYPES.IMAGE) {
      return <div>images in development...</div>
   } else if (type === CARD_TYPES.TEXT)
      return (
         <div className="card" onClick={() => onClick(index)}>
            <div className="card-inner-content-container">
               <div
                  className={`card-inner-content ${
                     isFlippedToBack ? 'flipped-inner-content' : ''
                  }`}
               >
                  <div className="card-front">{content}</div>
                  <div className="card-back">?</div>
               </div>
            </div>
         </div>
      )
}

export default Card
