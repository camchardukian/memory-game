import React from 'react'
import './styles.scss'
import Card from '../../components/Card'
const CardMatchingPage = ({ cardsArray = [], onClickCard }) => {
   return (
      <div className="card-matching-page-container">
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
      </div>
   )
}

export default CardMatchingPage
