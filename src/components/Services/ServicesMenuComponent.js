/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import spinner from '../../assets/spinner.svg';
import { getServices } from '../../helper/httpHelpers/servicesHttp';
import { generateNewTicket } from '../../helper/httpHelpers/ticketHttp';
import splitArr from '../../helper/splitArray';
import { toastActions } from '../../store/toast';
import BackDropComponent from '../UI/BackdropComponent';
import ServiceComponent from './ServiceComponent';
import './ServicesMenuComponent.scss';

const ServicesMenuComponent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState('getService');
  const [serviceSelected, setServiceSelected] = useState();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const data = await getServices('2131312');
        setServices(splitArr(data, 2));
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

    const generateTicket = async () => {
      try {
        const data = await generateNewTicket(serviceSelected, '2131312');
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
              className={`col-${12 / group.length}`}
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
