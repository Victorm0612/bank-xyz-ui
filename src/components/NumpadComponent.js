import React from 'react';
import './NumpadComponent.scss';
import { BsFillBackspaceFill } from 'react-icons/bs';

const numArr = [1, 4, 7];

const NumpadComponent = ({ onChangeDocument }) => (
  <>
    {numArr.map((num) => (
      <div key={num} className="row d-flex justify-content-center">
        <div className="col-4 numpad w-100">
          <input
            type="button"
            className="numpad-button"
            onClick={onChangeDocument}
            value={num}
          />
          <input
            type="button"
            className="numpad-button"
            onClick={onChangeDocument}
            value={num + 1}
          />

          <input
            type="button"
            className="numpad-button"
            onClick={onChangeDocument}
            value={num + 2}
          />
        </div>
      </div>
    ))}
    <div className="row d-flex justify-content-center">
      <input readOnly className="numpad-button numpad-button__empty" value="" />
      <input
        type="button"
        className="numpad-button numpad-button"
        onChange={onChangeDocument}
        value={0}
      />
      <button
        type="button"
        className="numpad-button numpad-button"
        onClick={onChangeDocument}
      >
        <BsFillBackspaceFill />
      </button>
    </div>
  </>
);

export default NumpadComponent;
