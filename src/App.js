import React, { useState, useEffect } from 'react'
import CardMatchingPage from './containers/CardMatchingPage'
import SelectModePage from './containers/SelectModePage'
import { TWELVE_CARDS_DEFAULT_DATA, MODE } from './utils/constants'
import './App.scss'

// Note: this function provides only a degree of randomness -- not true randomness.
const shuffleArray = (array) => {
   return array.sort(() => Math.random() - 0.5)
}

const App = () => {
   const [cardsArray, setCardsArray] = useState(shuffleArray(TWELVE_CARDS_DEFAULT_DATA))
   const [flippedCards, setFlippedCards] = useState([])
   const [mode, setMode] = useState('')

   const handleSetMode = (mode) => {
      setMode(mode)
   }

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
      <div className="app">
         {mode ? (
            <>
               {mode === MODE.PLAY_NOW ? (
                  <CardMatchingPage
                     cardsArray={cardsArray}
                     onClickCard={handleClickCard}
                  />
               ) : (
                  <div>Custom Card Creation Development in Progress...</div>
               )}
               <button className="return-home-btn" onClick={() => handleSetMode('')}>
                  Home
               </button>
            </>
         ) : (
            <SelectModePage onClickSetMode={handleSetMode} />
         )}
      </div>
   )
}

export default App
