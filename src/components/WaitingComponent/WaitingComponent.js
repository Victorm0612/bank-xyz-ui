import React from 'react';
import CarouselComponent from '../UI/CarouselComponent';
import './WaitingComponent.scss';

const WaitingComponent = () => (
  <div className="waiting-room">
    <div className="waiting-room__publicity">
      <CarouselComponent />
    </div>
    <div className="waiting-room__panel p-3">
      <h2>Próximos turnos</h2>
      <ul>
        <li>A56</li>
        <li>D14</li>
        <li>C28</li>
        <li>E40</li>
        <li>Q23</li>
      </ul>
    </div>
  </div>
);

export default WaitingComponent;
