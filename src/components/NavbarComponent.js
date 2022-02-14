import React from 'react';
import logoImg from '../assets/img/logo.png';
import './NavbarComponent.scss';

const NavbarComponent = () => (
  <header className="navbar">
    <img src={logoImg} alt="logo-bank-xyz" width="60" height="auto" />
  </header>
);

export default NavbarComponent;
