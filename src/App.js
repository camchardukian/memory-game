import React, { useState } from "react";
import CardMatchingPage from "./containers/CardMatchingPage";
import { TWELVE_CARDS_DEFAULT_DATA } from "./utils/constants";
const App = () => {
  const [cardsArray, setCardsArray] = useState(TWELVE_CARDS_DEFAULT_DATA);
  const handleClickCard = (index) => {
    let updatedCardsArray = [...cardsArray];
  updatedCardsArray[index]['isFlippedToBack'] = !updatedCardsArray[index]['isFlippedToBack']
    setCardsArray(updatedCardsArray);
  };
  return (
    <div className="App">
      <CardMatchingPage
        cardsArray={TWELVE_CARDS_DEFAULT_DATA}
        onClickCard={handleClickCard}
      />
    </div>
  );
};

export default App;
