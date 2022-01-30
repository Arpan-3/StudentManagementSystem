import React from "react";
const BottonComponent = (props) => {
  const { backgroundColor = "rgb(122, 103, 248)", className } = props;
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        border: "0 px",
        padding: "10px",
        margin: "2px",
        borderRadius: "4px",
        color: "white",
        boxShadow: " black 0px 1px 1px",
      }}
      className={className}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};
export default BottonComponent;
