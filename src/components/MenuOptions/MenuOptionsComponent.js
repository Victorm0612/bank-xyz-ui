import React, { useEffect, useState } from 'react';
import './MenuOptionsComponent.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import spinner from '../../assets/spinner.svg';
import BackDropComponent from '../UI/BackdropComponent';
import { loginUser } from '../../helper/httpHelpers/usersHttp';
import { toastActions } from '../../store/toast';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

const MenuOptionsComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAUser = async () => {
      try {
        const data = await loginUser(isLoading);
        console.log(data);
      } catch (error) {
        dispatch(
          toastActions.setInfo({
            title: 'Error',
            text: error,
            type: 'error',
            show: true
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) return;
    isAUser();
  }, [isLoading, dispatch]);

  const handlerChangeNext = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  /*
  function(){
      var fecha = new Date();
      var horas = fecha.getHours();
      var minutos = fecha.getMinutes();
      {new Date().toLocaleTimeString}
  };
*/
  return (
    <>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      <div className="menuOption">
        <div className="d-flex justify-content-center home-body align-items-center mt-1">
          <section className="d-flex flex-column w-100 align-items-center">
            <button
              className="menuOption-option_button mt-3"
              type="button"
              onClick={handlerChangeNext}
            >
              <Link to="/home">
                <h2>Solicitar Ticket</h2>
              </Link>
            </button>
            <button
              className="menuOption-option_button mt-3"
              type="button"
              onClick={handlerChangeNext}
            >
              <Link to="/waiting">
                <h2>Sala de espera</h2>
              </Link>
            </button>
            <button
              className="menuOption-option_button mt-3"
              type="button"
              onClick={handlerChangeNext}
            >
              <Link to="/waiting">
                <h2>Panel de administración</h2>
              </Link>
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default MenuOptionsComponent;
