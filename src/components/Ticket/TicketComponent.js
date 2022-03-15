import React from 'react';
import './TicketComponent.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';

const TicketComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const returnToHome = () => {
    navigate('/home', { replace: true });
  };
  return (
    <div className="ticket d-flex flex-column align-items-center">
      <div className="ticket-card card">
        <h1 className="ticket-card__title">Su turno ha sido asignado</h1>
        <section className="d-flex flex-column justify-content-center align-items-center h-100">
          <p>Por favor, tome asiento y espere el llamado en pantalla.</p>
          <h1 className="ticket-card__order">{data.orderNumber}</h1>
        </section>
      </div>
      <button
        className="ticket-button__home"
        type="button"
        onClick={returnToHome}
      >
        <ImExit />
      </button>
    </div>
  );
};

export default TicketComponent;
