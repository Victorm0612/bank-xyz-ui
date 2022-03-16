import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaUserAlt } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { FcStatistics } from 'react-icons/fc';
import { MdDashboardCustomize } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import BackDropComponent from '../UI/BackdropComponent';
import spinner from '../../assets/spinner.svg';
import logoImg from '../../assets/img/logo.png';
import './DashboardComponent.scss';
import { userActions } from '../../store/user';

const DashboardComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { firstName } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = {
    title: 'Age vs. Weight comparison',
    hAxis: { title: 'Age', viewWindow: { min: 0, max: 15 } },
    vAxis: { title: 'Weight', viewWindow: { min: 0, max: 15 } },
    legend: 'none'
  };

  const data = [
    ['Age', 'Weight'],
    [8, 12],
    [4, 5.5],
    [11, 14],
    [4, 5],
    [3, 3.5],
    [6.5, 7]
  ];

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
          <Chart
            chartType="ScatterChart"
            data={data}
            options={options}
            width="80%"
            height="400px"
            legendToggle
          />
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
