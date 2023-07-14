import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { _id } = useContext(CurrentUserContext);
  
  const isOwner = card.owner === _id;
  const isLiked = card.likes.some(item => item === _id);

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardDelete() {
    onCardDelete(card._id);
  }
  
  return (
    <li className="element">
      {isOwner && 
        <button 
          type="button" 
          className="element__trash" 
          name="trash" 
          aria-label="Удалить" 
          onClick={handleCardDelete}
        />
      }
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__bottom">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-area">
          <button 
            type="button" 
            className={`element__like ${isLiked && 'element__like_active'}`} 
            name="like" aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="element__number-of-likes">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;