import React from 'react';
import './App.scss';
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';
import ToastComponent from './components/UI/ToastComponent';

const App = () => (
  <div className="App">
    <ToastComponent />
    <NavbarComponent>
      <h1 className="home-title text-center">¡Bienvenido a XYZ Bank!</h1>
    </NavbarComponent>
    <HomeComponent />
  </div>
);

export default App;
