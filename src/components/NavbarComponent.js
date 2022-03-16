import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImg from '../assets/img/logo.png';
import './NavbarComponent.scss';

const NavbarComponent = ({ children }) => {
  const { isLogged } = useSelector((state) => state.user);
  return (
    <header className="nav justify-content-center">
      <Link to={isLogged ? '/options' : '/'}>
        <img src={logoImg} alt="logo-bank-xyz" width="60" height="auto" />
      </Link>
      {children}
    </header>
  );
};

export default NavbarComponent;
