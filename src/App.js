import React, { useState, useEffect } from 'react'
import CardMatchingPage from './containers/CardMatchingPage'
import { TWELVE_CARDS_DEFAULT_DATA } from './utils/constants'

const App = () => {
   const [cardsArray, setCardsArray] = useState(TWELVE_CARDS_DEFAULT_DATA)
   const [numberOfFlippedCards, setNumberOfFlippedCards] = useState(0)

   useEffect(() => {
      setNumberOfFlippedCards(() => {
         return cardsArray.reduce((a, c) => (c.isFlippedToBack === false ? ++a : a), 0)
      })
   }, [cardsArray])

   const handleClickCard = (index) => {
      console.log('cardsArray[index]', cardsArray[index]['isFlippedToBack'])
      if (numberOfFlippedCards < 2 || !cardsArray[index]['isFlippedToBack']) {
         let updatedCardsArray = [...cardsArray]
         updatedCardsArray[index]['isFlippedToBack'] =
            !updatedCardsArray[index]['isFlippedToBack']
         setCardsArray(updatedCardsArray)
      }
   }
   return (
      <div className="App">
         <CardMatchingPage
            cardsArray={TWELVE_CARDS_DEFAULT_DATA}
            onClickCard={handleClickCard}
         />
      </div>
   )
}

export default App
