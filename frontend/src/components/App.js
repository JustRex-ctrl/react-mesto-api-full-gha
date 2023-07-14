import Header from './Header';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRouteElement';

import React, { useState, useEffect, useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { InfoTooltip } from './InfoTooltip';

import api from '../utils/Api';
import auth from '../utils/auth';

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  
  const [deletionCardId, setDeletionCardId] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [userEmail, setUserEmail] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  
  const navigate = useNavigate();
 
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleCardClick(card) { 
    setSelectedCard(card);
  }
  
  function handleDeleteClick(cardId) {
    setIsDeleteCardPopupOpen(true);
    setDeletionCardId(cardId);
  }
  
  function handleCardLike(card, isLiked) { 
    api.clickLike(card._id, isLiked)
    .then((res) => setCards(cards => cards.map(c => c._id === card._id ? res : c)))
    .catch((err) => console.log(`Ошибка: ${err.status}`));
  }
  
  function handleSubmit(request) {
    setIsSaving(true);
    request()
    .then(closeAllPopups)
    .catch(console.error)
    .finally(() => setIsSaving(false));
  }
  
  function handleCardDelete() {
    function makeRequest() {
      return (
        api.deleteCard(deletionCardId)
        .then(() => setCards(cards => cards.filter(с => с._id !== deletionCardId)))
      );
    }
    handleSubmit(makeRequest);
  }
  
  function handleUpdateUser(userData) {
    function makeRequest() {
      return api.patchUserInfo(userData).then(res => setCurrentUser(res));
    }
    handleSubmit(makeRequest);
  }
  
  function handleUpdateAvatar(avatar) {
    function makeRequest() {
      return api.patchAvatar(avatar).then(res => setCurrentUser(res));
    }
    handleSubmit(makeRequest);
  }
  
  function handleAddPlaceSubmit(card) {
    function makeRequest() {
      return api.postCard(card).then(newCard => setCards([newCard, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  function handleRegister({ email, password }) {
    auth.registration({ email, password })
    .then(() => {
      setIsRegisterSuccess(true);
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      setIsRegisterSuccess(false);
      console.log(err);
    })
    .finally(() => setIsInfoTooltipOpen(true))
  }
  
  
  function handleLogin({ email, password }) {
    auth.login({ email, password })
    .then((res) => {
      if(res.email) {
        localStorage.setItem('userLoggedIn', true);
        setUserEmail(email);
        setLoggedIn(true); 
        navigate('/', {replace: true});
      }
    })
    .catch(console.error);
  }

  const checkToken = useCallback(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if(userLoggedIn === 'true') {
      auth.checkToken()
      .then(res => {
        if(res.email) {
          setUserEmail(res.email);
          setLoggedIn(true); 
          navigate('/', {replace: true});
        }
      })
      .catch(console.error);
    }
  }, [navigate]);

  function handleSignout() {
    setUserEmail('');
    setLoggedIn(false);
    localStorage.setItem('userLoggedIn', false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard({});
  }

  useEffect(() => {
    checkToken();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`));
  },[checkToken]);

  return (
    <div className="page">
      <AppContext.Provider value={{ isSaving, onClose: closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} userEmail={userEmail} onSignout={handleSignout} />
          
          <Routes>
            <Route path='/' element={
              <ProtectedRouteElement 
                element= {Main}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }/>
            <Route path='/sign-up' element={<Register onRegister={handleRegister}/>} />
            <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          </Routes>

          <InfoTooltip isOpen={isInfoTooltipOpen} isRegisterSuccess={isRegisterSuccess} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />
          <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onDeleteCard={handleCardDelete} />
          <ImagePopup card={selectedCard} />
          {loggedIn && <Footer />}
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
