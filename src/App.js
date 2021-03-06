import React, { useState, useEffect } from 'react'
import CardMatchingPage from './containers/CardMatchingPage'
import SelectModePage from './containers/SelectModePage'
import CreateCardPage from './containers/CreateCardPage'
import Card from './components/Card'
import { TWELVE_CARDS_DEFAULT_DATA, MODE, CARD_TYPES } from './utils/constants'
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
   const [isCardFlippingEnabled, setIsCardFlippingEnabled] = useState(true)
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
         setIsCardFlippingEnabled(false)
         setTimeout(() => {
            setIsCardFlippingEnabled(true)
         }, 1000)
         if (flippedCards[0]['keyForMatching'] === flippedCards[1]['keyForMatching']) {
            setTimeout(() => {
               setCardsArray((prevState) => {
                  return prevState.map((item) => {
                     item.isFlippedToBack = true
                     return item
                  })
               })
               setTimeout(() => {
                  setCardsArray((prevState) => {
                     return prevState.filter((item) => {
                        return item.keyForMatching !== flippedCards[0]['keyForMatching']
                     })
                  })
               }, 500)
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
      } else if (flippedCards.length < 2 && isCardFlippingEnabled) {
         setFlippedCards((prevState) => {
            const updatedFlippedCards = [...prevState]
            updatedFlippedCards.push(cardsArray[index])
            return updatedFlippedCards
         })
         let updatedCardsArray = [...cardsArray]
         updatedCardsArray[index]['isFlippedToBack'] = false
         setCardsArray(updatedCardsArray)
      }
   }

   const handleChangeCreatedTextCardValue = (e) => {
      setCardToBeCreated(
         Helpers.generateCreatedCard({
            type: CARD_TYPES.TEXT,
            content: e.target.value.trim(),
         })
      )
   }

   const handleChangeCreatedImageCardValue = (imageFile) => {
      setCardToBeCreated(
         Helpers.generateCreatedCard({ type: CARD_TYPES.IMAGE, content: imageFile })
      )
   }

   const handleCreateCard = () => {
      if (
         createdCardsArray.some(
            (existingCard) => existingCard.content === cardToBeCreated.content
         )
      ) {
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

   const handleClickPlayAgain = () => {
      if (createdCardsArray.length) {
         setCardsArray(shuffleArray(createdCardsArray))
      } else {
         setCardsArray(shuffleArray(TWELVE_CARDS_DEFAULT_DATA))
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
                  mode === MODE.CUSTOM_PLAY && (
                     <>
                        <CreateCardPage
                           onChangeCreatedTextCardValue={handleChangeCreatedTextCardValue}
                           onChangeCreatedImageCardValue={
                              handleChangeCreatedImageCardValue
                           }
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
               {cardsArray.length === 0 && mode === MODE.PLAY_NOW && (
                  <button className="play-again-btn" onClick={handleClickPlayAgain}>
                     Play again
                  </button>
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
