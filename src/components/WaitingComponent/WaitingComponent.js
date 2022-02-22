import React, { useEffect, useState } from 'react';
import './WaitingComponent.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import spinner from '../../assets/spinner.svg';
import BackDropComponent from '../UI/BackdropComponent';
import { loginUser } from '../../helper/httpHelpers/usersHttp';
import { toastActions } from '../../store/toast';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

const WaitingComponent = () => {
  const [hora, setHora] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAUser = async () => {
      try {
        const data = await loginUser(hora);
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
  }, [isLoading,  dispatch]);

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
      <div className="login">
        <div className="d-flex justify-content-center home-body align-items-center mt-1">
          <section className="d-flex flex-column w-100 align-items-center">
            <h1>
                Hola : 
            </h1>
          </section>
        </div>
      </div>
    </>
  );
};

export default WaitingComponent;
