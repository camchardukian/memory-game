import React from 'react'
import { CARD_TYPES } from '../../utils/constants'
import './styles.scss'
const Card = ({ cardInfo, onClick, index }) => {
   const { type, content, isFlippedToBack } = cardInfo
   return (
      <div className="card" onClick={() => onClick(index)}>
         <div className="card-inner-content-container">
            <div
               className={`card-inner-content ${
                  isFlippedToBack ? 'flipped-inner-content' : ''
               }`}
            >
               <div className="card-front">
                  {type === CARD_TYPES.TEXT ? (
                     content
                  ) : (
                     <img className="card-image" src={content} alt="" />
                  )}
               </div>
               <div className="card-back">?</div>
            </div>
         </div>
      </div>
   )
}

export default Card
