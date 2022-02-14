import React, { useEffect, useState } from 'react';
import './HomeComponent.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import NumpadComponent from './NumpadComponent';
import spinner from '../assets/spinner.svg';
import BackDropComponent from './UI/BackdropComponent';

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

  useEffect(() => {
    const isAUser = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    if (!isLoading) return;
    isAUser();
  }, [isLoading]);

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
        <div className="d-flex justify-content-center home-body align-items-center mt-3">
          <section className="d-flex flex-column w-100 align-items-center">
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
          <section className="w-100 text-center">
            <NumpadComponent
              onChangeDocument={handlerChangeClickDocument}
              onDeleteWord={handlerDeleteWord}
            />
          </section>
        </div>
        <button
          className="home-button__send"
          type="button"
          onClick={handlerChangeNext}
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </>
  );
};

export default HomeComponent;
