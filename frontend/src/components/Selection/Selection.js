import React from "react";
const SelectionComponent = (props) => {
  const { list = [], onClick, selectedValue } = props;
  return (
    <select
      style={{
        width: "60px",
        textAlign: "center",
        height: "30px",
        marginTop: "10px",
      }}
      value={selectedValue}
      onChange={(e) => {
        onClick(e.target.value);
      }}
    >
      {list.length > 0 &&
        list.map((item, index) => {
          return (
            <option
              style={{ color: "red", height: "15px" }}
              value={index}
              key={index}
            >
              {item}
            </option>
          );
        })}
    </select>
  );
};
export default SelectionComponent;
