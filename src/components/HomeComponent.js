import React, { useEffect, useState } from 'react';
import './HomeComponent.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NumpadComponent from './NumpadComponent';
import spinner from '../assets/spinner.svg';
import BackDropComponent from './UI/BackdropComponent';
import { loginUser } from '../helper/httpHelpers/usersHttp';
import { toastActions } from '../store/toast';
import { userActions } from '../store/user';

const documentsType = [
  {
    id: 1,
    text: 'Cédula de ciudadanía'
  },
  {
    id: 2,
    text: 'Cédula extranjera'
  }
];

const HomeComponent = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAUser = async () => {
      if (!documentNumber) {
        dispatch(
          toastActions.setInfo({
            title: 'Warning',
            text: 'Por favor, ingrese su documento de identidad.',
            type: 'warning',
            show: true
          })
        );
        setIsLoading(false);
        return;
      }
      try {
        const data = await loginUser(documentNumber);
        dispatch(userActions.setInfo(data));
        navigate('services', { replace: true });
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
    return () => setIsLoading(false);
  }, [isLoading, documentNumber, dispatch, navigate]);

  const handlerChangeDocument = (e) => {
    setDocumentNumber(e.target.value);
  };

  const handlerDeleteWord = (e) => {
    e.preventDefault();
    setDocumentNumber((prevState) =>
      prevState.substring(0, prevState.length - 1)
    );
  };

  const handlerChangeClickDocument = (e) => {
    setDocumentNumber((prevState) => `${prevState}${e.target.value}`);
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
      <div className="home">
        <div className="row">
          <div className="d-flex justify-content-center home-body align-items-center mt-3 col-12">
            <div className="row h-100 w-100">
              <section className="d-flex flex-column align-items-center col-6 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <select
                  name="documents_type"
                  id="documents_type"
                  className="m-2 home-input__select"
                  readOnly
                >
                  {documentsType.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.text}
                    </option>
                  ))}
                </select>
                <input
                  className="home-input__id m-2"
                  value={documentNumber}
                  onChange={handlerChangeDocument}
                />
              </section>
              <section className="text-center col-6 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <NumpadComponent
                  onChangeDocument={handlerChangeClickDocument}
                  onDeleteWord={handlerDeleteWord}
                />
              </section>
            </div>
          </div>
          <div className="w-100">
            <button
              className="home-button__send col-12"
              type="button"
              onClick={handlerChangeNext}
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
