import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { InfoToolTip } from "./InfoTooltip.js";
import { Login } from "./Login.js";
import { Register } from "./Register.js";

import ProtectedRoute from "./ProtectedRoute.js";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithForm from "./PopupWithForm.js";

import apiSetting from '../utils/Api.js';
import * as auth from "../utils/auth.js";

import ok from "../images/logo/ok.svg"
import notOk from "../images/logo/notok.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const [checkStatusData, setCheckStatusData] = useState({image: "",text: "",});
  const [isCheckStatusPopup, setIsCheckStatusPopup] = useState(false);
  const navigate = useNavigate();



  const handleLogin = (email, password) => {
    auth
      .authorization(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmailValue(email);
        navigate("/");
      })
      .catch(() => {
        setCheckStatusData({
          image: notOk,
          title: "Что то пошло не так! Попробуйте еще раз.",
        });
        handleCheckStatusPopup();
      });
  };

  const logout = () => {
    setLoggedIn(false);
    setEmailValue(null);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmailValue(res.data.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  });

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setCheckStatusData({
          image: ok,
          title: "Вы успешно зарегистрировались!",
        });
        setLoggedIn(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setCheckStatusData({
          image: notOk,
          title: "Что-то пошло не так! Попробуйте еще раз.",
        });
        console.log(err);
      })
      .finally(() => {
        handleCheckStatusPopup();
      });
  };

  useEffect(() => {
    if (loggedIn) {
      apiSetting
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      apiSetting
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardDelete(cardId) {
    apiSetting.deleteCard(cardId)
    .then(() => setCards(cards => cards.filter(с => с._id !== cardId)))
    .catch(err => console.log(`Ошибка: ${err.status}`));
}

  function handleUpdateUser(name, about) {
    apiSetting.setUserInfo(name, about)
    .then(res => {
    setCurrentUser(res);
    closeAllPopups();
  })
  .catch(err => console.log(`Ошибка: ${err.status}`)); 
}

  function handleUpdateAvatar(avatar) {
    apiSetting.installAvatar(avatar)
    .then((res) => {
    setCurrentUser(res);
    closeAllPopups();
})
.catch(err => console.log(`Ошибка: ${err.status}`));
}

function handleCardLike(card, isLiked) {
   const cardId = card._id;
  if (!isLiked) {
    apiSetting.likeCard(cardId)
      .then((res) => {
        const newCards = cards.map((c) => (c._id === card._id ? res : c));
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err.status}`));
  } else {
    apiSetting.likeRemove(cardId)
      .then((res) => {
        const newCards = cards.map((c) => (c._id === card._id ? res : c));
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err.status}`));
  }
}

  function handleAddPlaceSubmit(card) {
    apiSetting.getPlaceCard(card)
    .then(newCard => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch(err => console.log(`Ошибка: ${err.status}`));
}
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
    setIsImagePopupOpen(true);
  }

  function handleCheckStatusPopup() {
    setIsCheckStatusPopup(true);
  }
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsCheckStatusPopup(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login handleLogin={handleLogin} />
            </>
          }
        />

        <Route
          path="/sign-up"
          element={
            <>
              <Header title="Войти" route="/sign-in" />
              <Register handleRegister={handleRegister} />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Header
                email={emailValue}
                title="Выйти"
                route="/"
                onClick={logout}
              />

              <ProtectedRoute
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                element={Main}
                loggedIn={loggedIn}
              />
            </>
          }
        ></Route>

        <Route
          path="*"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/sign-up" replace />
            )
          }
        />
      </Routes>
      
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}
      />

      <PopupWithForm
        submitButtonText="Да"
        title="Вы уверены?"
        name="warning"
      />

      <InfoToolTip
        isOpen={isCheckStatusPopup}
        onClose={closeAllPopups}
        image={checkStatusData.image}
        title={checkStatusData.title}
      />
      <Footer/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
