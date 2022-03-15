/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import spinner from '../../assets/spinner.svg';
import { generateNewTicket } from '../../helper/httpHelpers/ticketHttp';
import splitArr from '../../helper/splitArray';
import { toastActions } from '../../store/toast';
import typesServices from '../../utils/typeServices';
import BackDropComponent from '../UI/BackdropComponent';
import ServiceComponent from './ServiceComponent';
import './ServicesMenuComponent.scss';

const ServicesMenuComponent = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { docNumber } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState('getService');
  const [serviceSelected, setServiceSelected] = useState();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllServices = () => {
      const data = typesServices;
      setServices(splitArr(data, 2));
    };

    const generateTicket = async () => {
      try {
        const data = await generateNewTicket(serviceSelected, docNumber, token);
        navigate(`/ticket/${data._id}`, {
          state: {
            ...data
          }
        });
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
    if (action === 'getService') getAllServices();
    if (action === 'generateTicket') generateTicket();
    return () => setIsLoading(false);
  });

  const handlerSelectService = (type) => {
    setAction('generateTicket');
    setIsLoading(true);
    setServiceSelected(type);
  };

  return (
    <div className="services-menu">
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {services.map((group, index) => (
        <div key={index} className="row">
          {group.map((service) => (
            <div
              key={service.service_id}
              className={`col-lg-${
                12 / group.length
              } col-xs-12 col-sm-12 col-md-12 d-flex justify-content-center`}
            >
              <ServiceComponent
                service={service}
                onSelectService={handlerSelectService}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServicesMenuComponent;
