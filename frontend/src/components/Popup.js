import { useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function Popup({ name, isOpen, children }) {
  const { onClose } = useContext(AppContext);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  } 

  useEffect(() => {
    if (!isOpen) return;
    const handleClosePopup = (e) => {
      if(e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleClosePopup);
    return () => {
      document.removeEventListener('keydown', handleClosePopup);
    }
  }, [isOpen, onClose]);

  return (
    <div onMouseUp={handleOverlay}  className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className= {`popup__container popup__container_type_${name}`}>
        <button type="button" onClick={onClose} className="popup__close-btn" name="form-close" aria-label="Закрыть" />
          {children}
      </div>
    </div>
  );
}

export default Popup;