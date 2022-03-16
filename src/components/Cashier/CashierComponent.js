import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../../helper/httpHelpers/servicesHttp';
import { getNextTurn } from '../../helper/httpHelpers/ticketHttp';
import splitArr from '../../helper/splitArray';
import { toastActions } from '../../store/toast';
import ServiceComponent from '../Services/ServiceComponent';
import BackDropComponent from '../UI/BackdropComponent';
import spinner from '../../assets/spinner.svg';

const CashierMenu = () => {
  const [action, setAction] = useState('getCashier');
  const [typeService, setTypeService] = useState('');
  const [cashier, setCashier] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCashier = async () => {
      try {
        const data = await getServices(token);
        setCashier(splitArr(data, 2));
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

    const nextTurn = async () => {
      try {
        const data = await getNextTurn(token, typeService.service_id);
        navigate(
          `${typeService.serviceName.toLowerCase().replaceAll(' ', '_')}`,
          {
            state: {
              ...data,
              teller_id: typeService.service_id,
              serviceName: typeService.serviceName
            }
          }
        );
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
    if (action === 'getCashier') getAllCashier();
    if (action === 'nextTurn') nextTurn();
  }, [action, dispatch, isLoading, navigate, token, typeService]);

  const handlerSelectCashier = (service) => {
    setAction('nextTurn');
    setIsLoading(true);
    setTypeService(service);
  };

  return (
    <div className="services-menu">
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {cashier.map((group, index) => (
        // eslint-disable-next-line react/no-array-index-key
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
                onSelectService={handlerSelectCashier}
                infoService
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default CashierMenu;
