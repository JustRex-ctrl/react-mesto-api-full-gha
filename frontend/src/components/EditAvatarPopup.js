import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = React.useRef();
  
    function handleSubmit(e) {
      e.preventDefault();
      onUpdateAvatar(inputRef.current.value);
    }
    return(
        <PopupWithForm
        isOpen={isOpen}
        name="avatar"
        title="Обновить аватар"
        onClose={onClose}
        buttonText='Сохранить'
        onSubmit={handleSubmit}>
        <input className='popup__input' placeholder="Ссылка на картинку" ref={inputRef}></input>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;