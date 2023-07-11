import CloseIcon from '../images/logo/CloseIcon.svg';

export function InfoToolTip(props) {
  return (
    <div
      className={`popup popup__tool-tip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_tool-tip"> 
      <img className="popup__close link-hover" src={CloseIcon} type="button" onClick={props.onClose} alt="закрыть"/>
        <img className="popup__img_tool-tip" src={props.image} alt="img"/>
        <h2 className="popup__title_tool-tip">{props.title}</h2>
      </div>
    </div>
  );
}
