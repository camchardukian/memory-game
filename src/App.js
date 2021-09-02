import React, { useState, useEffect } from 'react'
import CardMatchingPage from './containers/CardMatchingPage'
import { TWELVE_CARDS_DEFAULT_DATA } from './utils/constants'

const shuffleArray = (array) => {
   return array.sort(() => Math.random() - 0.5)
}

const App = () => {
   const [cardsArray, setCardsArray] = useState(shuffleArray(TWELVE_CARDS_DEFAULT_DATA))
   const [flippedCards, setFlippedCards] = useState([])

   useEffect(() => {
      if (flippedCards.length === 2) {
         if (flippedCards[0]['keyForMatching'] === flippedCards[1]['keyForMatching']) {
            setTimeout(() => {
               setCardsArray((prevState) => {
                  return prevState.filter((item) => {
                     return item.keyForMatching !== flippedCards[0]['keyForMatching']
                  })
               })
            }, 1000)
            setFlippedCards([])
         } else {
            setTimeout(() => {
               setCardsArray((prevState) => {
                  return prevState.map((item) => {
                     item.isFlippedToBack = true
                     return item
                  })
               })
            }, 1000)
            setFlippedCards([])
         }
      }
   }, [cardsArray, flippedCards])

   const handleClickCard = (index) => {
      const isClickedCardAlreadyFlipped = !cardsArray[index]['isFlippedToBack']
      if (isClickedCardAlreadyFlipped) {
         return
      } else if (flippedCards.length < 2) {
         setFlippedCards((prevState) => {
            const updatedFlippedCards = [...prevState]
            updatedFlippedCards.push(cardsArray[index])
            return updatedFlippedCards
         })
         let updatedCardsArray = [...cardsArray]
         updatedCardsArray[index]['isFlippedToBack'] =
            !updatedCardsArray[index]['isFlippedToBack']
         setCardsArray(updatedCardsArray)
      }
   }
   return (
      <div className="App">
         <CardMatchingPage cardsArray={cardsArray} onClickCard={handleClickCard} />
      </div>
   )
}

export default App
