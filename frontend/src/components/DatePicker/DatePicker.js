import React, { useEffect, useState } from "react";

import css from "./DatePicker.module.css";
import { findAge, formatDate } from "../../Utils/Date";
const DatePicker = (props) => {
  const { name, value, onInputChange, isRequired, placeHolder, maxAge } = props;
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    console.log(maxAge, findAge(value));
    if (isRequired && !value) setErrorMessage("Please Enter " + placeHolder);
    else if (maxAge > findAge(value))
      setErrorMessage("Age should be grater than 8.");
    else setErrorMessage("");
  }, [isRequired, value]);
  return (
    <div>
      <input
        className={css.textInput}
        name={name}
        value={value}
        type="date"
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        placeholder={placeHolder}
        required={isRequired}
        max={formatDate(new Date())}
      />
      <br />
      <text className={css.text}>{errorMessage}</text>
    </div>
  );
};
export default DatePicker;
