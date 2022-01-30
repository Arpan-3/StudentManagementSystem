import React, { useEffect, useState } from "react";

import css from "./TextInput.module.css";
const TextInput = (props) => {
  const { name, value, onInputChange, isRequired, placeHolder } = props;
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isRequired && !value) setErrorMessage("Please Enter " + placeHolder);
    else setErrorMessage("");
  }, [isRequired, value]);
  return (
    <div>
      <input
        className={css.textInput}
        name={name}
        value={value}
        type="text"
        onChange={(e) => {
          // console.log(e.target.value);
          onInputChange(e.target.value);
        }}
        placeholder={placeHolder}
        required={isRequired}
      />
      <br />
      <text className={css.text}>{errorMessage}</text>
    </div>
  );
};
export default TextInput;
