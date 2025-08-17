import React from "react";
import plus from './assets/plus.svg';

const AddApplicationButton = () => {
  return (
    <button className="add-application-button">
        <img src={plus} alt="Add Application" />
    </button>
  );
}

export default AddApplicationButton;