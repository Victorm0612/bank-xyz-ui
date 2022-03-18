import React from 'react';
import './CarouselComponent.scss';
import imgOne from '../../assets/img/carousel/1.jpg';
import imgSecond from '../../assets/img/carousel/2.jpg';
import imgThird from '../../assets/img/carousel/3.jpg';
import logo from '../../assets/img/logo.png';

const CarouselComponent = () => (
  <div id="carouselComponent" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li
        data-target="#carouselComponent"
        data-slide-to="0"
        className="active"
      />
      <li data-target="#carouselComponent" data-slide-to="1" />
      <li data-target="#carouselComponent" data-slide-to="2" />
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src={imgOne} alt="First slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={imgSecond} alt="Second slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={imgThird} alt="Third slide" />
      </div>
    </div>
    <div className="carousel-information d-flex flex-column justify-content-center align-items-center p-5">
      <h1 className="mb-5">¡Sin cuota de manejo!</h1>
      <p>
        XYZ Bank ha sacado su nueva tarjeta de crédito EkkoCard, en convenio con
        MasterCard. Pídela ahora sin cuota de manejo y sin cobro por emisión.
        <hr />
        <b>Pregunta en nuestras oficinas para más información.</b>
      </p>
    </div>
    <img
      src={logo}
      width="50rem"
      height="auto"
      alt="Logo bank xyz"
      className="carousel-logo"
    />
  </div>
);

export default CarouselComponent;
