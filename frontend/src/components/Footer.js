import React from 'react';

function Footer() {
  function setCarrentYear() {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  };

  return ( 
    <footer className="footer">
      <p className="footer__copyright">© {setCarrentYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;