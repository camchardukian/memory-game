import React from "react";
import CardMatchingPage from "./containers/CardMatchingPage";
import { TWELVE_CARDS_DEFAULT_DATA } from "./utils/constants";
function App() {
  return (
    <div className="App">
      <CardMatchingPage cardsArray={TWELVE_CARDS_DEFAULT_DATA} />
    </div>
  );
}

export default App;
