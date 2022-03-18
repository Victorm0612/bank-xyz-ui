import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUsers } from 'react-icons/fa';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { MdShowChart } from 'react-icons/md';
import { Chart } from 'react-google-charts';
import AnimatedNumber from 'animated-number-react';
import spinner from '../../../assets/spinner.svg';
import '../DashboardComponent.scss';
import { toastActions } from '../../../store/toast';
import { getServices } from '../../../helper/httpHelpers/servicesHttp';
import { getStatistics } from '../../../helper/httpHelpers/dashboardHttp';
import BackDropComponent from '../../UI/BackdropComponent';
import DashboardComponent from '../DashboardComponent';
import { getLocationById } from '../../../helper/httpHelpers/locationsHttp';

const DashHomeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mainInfo, setMainInfo] = useState(null);
  const { locationId } = useSelector((state) => state.user);
  const [countWait, setCountWait] = useState(0);
  const [countClientsDay, setCountClientsDay] = useState(0);
  const [countClientsMonth, setCountClientsMonth] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllStatistics = async () => {
      try {
        const info = await getStatistics(token, locationId);
        const { locationName } = await getLocationById(token, locationId);
        const services = await getServices(token);
        setMainInfo({
          ...info,
          locationName,
          topTypeServices: info.topTypeServices.map((type) => {
            const founded = services.find(
              (el) => el.service_id === type.serviceId
            );
            if (founded) {
              return {
                ...type,
                serviceName: founded.serviceName
              };
            }
            return type;
          })
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

    if (!isLoading) return;
    getAllStatistics();
  });

  setTimeout(() => {
    if (!isLoading) {
      setCountWait(
        mainInfo && +mainInfo.averageWait.replace(':', '.').replaceAll(':', '')
      );
      setCountClientsDay(mainInfo && mainInfo.clientsByDay[0]);
      setCountClientsMonth(mainInfo && mainInfo.clientsByMonth[0]);
    }
  }, 500);

  return (
    <DashboardComponent>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      <div className="row">
        <div className="dashboard-home__cards__avg card col-6">
          <h5>Tiempo promedio de espera</h5>
          <h3>Sede {mainInfo?.locationName}</h3>
          <hr />
          <div className="d-flex justify-content-center align-items-center h-100">
            <AnimatedNumber
              className="dashboard-home__cards__time-average m-2"
              value={countWait}
              formatValue={(value) => value.toFixed(2)}
            />
            <span className="dashboard-home__cards__time-dimensions">Hrs</span>
            <AiOutlineFieldTime className="dashboard-home__cards__time-average__icon" />
          </div>
        </div>
        <div className="dashboard-home__cards__avg card col-6">
          <h5>Servicio más solicitado</h5>
          <h3>Sede {mainInfo?.locationName}</h3>
          <hr />
          <div className="d-flex justify-content-center align-items-center">
            {mainInfo && (
              <Chart
                chartType="Bar"
                options={{
                  colors: ['#b0120a']
                }}
                width="100%"
                height="auto"
                data={
                  mainInfo
                    ? [
                        ['Tipo de Servicio', 'Cantidad de Servicios'],
                        ...mainInfo.topTypeServices
                          .reverse()
                          .map((el) => [
                            el.serviceName.includes('General')
                              ? `CG${el.serviceName.split(' ')[2]}`
                              : el.serviceName,
                            +el.count
                          ])
                      ]
                    : []
                }
              />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="dashboard-home__cards__avg card col-6">
          <h5>Clientes por día</h5>
          <h3>Sede {mainInfo?.locationName}</h3>
          <hr />
          <div className="d-flex justify-content-center align-items-center">
            <AnimatedNumber
              className="dashboard-home__cards__time-day m-2"
              value={countClientsDay}
              formatValue={(value) => value.toFixed(0)}
            />
            <span className="dashboard-home__cards__day-dimensions">
              clientes
            </span>
            <MdShowChart className="dashboard-home__cards__time-average__icon" />
          </div>
        </div>
        <div className="dashboard-home__cards__avg card col-6">
          <h5>Clientes por mes</h5>
          <h3>Sede {mainInfo?.locationName}</h3>
          <hr />
          <div className="d-flex justify-content-center align-items-center">
            <AnimatedNumber
              className="dashboard-home__cards__time-day m-2"
              value={countClientsMonth}
              formatValue={(value) => value.toFixed(0)}
            />
            <span className="dashboard-home__cards__day-dimensions">
              clientes
            </span>
            <FaUsers className="dashboard-home__cards__time-average__icon" />
          </div>
        </div>
      </div>
    </DashboardComponent>
  );
};

export default DashHomeComponent;
