import React, { useState, useEffect } from 'react'
import CardMatchingPage from './containers/CardMatchingPage'
import SelectModePage from './containers/SelectModePage'
import CreateCardPage from './containers/CreateCardPage'
import Card from './components/Card'
import { TWELVE_CARDS_DEFAULT_DATA, MODE } from './utils/constants'
import Helpers from './utils/Helpers'

import './App.scss'

// Note: this function provides only a degree of randomness -- not true randomness.
const shuffleArray = (array) => {
   return array.sort(() => Math.random() - 0.5)
}

const App = () => {
   const [cardsArray, setCardsArray] = useState(shuffleArray(TWELVE_CARDS_DEFAULT_DATA))
   const [cardToBeCreated, setCardToBeCreated] = useState('')
   const [createdCardsArray, setCreatedCardsArray] = useState([])
   const [flippedCards, setFlippedCards] = useState([])
   const [mode, setMode] = useState('')

   const handleSetMode = (args) => {
      const { mode, shouldResetCardsArray } = args
      if (shouldResetCardsArray) {
         setCardsArray(() => {
            const updatedCardsArray = TWELVE_CARDS_DEFAULT_DATA.map((item) => {
               item.isFlippedToBack = true
               return item
            })
            return shuffleArray(updatedCardsArray)
         })
      }
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

   const handleChangeCreatedCardValue = (e) => {
      setCardToBeCreated(Helpers.generateCreatedCard(e.target.value.trim()))
   }

   const handleCreateCard = () => {
      if (createdCardsArray.some((existingCard) => existingCard.content === cardToBeCreated.content)) {
         return alert('Error: Please enter a unique card value.')
      } 
      setCreatedCardsArray((prevState) => {
         const updatedCardsArray = [...prevState]
         updatedCardsArray.push(cardToBeCreated)
         const matchingCardToBeCreated = Object.assign({}, cardToBeCreated)
         updatedCardsArray.push(matchingCardToBeCreated)
         return updatedCardsArray
      })
   }

   const handleStartCustomGame = () => {
      setCardsArray(() => {
         const updatedCardsArray = createdCardsArray.map((card) => {
            card.isFlippedToBack = true
            return card
         })
         return shuffleArray(updatedCardsArray)
      })
      setMode('PLAY_NOW')
   }

   const handleReturnHome = () => {
      handleSetMode('')
      setCardsArray([])
      setCreatedCardsArray([])
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
                  mode === MODE.CUSTOM_PLAY && (
                     <>
                        <CreateCardPage
                           onChangeCreatedCardValue={handleChangeCreatedCardValue}
                           onCreateCard={handleCreateCard}
                        />
                        <div className="created-cards-list-container">
                           {createdCardsArray.map((cardInfo, index) => {
                              return (
                                 <Card
                                    key={index}
                                    cardInfo={cardInfo}
                                    onClick={() => null}
                                 />
                              )
                           })}
                        </div>
                     </>
                  )
               )}
               <button className="return-home-btn" onClick={handleReturnHome}>
                  Home
               </button>
               {mode === MODE.CUSTOM_PLAY && (
                  <button
                     disabled={!createdCardsArray.length}
                     className="start-custom-game-btn"
                     onClick={handleStartCustomGame}
                  >
                     Start Game
                  </button>
               )}
            </>
         ) : (
            <SelectModePage onClickSetMode={handleSetMode} />
         )}
      </div>
   )
}

export default App
