import React from 'react';
import CloseIcon from '../images/logo/CloseIcon.svg';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
            <img className="popup__close link-hover" onClick={props.onClose} src={CloseIcon}  alt="закрыть"/>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} action="#" method="get" noValidate>
                    {props.children}
                    <button className="popup__button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;