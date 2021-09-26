import React from 'react'
import './styles.scss'
import Card from '../../components/Card'
const CardMatchingPage = ({ cardsArray = [], onClickCard }) => {
   return (
      <div className="card-matching-page-container">
         {cardsArray.length > 0 ? (
            <div className="cards-list">
               {cardsArray.map((cardInfo, index) => {
                  return (
                     <Card
                        key={index}
                        index={index}
                        onClick={(index) => onClickCard(index)}
                        cardInfo={cardInfo}
                     />
                  )
               })}
            </div>
         ) : (
            <div className="winner-text">YOU WIN!!!!</div>
         )}
      </div>
   )
}

export default CardMatchingPage
