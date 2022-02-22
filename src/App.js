import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/Login/LoginComponent';
import NavbarComponent from './components/NavbarComponent';
import ServiceComponent from './components/Services/ServiceComponent';
import ServicesMenuComponent from './components/Services/ServicesMenuComponent';
import NotFoundedComponent from './components/UI/NotFoundedComponent';
import ToastComponent from './components/UI/ToastComponent';
import WaitingComponent from './components/WaitingComponent/WaitingComponent';
import MenuOptionsComponent from './components/MenuOptions/MenuOptionsComponent';


const App = () => (
  <div className="App">
    <ToastComponent />
    <NavbarComponent>
      <h1 className="home-title text-center">¡Bienvenido a XYZ Bank!</h1>
    </NavbarComponent>
    <Routes>
      <Route path="/home" exact element={<HomeComponent />} />
      <Route path="/services" element={<ServicesMenuComponent />} />
      <Route path="/services/:id" element={<ServiceComponent />} />
      <Route path="/" exact element={<LoginComponent />} />
      <Route path="/waiting" element={<WaitingComponent />} />
      <Route path="/options" element={<MenuOptionsComponent />} />
      <Route path="*" element={<NotFoundedComponent />} />
    </Routes>
  </div>
);

export default App;
