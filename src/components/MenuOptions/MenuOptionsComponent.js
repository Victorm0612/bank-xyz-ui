import React from 'react';
import './MenuOptionsComponent.scss';
import { Link } from 'react-router-dom';

const MenuOptionsComponent = () => (
  <div className="menuOption">
    <div className="d-flex justify-content-center home-body align-items-center mt-1">
      <section className="d-flex flex-column w-100 align-items-center">
        <button className="menuOption-option_button mt-3" type="button">
          <Link to="/cashier">
            <h2>Cajeros</h2>
          </Link>
        </button>
        <button className="menuOption-option_button mt-3" type="button">
          <Link to="/home">
            <h2>Solicitar Ticket</h2>
          </Link>
        </button>
        <button className="menuOption-option_button mt-3" type="button">
          <Link to="/waiting">
            <h2>Sala de espera</h2>
          </Link>
        </button>
        <button className="menuOption-option_button mt-3" type="button">
          <Link to="/waiting">
            <h2>Panel de administración</h2>
          </Link>
        </button>
      </section>
    </div>
  </div>
);

export default MenuOptionsComponent;
