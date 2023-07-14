import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Form({ title, buttonText, onSubmit, isFormValid, children }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className='form-section'>
      <h2 className='form-section__header'>{title}</h2>
      <form onSubmit={onSubmit} action='#' name='form' className='form-section__form' noValidate>
        {children}
        <button 
          type='submit'
          className={`form-section__button ${!isFormValid && 'form-section__button_disablded'}`}
          name='form-submit'
          disabled={!isFormValid}
        >
          {buttonText}
        </button>
      </form>
      {pathname === '/sign-up' && <span className='form-section__text'>Уже зарегистрированы? <Link className='form-section__link' to='/sign-in'>Войти</Link></span>}
    </div>
  );
}

export default Form;