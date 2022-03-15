import React from 'react';
import './ServiceComponent.scss';

const ServiceComponent = ({
  service,
  infoService = false,
  onSelectService
}) => {
  const handlerSelectService = (e) => {
    e.preventDefault();
    onSelectService(infoService ? service : service.serviceType);
  };

  return (
    <button
      type="button"
      className="card service text-start"
      onClick={handlerSelectService}
    >
      <h4>{service.serviceName}</h4>
      <p>{service.description}</p>
    </button>
  );
};

export default ServiceComponent;
