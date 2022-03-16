import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsArrowClockwise } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import './CashierProfileComponent.scss';
import spinner from '../../assets/spinner.svg';
import { getNextTurn, updateTicket } from '../../helper/httpHelpers/ticketHttp';
import { toastActions } from '../../store/toast';
import BackDropComponent from '../UI/BackdropComponent';

const CashierProfileComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const [order, setOrder] = useState(state.orderNumber);

  useEffect(() => {
    const nextTurn = async () => {
      try {
        const data = await getNextTurn(token, state.teller_id);
        await updateTicket(token, { ...state });
        setOrder(data.orderNumber);
      } catch (error) {
        dispatch(
          toastActions.setInfo({
            title: 'Error',
            text: `Hubo un error ${error}`,
            type: 'error',
            show: true
          })
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (!isLoading) return;
    nextTurn();
  }, [dispatch, isLoading, state, state.teller_id, token]);

  const handlerNextTurn = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      <div className="cashier-profile d-flex flex-column align-items-center">
        <div className="cashier-profile-card card">
          <h1 className="cashier-profile-card__title">
            Usted es {state.serviceName}
          </h1>
          <section className="d-flex flex-column justify-content-center align-items-center h-100">
            <p>
              Para seguir con el siguiente turno, hacer click en el botón
              inferior.
            </p>
            <h2 className="cashier-profile-card__order">
              Atendiendo el turno {order}....
            </h2>
          </section>
        </div>
        <button
          className="cashier-profile-button__home"
          type="button"
          onClick={handlerNextTurn}
        >
          <BsArrowClockwise />
        </button>
      </div>
    </>
  );
};

export default CashierProfileComponent;
