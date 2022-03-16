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
  const [diffQueue, setDiffQueue] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { locationId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getQueue = async () => {
      try {
        const data = await getAllLine(token, locationId);
        setQueue((prevState) => {
          const diff = prevState.filter(
            (element) =>
              !data.map((el) => el.orderNumber).includes(element.orderNumber)
          );
          diff.length
            ? setDiffQueue(diff.map((el) => ({ ...el, show: true })))
            : setDiffQueue([]);
          return data;
        });
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
      {diffQueue.length &&
        diffQueue.map(
          (element) =>
            element.show && (
              <BackDropComponent key={element.id}>
                <div className="modal-card d-flex flex-column justify-content-center align-items-center">
                  <h2>Siguiente turno</h2>
                  <h1>{element.orderNumber}</h1>
                </div>
                {setTimeout(
                  () =>
                    setDiffQueue((prevState) =>
                      prevState.map((el) =>
                        el.id === element.id ? { ...el, show: false } : el
                      )
                    ),
                  2000
                )}
              </BackDropComponent>
            )
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
