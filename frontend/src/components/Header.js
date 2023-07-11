import logo from '../images/logo/Vector.svg';
import { Link, useLocation } from "react-router-dom";
import Hamburger from 'hamburger-react';
import { useState } from 'react';

const getMenu = (onClick, pathname, setNavActive) => { 

  if (pathname === '/sign-up') {
    return <Link
        to='/sign-in'
        className="header__link"
        type="button"
        onClick={onClick}>
        Вход
      </Link>
  }

  if(pathname === '/sign-in') {
    return  <Link
      to='/sign-up'
      className="header__link"
      type="button"
      onClick={onClick}>
      Регистрация
    </Link>
  }
  return <Hamburger color='white' onToggle={toggle => {
    setNavActive(toggle);
   }}/>
  
}
function Header(props) {
  const [navActive, setNavActive] = useState(false);
  const {pathname} = useLocation();
  debugger
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Место"/>
        <div className={`header__nav ${navActive ? 'header__nav_active':''}`}>
        <p className="header__user-email">{props.email}</p>
        <Link
          to={props.route}
          className="header__link"
          type="button"
          onClick={props.onClick}>
          {props.title}
        </Link>
      </div>
      <div className='header__hamburger'>
        {getMenu(props.onClick, pathname, setNavActive)}
      </div>
      </header>  

    );
  }
  
  export default Header;