import React, { useEffect, useState } from 'react';
import './LoginComponent.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import spinner from '../../assets/spinner.svg';
import BackDropComponent from '../UI/BackdropComponent';
import { getUserById, loginUser } from '../../helper/httpHelpers/usersHttp';
import useForm from '../../hooks/useForm';
import { authActions } from '../../store/auth';
import { toastActions } from '../../store/toast';
import { userActions } from '../../store/user';
import { getLocations } from '../../helper/httpHelpers/locationsHttp';

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationSelected, setLocationSelected] = useState();
  const [action, setAction] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputValueHandler: changeEmail,
    inputBlurHandler: emailBlurHandler
  } = useForm((e) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(e).toLowerCase()
    )
  );

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeInputValueHandler: changePassword,
    inputBlurHandler: passwordBlurHandler
  } = useForm((pass) => pass.trim().length >= 8);

  useEffect(() => {
    const getLocation = async (token) => {
      try {
        const dataLocations = await getLocations(token);
        setLocations(dataLocations);
        setLocationSelected(dataLocations[0].id);
        setShowLocations(true);
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
        setAction('');
      }
    };

    const isAUser = async () => {
      try {
        const data = await loginUser(email, password);
        const [dataUser] = await getUserById(data.access, data.docNumber);
        dispatch(
          authActions.setToken({
            token: data.access,
            refresh: data.refresh
          })
        );
        dispatch(
          userActions.setInfo({
            isLogged: true,
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            docType: dataUser.docType,
            docNumber: dataUser.docNumber,
            role: dataUser.role,
            email: dataUser.email,
            password: dataUser.password
          })
        );
        getLocation(data.access);
      } catch (error) {
        dispatch(
          toastActions.setInfo({
            title: 'Error',
            text: error,
            type: 'error',
            show: true
          })
        );
        setIsLoading(false);
      }
    };

    if (!isLoading) return;
    if (!action.length) isAUser();
    return () => {
      setIsLoading(false);
    };
  }, [isLoading, email, password, dispatch, navigate, action]);

  const loginIsValid = emailIsValid && passwordIsValid && captcha;

  const handlerChangeNext = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const onChange = () => {
    setCaptcha(true);
  };

  const handlerChangeLocation = () => {
    dispatch(
      userActions.setLocation({
        locationId: locationSelected
      })
    );
    return navigate('/options', { replace: true });
  };

  return (
    <>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {showLocations && (
        <BackDropComponent>
          <div className="card-location">
            <h3 className="text-center mb-4">Seleccione una sede</h3>
            <select
              onChange={(e) => setLocationSelected(e.target.value)}
              name="documents_type"
              id="documents_type"
              className="m-2 home-input__select"
              readOnly
            >
              {locations.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.locationName}
                </option>
              ))}
            </select>
            <button
              className="card-location__confirm_button"
              type="button"
              onClick={handlerChangeLocation}
            >
              Enviar
            </button>
          </div>
        </BackDropComponent>
      )}
      <div className="login">
        <div className="d-flex justify-content-center home-body align-items-center mt-1">
          <section className="d-flex flex-column w-100 align-items-center">
            <input
              className={`login-input_data m-2 ${
                emailHasError ? 'login-input_data__error' : ''
              }`}
              placeholder="Correo electrónico"
              value={email}
              type="email"
              onChange={changeEmail}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className="error_message">El email es inválido.</p>
            )}
            <div className="position-relative">
              <input
                className={`login-input_data m-2 mb-3 ${
                  passwordHasError ? 'login-input_data__error' : ''
                }`}
                placeholder="Contraseña"
                value={password}
                type={isVisible ? 'text' : 'password'}
                onChange={changePassword}
                onBlur={passwordBlurHandler}
              />
              {isVisible ? (
                <AiFillEyeInvisible
                  onClick={() => setIsVisible((prevState) => !prevState)}
                  className="login-input__icon"
                />
              ) : (
                <AiFillEye
                  onClick={() => setIsVisible((prevState) => !prevState)}
                  className="login-input__icon"
                />
              )}
            </div>
            {passwordHasError && (
              <p className="error_message">
                La contraseña debe contener al menos 8 carácteres.
              </p>
            )}
            <ReCAPTCHA
              sitekey="6Ld5c-QeAAAAAFviDwuNxOm25F58B7oOEJ6hONSs"
              onChange={onChange}
            />
          </section>
        </div>
        <button
          disabled={!loginIsValid}
          className="login-confirm_button"
          type="button"
          onClick={handlerChangeNext}
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </>
  );
};

export default LoginComponent;
