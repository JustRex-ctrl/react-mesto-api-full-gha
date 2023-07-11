import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [ name, setName] = React.useState('');
  const [ link, setLink] = React.useState('');
  
  
  function handleNameChange(e) {
    setName(e.target.value);
  }
  
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
    isOpen={isOpen}
    name="add-card"
    title="Новое место"
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText='Сохранить'>     
    <input className='popup__input' placeholder="Название" minLength="2" maxLength="30"
     value={name}
     onChange={handleNameChange}></input>
    <input className='popup__input' placeholder="Ссылка на картинку"
     value={link}
     onChange={handleLinkChange}
    ></input>
  </PopupWithForm>
  );
}

export default AddPlacePopup;