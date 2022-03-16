import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaUserAlt, FaUsers } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { FcStatistics } from 'react-icons/fc';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { MdShowChart, MdDashboardCustomize } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import AnimatedNumber from 'animated-number-react';
import BackDropComponent from '../UI/BackdropComponent';
import spinner from '../../assets/spinner.svg';
import logoImg from '../../assets/img/logo.png';
import './DashboardComponent.scss';
import { userActions } from '../../store/user';
import { toastActions } from '../../store/toast';
import { getServices } from '../../helper/httpHelpers/servicesHttp';
import { getStatistics } from '../../helper/httpHelpers/dashboardHttp';

const DashboardComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mainInfo, setMainInfo] = useState(null);
  const { firstName, locationId } = useSelector((state) => state.user);
  const [countWait, setCountWait] = useState(0);
  const [countClientsDay, setCountClientsDay] = useState(0);
  const [countClientsMonth, setCountClientsMonth] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllStatistics = async () => {
      try {
        const info = await getStatistics(token, locationId);
        const services = await getServices(token);
        setMainInfo({
          ...info,
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
      setCountWait(mainInfo && mainInfo.averageWait);
      setCountClientsDay(mainInfo && mainInfo.clientsByDay[0]);
      setCountClientsMonth(mainInfo && mainInfo.clientsByMonth[0]);
    }
  }, 500);

  const handlerLogout = () => {
    navigate('/');
    dispatch(userActions.logout());
  };

  return (
    <>
      {isLoading && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      <div className="dashboard-home">
        <div className="dashboard-home-bar">
          <div className="dashboard-home-bar__menu d-flex justify-content-center align-items-center">
            <ul>
              <li>
                <MdDashboardCustomize /> Dashboard
              </li>
              <li>
                <FaUserAlt />
                Perfil
              </li>
              <li>
                <FcStatistics />
                Estadísticas
              </li>
              <li>
                <HiDocumentReport />
                Reportes
              </li>
            </ul>
          </div>
          <div className="dashboard-home-bar__search d-flex justify-content-between align-items-center">
            <div className="dashboard-home-bar__search__logo pt-2">
              <Link to="/home">
                <img
                  src={logoImg}
                  alt="logo-bank-xyz"
                  width="60"
                  height="auto"
                />
              </Link>
            </div>
            <div className="position-relative">
              <input placeholder="search" />
              <BiSearchAlt className="dashboard-home-bar__search__icon" />
            </div>
            <div className="dashboard-home-bar__user d-flex justify-content-center align-items-center">
              <h3>Hola, {firstName}</h3>
              <FaUserCircle className="dashboard-home-bar__user__icon" />
              <div className="dropdown">
                <div
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <IoIosArrowDown className="dashboard-home-bar__user__dropdown" />
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="dropdown-item text-center">
                    <button
                      className="button-logout"
                      type="button"
                      onClick={handlerLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-home__cards">
          <div className="row">
            <div className="dashboard-home__cards__avg card col-6">
              <h5>Tiempo promedio de espera</h5>
              <h3>Sede Cali</h3>
              <hr />
              <div className="d-flex justify-content-center align-items-center h-100">
                <AnimatedNumber
                  className="dashboard-home__cards__time-average m-2"
                  value={countWait}
                  formatValue={(value) => value.toFixed(2)}
                />
                <span className="dashboard-home__cards__time-dimensions">
                  Hrs
                </span>
                <AiOutlineFieldTime className="dashboard-home__cards__time-average__icon" />
              </div>
            </div>
            <div className="dashboard-home__cards__avg card col-6">
              <h5>Servicio más solicitado</h5>
              <h3>Sede Cali</h3>
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
              <h3>Sede Cali</h3>
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
              <h3>Sede Cali</h3>
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
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
