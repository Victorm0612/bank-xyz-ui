import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaUserAlt } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { FcStatistics } from 'react-icons/fc';
import { MdDashboardCustomize } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/img/logo.png';
import './DashboardComponent.scss';
import { userActions } from '../../store/user';

const DashboardComponent = ({ children }) => {
  const { firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    navigate('/');
    dispatch(userActions.logout());
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-home-bar">
        <div className="dashboard-home-bar__menu d-flex justify-content-center align-items-center">
          <ul>
            <li>
              <Link to="/dashboard">
                <MdDashboardCustomize /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                <FaUserAlt />
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/dashboard/statistics">
                <FcStatistics />
                Estadísticas
              </Link>
            </li>
            <li>
              <Link to="/dashboard/reports">
                <HiDocumentReport />
                Reportes
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboard-home-bar__search d-flex justify-content-between align-items-center">
          <div className="dashboard-home-bar__search__logo pt-2">
            <Link to="/home">
              <img src={logoImg} alt="logo-bank-xyz" width="60" height="auto" />
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
      <div className="dashboard-home__cards">{children}</div>
    </div>
  );
};

export default DashboardComponent;
