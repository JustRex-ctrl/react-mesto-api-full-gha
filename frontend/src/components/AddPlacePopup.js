import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../utils/useFormWithValidation";
import Popup from "./Popup";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => resetForm(), [isOpen, resetForm]);

  return (
    <Popup
      isOpen={isOpen}
      name={'add-place'}
    >
      <PopupWithForm
        name='card-form'
        title='Новое место'
        buttonText='Создать'
        onSubmit={handleSubmit}
        isFormValid={isValid}
      >
        <fieldset className="popup__fieldset">
          <input
            id="title-input"
            type="text"
            className={`popup__input ${errors.name && 'popup__input_type_error'}`}
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required="required"
            value={values.name || ''}
            onChange={handleChange}
            />
          <span className="popup__error popup__error_visible">{errors.name || ''}</span>
          <input
            id="url-input"
            type="url"
            className={`popup__input ${errors.link && 'popup__input_type_error'}`}
            name="link"
            placeholder="Ссылка на картинку"
            required="required"
            value={values.link || ''}
            onChange={handleChange}
            />
          <span className="popup__error popup__error_visible">{errors.link || ''}</span>
        </fieldset>
      </PopupWithForm>
    </Popup>
  );
}

export default AddPlacePopup;