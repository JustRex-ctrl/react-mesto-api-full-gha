import React, { useContext } from 'react';
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({ name, title, buttonText, onSubmit, children, isFormValid }) {
  const { isSaving } = useContext(AppContext);

  return ( 
    <>
      <h3 className="popup__title">{title}</h3>
      <form action="#" className="popup__form" name={name} onSubmit={onSubmit} noValidate>
        {children}
        <button 
          type="submit" 
          className={`popup__button ${!isFormValid && 'popup__button_disabled'}`} 
          name="form-submit" 
          disabled={!isFormValid}
          >
          {isSaving ? 'Сохранение...' : buttonText || 'Coхранить'}
        </button>
      </form>
    </>
  );
}

export default PopupWithForm;
