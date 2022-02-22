import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/Login/LoginComponent';
import NavbarComponent from './components/NavbarComponent';
import ServicesMenuComponent from './components/Services/ServicesMenuComponent';
import TicketComponent from './components/Ticket/TicketComponent';
import NotFoundedComponent from './components/UI/NotFoundedComponent';
import ToastComponent from './components/UI/ToastComponent';
import WaitingComponent from './components/WaitingComponent/WaitingComponent';
import MenuOptionsComponent from './components/MenuOptions/MenuOptionsComponent';

const App = () => {
  const { pathname } = useLocation();

  const getTitle = (path) => {
    if (path.includes('services')) return 'Elige un servicio';
    if (path.includes('ticket')) return 'Ticket';
    if (path.includes('/')) return '¡Bienvenido a XYZ Bank!';
  };

  return (
    <div className="App">
      <ToastComponent />
      <NavbarComponent>
        <h1 className="home-title text-center">{getTitle(pathname)}</h1>
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
};

export default App;
