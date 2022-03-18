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
import CashierMenu from './components/Cashier/CashierComponent';
import CashierProfileComponent from './components/Cashier/CashierProfileComponent';
import UsersComponent from './components/Dashboard/Components/Users/UsersComponent';
import DashHomeComponent from './components/Dashboard/Components/DashHomeComponent';
import LocationsComponent from './components/Dashboard/Components/Locations/LocationsComponent';

const App = () => {
  const { pathname } = useLocation();
  const { isLogged, role } = useSelector((state) => state.user);

  const getTitle = (path) => {
    if (path.includes('home')) return '¡Bienvenido a XYZ Bank!';
    if (path.includes('options')) return 'Menú de opciones';
    if (path.includes('waiting')) return 'Sala de espera';
    if (path.includes('services')) return 'Elige un servicio';
    if (path.includes('cashier')) return 'Tu cajero';
    if (path.includes('ticket')) return 'Ticket';
    if (path.includes('dashboard/users')) return 'Usuarios';
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
        <Route path="/" exact element={<LoginComponent />} />
        {isLogged && <Route path="/cashier" element={<CashierMenu />} />}
        {isLogged && (
          <Route path="/cashier/:id" element={<CashierProfileComponent />} />
        )}
        {isLogged && <Route path="/waiting" element={<WaitingComponent />} />}
        {isLogged && !role && (
          <Route path="/dashboard" element={<DashHomeComponent />} />
        )}
        {isLogged && !role && (
          <Route path="/dashboard/users" element={<UsersComponent />} />
        )}
        {isLogged && !role && (
          <Route path="/dashboard/locations" element={<LocationsComponent />} />
        )}
        {isLogged && !role && (
          <Route path="/options" element={<MenuOptionsComponent />} />
        )}
        <Route path="*" element={<NotFoundedComponent />} />
      </Routes>
    </div>
  );
};

export default App;
