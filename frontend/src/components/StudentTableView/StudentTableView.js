import React from "react";
import BottonComponent from "../ButtonComponent/ButtonComponent";
import css from "./StudentTableView.module.css";
import { getDisplayDate } from "../../Utils/Date";
import Asc from "../../assets/upArrow.png";
import Desc from "../../assets/downArrow.png";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let firstField = "";
        let secondField = "";
        if (sortConfig.key == "dob") {
          firstField = new Date(a[sortConfig.key]).getTime();
          secondField = new Date(b[sortConfig.key]).getTime();
          if (sortConfig.direction === "Ascending") {
            return firstField - secondField;
          } else {
            return secondField - firstField;
          }
        } else if (sortConfig.key == "age") {
          firstField = a[sortConfig.key];
          secondField = b[sortConfig.key];
          if (sortConfig.direction === "Ascending") {
            return firstField - secondField;
          } else {
            return secondField - firstField;
          }
        } else {
          firstField = a[sortConfig.key].toString().toLowerCase();
          secondField = b[sortConfig.key].toString().toLowerCase();
          if (sortConfig.direction === "Ascending") {
            return firstField.localeCompare(secondField);
          } else {
            return secondField.localeCompare(firstField);
          }
          // if (firstField < secondField) {
          //   return sortConfig.direction === "Ascending" ? -1 : 1;
          // }
          // if (secondField > firstField) {
          //   return sortConfig.direction === "Ascending" ? 1 : -1;
          // }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "Ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "Ascending"
    ) {
      direction = "Descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const StudentTableView = (props) => {
  const { studentList = [], onEditClick, onDeleteClick } = props;
  const { items, requestSort, sortConfig } = useSortableData(studentList);
  const getDirectionImage = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? (
      sortConfig.direction === "Ascending" ? (
        <img src={Asc} className={css.img} />
      ) : sortConfig.direction === "Descending" ? (
        <img src={Desc} className={css.img} />
      ) : undefined
    ) : undefined;
  };
  return (
    <div className={css.tableDivstyle}>
      <table className={css.table} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th className={css.thead}>
              <BottonComponent
                title={"Name"}
                onClick={() => requestSort("name")}
              />
              {getDirectionImage("name")}
            </th>
            <th className={css.thead}>
              <BottonComponent
                title={"Date Of Birth"}
                onClick={() => requestSort("dob")}
              />
              {getDirectionImage("dob")}
            </th>
            <th className={css.thead}>
              <BottonComponent
                title={"Age-Years"}
                onClick={() => requestSort("age")}
              />
              {getDirectionImage("age")}
            </th>
            <th className={css.thead}>
              <BottonComponent
                title={"Gender"}
                onClick={() => requestSort("gender")}
              />
              {getDirectionImage("gender")}
            </th>
            <th className={css.thead}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  style={{ backgroundColor: index % 2 == 0 && "#f2f2f2" }}
                >
                  <td className={css.td} style={{ textAlign: "left" }}>
                    {item.name}
                  </td>
                  <td className={css.td}>{getDisplayDate(item.dob)}</td>
                  <td
                    className={css.td}
                    style={{ color: item.age <= 10 && "red" }}
                  >
                    {item.age}
                  </td>
                  <td className={css.td}>{item.gender}</td>
                  <td className={css.actions}>
                    <BottonComponent
                      title={"Edit"}
                      onClick={() => {
                        onEditClick(item.id);
                      }}
                    />
                    <BottonComponent
                      title={"Delete"}
                      onClick={() => {
                        onDeleteClick(item.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className={css.td} colSpan={5}>
                No Record Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default StudentTableView;
