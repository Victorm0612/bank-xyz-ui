import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastActions } from '../../store/toast';
import './ToastComponent.scss';

const ToastComponent = () => {
  const { title, text, type, show } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!show) return;
    if (timer === 10) {
      dispatch(
        toastActions.setInfo({
          title,
          text,
          type,
          show: false
        })
      );
      setTimer(0);
      return;
    }
    const counter = setInterval(() => {
      setTimer((prevState) => prevState + 1);
    }, 350);

    return () => {
      clearInterval(counter);
    };
  }, [timer, show, dispatch, title, text, type]);
  return (
    <div
      className={`toast ${show ? 'show' : ''} toast-color__${type} ${
        timer >= 8 ? 'toast-not__show' : ''
      }`}
    >
      <div className={`toast-border toast-border__${type}`} />
      <div className="toast-title">{title}</div>
      <div className="toast-body">{text}</div>
    </div>
  );
};

export default ToastComponent;
