import React, { useEffect, useState } from "react";
import BottonComponent from "../ButtonComponent/ButtonComponent";
import SelectionComponent from "../Selection/Selection";
import TextInput from "../TextInput/TextInput";
import css from "./StudentFilterView.module.css";
const StudentFilterView = (props) => {
  const { paginationArray, onPaginationChange, pageIndex, onSearchOkay } =
    props;
  const [searchText, setSearchText] = useState("");

  return (
    <div className={css.container}>
      <div className={css.searchDiv}>
        <div className={css.textDiv}>
          <TextInput
            name={"searchName"}
            value={searchText}
            placeHolder={"Search Name"}
            onInputChange={(value) => {
              setSearchText(value);
            }}
          />
        </div>
        <BottonComponent
          title={"Search"}
          onClick={() => onSearchOkay(searchText)}
        />
      </div>
      {paginationArray.length > 0 && (
        <div className="tableDivstyle">
          <text>Page:</text>
          <SelectionComponent
            list={paginationArray}
            selectedValue={pageIndex}
            onClick={onPaginationChange}
          />
        </div>
      )}
    </div>
  );
};
export default StudentFilterView;
