import React from "react";
import BottonComponent from "../ButtonComponent/ButtonComponent";
import css from "./AlertDialog.module.css";
const AlertDialog = (props) => {
  const { onAgreeClick, onDisagreeClick, agreeText, disagreeText, message } =
    props;
  return (
    <div className={css.popUpBox}>
      <div className={css.box}>
        <b className={css.text}>{message}</b>
        <br />
        <div className={css.btnWrapper}>
          <BottonComponent title={agreeText} onClick={onAgreeClick} />
          <BottonComponent title={disagreeText} onClick={onDisagreeClick} />
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
