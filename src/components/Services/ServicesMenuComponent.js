/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import spinner from '../../assets/spinner.svg';
import { getServices } from '../../helper/httpHelpers/servicesHttp';
import splitArr from '../../helper/splitArray';
import { toastActions } from '../../store/toast';
import BackDropComponent from '../UI/BackdropComponent';
import './ServicesMenuComponent.scss';

const ServicesMenuComponent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const data = await getServices('2131312');
        setServices(data);
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
    getAllServices();
  });

  const servicesSplitted = isLoading ? splitArr(services, 2) : services;
  return (
    <>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {servicesSplitted.map((group, index) => (
        <div key={index} className="row">
          {group.map((service) => (
            <div className={`col-${12 / group.length}`}>
              {service.displayName}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default ServicesMenuComponent;
