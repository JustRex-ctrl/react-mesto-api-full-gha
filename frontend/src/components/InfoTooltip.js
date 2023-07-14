import React from 'react';
import Popup from './Popup';
import failImage from '../images/info-tooltip-fail.svg';
import successImage from '../images/info-tooltip-succes.svg';

export const InfoTooltip = ({ isOpen, isRegisterSuccess }) => {
  
  return(
    <Popup name='tooltip' isOpen={isOpen}>
      <>
        <img className='popup__tooltip-image' src={isRegisterSuccess ? successImage : failImage} alt='статус регситрации' />
        <p className='popup__tooltip-text'> 
          {isRegisterSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </>
    </Popup>
  );
}