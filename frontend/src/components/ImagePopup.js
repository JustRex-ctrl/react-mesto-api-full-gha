import React from 'react';
import Popup from './Popup';

function ImagePopup({ card }) {

  return (
    <Popup name='image' isOpen={card.link}>
      <>
        <img src= {card.link} alt={card.name} className="popup__image-view"/>
        <p className="popup__image-title">{card.name}</p>
      </>
    </Popup>
  );
}

export default ImagePopup;