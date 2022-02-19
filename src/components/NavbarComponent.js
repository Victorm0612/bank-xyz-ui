import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/img/logo.png';
import './NavbarComponent.scss';

const NavbarComponent = ({ children }) => (
  <header className="nav justify-content-center">
    <Link to="/">
      <img src={logoImg} alt="logo-bank-xyz" width="60" height="auto" />
    </Link>
    {children}
  </header>
);

export default NavbarComponent;
