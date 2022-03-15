import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackDropComponent from '../UI/BackdropComponent';
import CarouselComponent from '../UI/CarouselComponent';
import spinner from '../../assets/spinner.svg';
import './WaitingComponent.scss';
import { getAllLine } from '../../helper/httpHelpers/ticketHttp';
import { toastActions } from '../../store/toast';

const WaitingComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getQueue = async () => {
      try {
        const data = await getAllLine(token);
        console.log(data);
        setQueue(data);
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
    const getNewQueue = setInterval(() => {
      getQueue();
    }, 10000);
    return () => clearInterval(getNewQueue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      <div className="waiting-room">
        <div className="waiting-room__publicity">
          <CarouselComponent />
        </div>
        <div className="waiting-room__panel p-3">
          <h2>Próximos turnos</h2>
          <ul>
            {queue.map((ticket) => (
              <li key={ticket.id}>{ticket.orderNumber}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WaitingComponent;
