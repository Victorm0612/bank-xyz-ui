import React from 'react';
import logoImg from '../assets/img/logo.png';
import './NavbarComponent.scss';

const NavbarComponent = ({ children }) => (
  <header className="nav justify-content-center">
    <img src={logoImg} alt="logo-bank-xyz" width="60" height="auto" />
    {children}
  </header>
);

export default NavbarComponent;
