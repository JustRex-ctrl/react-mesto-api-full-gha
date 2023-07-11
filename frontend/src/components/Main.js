import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete,cards}) {
  const currentUser = React.useContext(CurrentUserContext);

    return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-edit-btn" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"  name="avatar"/>
        </button>
        <div className="profile__info">
            <div className="profile__name">
                <h1 className="profile__name-title">{currentUser.name}</h1>
                <button className="profile__edit-button link-hover" onClick={onEditProfile} type="button"></button>
            </div>
            <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button className="profile__add-button link-hover" onClick={onAddPlace} type="button"></button>
      </section>
      
      <section className="elements">
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
      </section>
    </main>
    );
  }
  
  export default Main;