import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
      }
    
      function handleChangeAbout(e) {
        setDescription(e.target.value);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name, about: description });
      }
    
      React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    return(
    <PopupWithForm
        isOpen={isOpen}
        name="edit-profile"
        title="Редактировать профиль"
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText='Сохранить'>
      <input className='popup__input popup__input_name' placeholder="ФИО" minLength="2" maxLength="40" 
        value={name} 
        onChange={handleChangeName}></input>
      <input className='popup__input popup__input_job' placeholder="Место работы" minLength="2" maxLength="200"
        value={description}
        onChange={handleChangeAbout}></input>
    </PopupWithForm>
    )
}  

export default EditProfilePopup;