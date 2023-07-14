import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormWithValidation from '../utils/useFormWithValidation';
import Popup from './Popup';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const { values, errors, resetForm, handleChange, isValid } = useFormWithValidation(); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  useEffect(() => resetForm(), [isOpen, resetForm]);

  return (
    <Popup name='edit-avatar' isOpen={isOpen}>
      <PopupWithForm 
        name='avatar-edit'
        title='Обновить аватар'
        onSubmit={handleSubmit}
        isFormValid={isValid}
        >
        <fieldset className='popup__fieldset'>
          <input
            value={values.avatar || ''}
            id='avatar-input'
            type='url'
            className={`popup__input ${errors.avatar && 'popup__input_type_error'}`}
            name='avatar'
            placeholder='Ссылка на изображение'
            required='required'
            onChange={handleChange}
            />
          <span className='popup__error popup__error_visible'>{errors.avatar || ''}</span>
        </fieldset>
      </PopupWithForm>
    </Popup>
  );
}

export default EditAvatarPopup;