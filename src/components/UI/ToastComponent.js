import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastActions } from '../../store/toast';
import './ToastComponent.scss';

const ToastComponent = () => {
  const { title, text, type, show } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    setInterval(() => {
      if (timer !== 0) {
        setTimer((prevState) => prevState - 1);
      } else {
        dispatch(
          toastActions.setInfo({
            title,
            text,
            type,
            show: false
          })
        );
      }
    }, 1000);
  });
  return (
    <div
      className={`toast ${show ? 'show' : ''} toast-color__${type} ${
        timer <= 2 ? 'toast-not__show' : ''
      }`}
    >
      <div className={`toast-border toast-border__${type}`} />
      <div className="toast-title">{title}</div>
      <div className="toast-body">{text}</div>
    </div>
  );
};

export default ToastComponent;
