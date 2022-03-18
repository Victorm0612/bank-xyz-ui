import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
import AnimatedNumber from 'animated-number-react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { MdShowChart } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import Chart from 'react-google-charts';
import { getStatistics } from '../../../../helper/httpHelpers/dashboardHttp';
import {
  getLocationById,
  getLocations
} from '../../../../helper/httpHelpers/locationsHttp';
import { getServices } from '../../../../helper/httpHelpers/servicesHttp';
import { toastActions } from '../../../../store/toast';
import BackDropComponent from '../../../UI/BackdropComponent';
import DashboardComponent from '../../DashboardComponent';
import spinner from '../../../../assets/spinner.svg';
import './StatisticsComponent.scss';

const StatisticsComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [infoChanged, setInfoChanged] = useState(false);
  const [monthChanged, setMonthChanged] = useState(false);
  const [dayChanged, setdayChanged] = useState(false);
  const [mainInfo, setMainInfo] = useState(null);
  const [optionSelected, setOptionSelected] = useState('averageWait');
  const [monthSelected, setMonthSelected] = useState(moment().format('MM'));
  const [daySelected, setDaySelected] = useState(moment().format('YYYY-MM-DD'));
  const [locationSelected, setLocationSelected] = useState(null);
  const [locationList, setLocationList] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const { locationId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllStatistics = async () => {
      try {
        const info = await getStatistics(token, locationId);
        const { locationName } = await getLocationById(token, locationId);
        const dataLocations = await getLocations(token);
        const services = await getServices(token);
        setLocationSelected(locationId);
        setLocationList(dataLocations);
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
    getAllStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getNewInfo = async (day = '', month = '') => {
      try {
        const info = await getStatistics(token, locationSelected, day, month);
        const { locationName } = await getLocationById(token, locationSelected);
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
        setInfoChanged(false);
      }
    };
    if (isLoading && infoChanged) return getNewInfo();
    if (isLoading && dayChanged) return getNewInfo(daySelected, monthSelected);
    if (isLoading && monthChanged)
      return getNewInfo(daySelected, monthSelected);
  }, [
    dayChanged,
    daySelected,
    dispatch,
    infoChanged,
    isLoading,
    locationSelected,
    monthChanged,
    monthSelected,
    token
  ]);

  const changeOption = (e) => {
    setOptionSelected(e.target.value);
  };

  const changeLocation = (e) => {
    setLocationSelected(e.target.value);
    setInfoChanged(true);
    setIsLoading(true);
  };

  const getTitle = {
    averageWait: 'Promedio de espera',
    topTypeServices: 'Servicios más solicitados',
    clientsByDay: 'Clientes por día',
    clientsByMonth: 'Clientes por mes'
  };

  const changeMonth = (e) => {
    setMonthSelected(e.target.value);
    setMonthChanged(true);
    setIsLoading(true);
  };

  const changeDaySelected = (e) => {
    setDaySelected(e.target.value);
    setdayChanged(true);
    setIsLoading(true);
  };

  const MONTHS = [
    { value: '01', month: 'Enero' },
    { value: '02', month: 'Febrero' },
    { value: '03', month: 'Marzo' },
    { value: '04', month: 'Abril' },
    { value: '05', month: 'Mayo' },
    { value: '06', month: 'Junio' },
    { value: '07', month: 'Julio' },
    { value: '08', month: 'Agosto' },
    { value: '09', month: 'Septiembre' },
    { value: '10', month: 'Octubre' },
    { value: '11', month: 'Noviembre' },
    { value: '12', month: 'Diciembre' }
  ];

  return (
    <DashboardComponent>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {!isLoading && (
        <div className="statistics-pages">
          <h1 className="statistics-pages__title">Reportes</h1>
          <div className="statistics-pages__selects d-flex align-items-center justify-content-center">
            <select
              id="select-data"
              name="select-data"
              onChange={changeOption}
              value={optionSelected}
            >
              <option value="averageWait">Promedio de espera</option>
              <option value="topTypeServices">Servicios más solicitados</option>
              <option value="clientsByDay">Clientes por día</option>
              <option value="clientsByMonth">Clientes por mes</option>
            </select>
            {optionSelected === 'clientsByMonth' && (
              <select
                id="select-month"
                name="select-month"
                onChange={changeMonth}
                value={monthSelected}
              >
                {MONTHS.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.month}
                  </option>
                ))}
              </select>
            )}
            {optionSelected === 'clientsByDay' && (
              <input
                type="date"
                value={daySelected}
                onChange={changeDaySelected}
              />
            )}
            <select
              id="select-location"
              name="select-location"
              onChange={changeLocation}
              value={locationSelected}
            >
              {locationList?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.locationName}
                </option>
              ))}
            </select>
          </div>
          <div className="statistics-pages__data">
            <div className="statistics-pages__data-card card">
              <h4>{getTitle[optionSelected]}</h4>
              {optionSelected === 'averageWait' && (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <AnimatedNumber
                    className="dashboard-home__cards__time-average m-2"
                    value={Number(
                      mainInfo?.averageWait
                        .replace(':', '.')
                        .replaceAll(':', '')
                    )}
                    formatValue={(value) => value.toFixed(2)}
                  />
                  <span className="dashboard-home__cards__time-dimensions">
                    Hrs
                  </span>
                  <AiOutlineFieldTime className="dashboard-home__cards__time-average__icon" />
                </div>
              )}
              {optionSelected === 'topTypeServices' && (
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
                              ...[...mainInfo.topTypeServices]
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
              )}
              {optionSelected === 'clientsByDay' && (
                <div className="d-flex justify-content-center align-items-center">
                  <AnimatedNumber
                    className="dashboard-home__cards__time-day m-2"
                    value={mainInfo?.clientsByDay}
                    formatValue={(value) => value.toFixed(0)}
                  />
                  <span className="dashboard-home__cards__day-dimensions">
                    clientes
                  </span>
                  <MdShowChart className="dashboard-home__cards__time-average__icon" />
                </div>
              )}
              {optionSelected === 'clientsByMonth' && (
                <div className="d-flex justify-content-center align-items-center">
                  <AnimatedNumber
                    className="dashboard-home__cards__time-day m-2"
                    value={mainInfo?.clientsByMonth}
                    formatValue={(value) => value.toFixed(0)}
                  />
                  <span className="dashboard-home__cards__day-dimensions">
                    clientes
                  </span>
                  <FaUsers className="dashboard-home__cards__time-average__icon" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardComponent>
  );
};

export default StatisticsComponent;
