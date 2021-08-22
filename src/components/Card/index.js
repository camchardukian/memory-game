import React from "react";
import { CARD_TYPES } from "../../utils/constants";
import "./styles.scss";
const Card = ({ cardInfo }) => {
  if (cardInfo.type === CARD_TYPES.IMAGE) {
    return <div>images in development...</div>;
  } else if (cardInfo.type === CARD_TYPES.TEXT)
    return <div className="card">{cardInfo.content}</div>;
};

export default Card;
