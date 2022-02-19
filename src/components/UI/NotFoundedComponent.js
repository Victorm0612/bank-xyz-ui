import React from 'react';
import './NotFoundedComponent.scss';
import imageNotFound from '../../assets/img/404.png';

const NotFoundedComponent = () => (
  <div className="page-not_found">
    <h1>
      No se encontró la página. <br /> Error 404
    </h1>
    <img
      src={imageNotFound}
      alt="No se ha encontrado la pagina"
      width="600"
      height="auto"
    />
  </div>
);

export default NotFoundedComponent;
