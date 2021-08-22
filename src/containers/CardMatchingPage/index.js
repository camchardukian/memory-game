import React from "react";
import "./styles.scss";
import Card from "../../components/Card";
const CardMatchingPage = ({ cardsArray = [] }) => {
  return (
    <div className="card-matching-page-container">
      <div className="cards-list">
        {cardsArray.map((cardInfo, index) => {
          return <Card key={index} cardInfo={cardInfo} />;
        })}
      </div>
    </div>
  );
};

export default CardMatchingPage;
