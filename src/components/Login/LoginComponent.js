import React, { useEffect, useState } from 'react';
import './LoginComponent.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import spinner from '../../assets/spinner.svg';
import BackDropComponent from '../UI/BackdropComponent';
import { loginUser } from '../../helper/httpHelpers/usersHttp';
import { toastActions } from '../../store/toast';

const LoginComponent = () => {
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAUser = async () => {
      try {
        const data = await loginUser(emailUser);
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
  }, [isLoading, emailUser, passwordUser, dispatch]);

  const handlerChangeEmail = (e) => {
    setEmailUser(e.target.value);
  };
  const handlerChangePassword = (e) => {
    setPasswordUser(e.target.value);
  };

  const handlerChangeNext = (e) => {
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
      <div className="login">
        <div className="d-flex justify-content-center home-body align-items-center mt-1">
          <section className="d-flex flex-column w-100 align-items-center">
            <input
              className="login-input_data m-2"
              placeholder="Correo electrónico"
              value={emailUser}
              onChange={handlerChangeEmail}
            />
            <input
              className="login-input_data m-2"
              placeholder="Contraseña"
              value={passwordUser}
              onChange={handlerChangePassword}
            />
          </section>
        </div>
        <button
          className="login-confirm_button"
          type="button"
          onClick={handlerChangeNext}
        >
          <Link to="/options">
            <BsFillArrowRightCircleFill />
          </Link>
        </button>
      </div>
    </>
  );
};

export default LoginComponent;
