import React from 'react';
import ReactDOM from 'react-dom';
import './BackdropComponent.scss';

const BackDropComponent = ({ children }) =>
  ReactDOM.createPortal(
    <div className="backdrop">{children}</div>,
    document.querySelector('#backdrop')
  );

export default BackDropComponent;
