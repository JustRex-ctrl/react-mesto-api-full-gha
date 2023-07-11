import React from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';

function DeleteCardPopup({ isOpen, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return(
    <Popup name='delete-card' isOpen={isOpen}>
      <PopupWithForm
        name='confirmation'
        title='Вы уверены?'
        buttonText='Да'
        onSubmit={handleSubmit}
        isFormValid={true}
      />
    </Popup>
  )
}

export default DeleteCardPopup;