import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-area">
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля"/>
          <button type="button" onClick={onEditAvatar} className="profile__avatar-edit-btn" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button 
            type="button"
            onClick={onEditProfile}
            className="profile__edit-btn"
            name="profile-edit"
            aria-label="Редактировать профиль"
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button 
          type="button"
          className="profile__add-btn"
          onClick={onAddPlace}
          name="profile-add"
          aria-label="Добавить фото"
        />
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cards.map((card) => (
           <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
