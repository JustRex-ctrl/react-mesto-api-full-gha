import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = (card.owner._id === currentUser._id) ? true : false;
  const isLiked = card.likes.some(item => item._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleCardDelete() {
    onCardDelete(card._id);
  }

  function handleCardClick() {
    onCardClick(card);
  }

    return (
        <div className="card">
          {isOwner && <button className="card__button-delete link-hover" onClick={handleCardDelete}/>}   
          <img className="card__place-image" src={card.link} alt={card.name} onClick={handleCardClick}/>
          <div className="card__caption-place">
            <p className="card__name-place">{card.name}</p>
            <div className="card__like_container">
              <button className={`card__like link-hover ${isLiked && 'card__like_active'}`} onClick={handleLikeClick} type="button"></button>
              <span className="element__like-counter">{card.likes.length}</span>
            </div>
          </div>
      </div>
    );
}

export default Card;