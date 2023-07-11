import CloseIcon from '../images/logo/CloseIcon.svg';
import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image-open ${card.link && 'popup_opened'}`}>
        <div className="popup__container-image">
          <img className="popup__close link-hover" src={CloseIcon}  onClick={onClose} alt="закрыть"/>
          <img className="popup__image-place" src= {card.link} alt={card.name}/>
          <p className="popup__title-image">{card.name}</p>
        </div>
      </div>
    );
}

export default ImagePopup;