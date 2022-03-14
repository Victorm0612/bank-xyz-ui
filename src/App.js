import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { useSelector } from 'react-redux';
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
  const { isLogged, role } = useSelector((state) => state.user);

  const getTitle = (path) => {
    if (path.includes('home')) return '¡Bienvenido a XYZ Bank!';
    if (path.includes('options')) return 'Menú de opciones';
    if (path.includes('waiting')) return 'Sala de espera';
    if (path.includes('services')) return 'Elige un servicio';
    if (path.includes('ticket')) return 'Ticket';
    if (path.includes('/')) return 'Login';
  };

  return (
    <div className="App">
      <ToastComponent />
      <NavbarComponent>
        <h1 className="home-title text-center">{getTitle(pathname)}</h1>
      </NavbarComponent>
      <Routes>
        {isLogged && <Route path="/home" exact element={<HomeComponent />} />}
        {isLogged && (
          <Route path="/services" element={<ServicesMenuComponent />} />
        )}
        {isLogged && <Route path="/ticket/:id" element={<TicketComponent />} />}
        {!isLogged && <Route path="/" exact element={<LoginComponent />} />}
        {isLogged && <Route path="/waiting" element={<WaitingComponent />} />}
        {!role && <Route path="/options" element={<MenuOptionsComponent />} />}
        <Route path="*" element={<NotFoundedComponent />} />
      </Routes>
    </div>
  );
};

export default App;
