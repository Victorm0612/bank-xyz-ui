import React from 'react';
import './App.scss';
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';

const App = () => (
  <div className="App">
    <NavbarComponent />
    <HomeComponent />
  </div>
);

export default App;
