import React, { useState } from 'react';
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
  const [keySearch, setKeySearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    navigate('/');
    dispatch(userActions.logout());
  };

  const optionsSearch = [
    { id: '1', text: 'Dashboard', link: '/dashboard' },
    { id: '2', text: 'Usuarios', link: '/dashboard/users' },
    { id: '3', text: 'Estadísticas', link: '/dashboard/statistics' },
    { id: '4', text: 'Sedes', link: '/dashboard/locations' }
  ];

  const changeKeySearch = (e) => {
    setKeySearch(e.target.value);
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-home-bar">
        <div className="dashboard-home-bar__menu d-flex justify-content-center align-items-center">
          <ul>
            <li>
              <Link to="/dashboard">
                <MdDashboardCustomize />
                Dashboard
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
              <Link to="/dashboard/locations">
                <HiDocumentReport />
                Sedes
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
            <div className="dropdown">
              <input
                id="dropdownOptionsButton"
                placeholder="search"
                data-bs-toggle="dropdown"
                onChange={changeKeySearch}
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownOptionsButton"
              >
                {optionsSearch
                  .filter((el) =>
                    el.text
                      .toLowerCase()
                      .replace(/\s/g, '')
                      .includes(keySearch.toLowerCase().replace(/\s/g, ''))
                  )
                  .map((option) => (
                    <li
                      className="search-option dropdown-item text-center"
                      key={option.id}
                    >
                      <Link to={option.link}>{option.text}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <BiSearchAlt className="dashboard-home-bar__search__icon" />
          </div>
          <div className="dashboard-home-bar__user d-flex justify-content-center align-items-center">
            <h4>Hola, {firstName}</h4>
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
