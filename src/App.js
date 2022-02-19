import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';
import ServiceComponent from './components/Services/ServiceComponent';
import ServicesMenuComponent from './components/Services/ServicesMenuComponent';
import NotFoundedComponent from './components/UI/NotFoundedComponent';
import ToastComponent from './components/UI/ToastComponent';

const App = () => (
  <div className="App">
    <ToastComponent />
    <NavbarComponent>
      <h1 className="home-title text-center">¡Bienvenido a XYZ Bank!</h1>
    </NavbarComponent>
    <Routes>
      <Route path="/" exact element={<HomeComponent />} />
      <Route path="/services" element={<ServicesMenuComponent />} />
      <Route path="/services/:id" element={<ServiceComponent />} />
      <Route path="*" element={<NotFoundedComponent />} />
    </Routes>
  </div>
);

export default App;
