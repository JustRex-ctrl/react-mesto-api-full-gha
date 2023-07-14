import logo from '../images/header-logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignout }) {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="логотип Место"/>
        <span className="header__user-email">{loggedIn && userEmail}</span>
        <Routes>
          <Route path='/sign-in' element={<Link className="header__link" to='/sign-up'>Регистрация</Link>} />
          <Route path='/sign-up' element={<Link className="header__link" to='/sign-in'>Вход</Link>} />
          <Route path='/' element={<Link onClick={onSignout} className="header__link" to='/sign-in'>Выход</Link>} />
        </Routes>
    </header>
  );
}

export default Header;