import React, { useEffect, useState } from "react";
import StudentTableView from "../../components/StudentTableView/StudentTableView";
import StudentFilterView from "../../components/StudentFilterView/StudentFilterViews";
import DeletePopUpComponent from "../../components/AlertDialog/AlertDialog";
import StudentFormView from "../../components/StudentFormView/StudentFormView";
import BottonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  getCoursesList,
  getStudenList,
  deleteStudent,
  insertStudent,
  updateStudent,
} from "../../services/api";
import css from "./StudentController.module.css";

export default function StudentController() {
  const [studentList, setStudentList] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [paginationArray, setPaginationArray] = useState([]);
  const [limit, setLimit] = useState(7);
  const [selectedId, setSelectedId] = useState("");
  const [courses, setCourses] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});

  const toggleDeletePopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };
  const toggleStudentDetailPopUp = () => {
    setIsStudentDetailOpen(!isStudentDetailOpen);
  };

  const pagination = (tempList) => {
    if (tempList.length > 0) {
      let totalPages =
        tempList.length % limit > 0
          ? parseInt(tempList.length / limit + 1)
          : parseInt(tempList.length / limit);
      let temp = [];
      for (let i = 0; i < totalPages; i++) {
        temp.push(i + 1);
      }
      setPaginationArray(temp);
      setDataToShow(tempList.slice(limit * pageIndex, limit * (pageIndex + 1)));
    } else {
      setPaginationArray([]);
      setDataToShow([]);
    }
  };

  const handleSearch = (value) => {
    pagination(
      studentList.filter((x) =>
        x.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const getStudents = async () => {
    try {
      const response = await getStudenList();
      // console.log(response.data);
      setStudentList(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const getCourses = async () => {
    try {
      const response = await getCoursesList();
      // console.log(response.data);
      setCourses(response.data);
    } catch (err) {
      // console.log(err);
    }
  };
  const deleteClick = async () => {
    try {
      const response = await deleteStudent(selectedId);
      // console.log("delete", response);
      toggleDeletePopup();
      getStudents();
    } catch (err) {
      // console.log(err);
    }
  };

  const saveClick = async (studentDetail) => {
    try {
      if (selectedId) {
        const response = await updateStudent(selectedId, studentDetail);
        // console.log("res", response);
        toggleStudentDetailPopUp();
        getStudents();
      } else {
        const response = await insertStudent(studentDetail);
        // console.log("res", response);
        toggleStudentDetailPopUp();
        getStudents();
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
    getCourses();
  }, []);

  useEffect(() => {
    pagination(studentList);
  }, [studentList]);

  useEffect(() => {
    setDataToShow(
      studentList.slice(limit * pageIndex, limit * (pageIndex + 1))
    );
  }, [pageIndex]);

  return (
    <div className={css.container}>
      <div className={css.addNewbtn}>
        <BottonComponent
          title={"Add New"}
          onClick={() => {
            setSelectedId("");
            setStudentDetails({});
            toggleStudentDetailPopUp();
          }}
        />
      </div>
      <StudentFilterView
        paginationArray={paginationArray}
        onPaginationChange={(value) => {
          // console.log("onPaginationChange", value);
          setPageIndex(parseInt(value));
        }}
        pageIndex={pageIndex}
        onSearchOkay={(value) => {
          handleSearch(value);
        }}
      />
      <StudentTableView
        studentList={dataToShow}
        onEditClick={(value) => {
          setSelectedId(value);
          toggleStudentDetailPopUp();
        }}
        onDeleteClick={(value) => {
          setSelectedId(value);
          toggleDeletePopup();
        }}
      />
      {isDeleteOpen && (
        <DeletePopUpComponent
          message={"Are you sure you want to delete this record?"}
          agreeText={"Yes"}
          disagreeText={"No"}
          onAgreeClick={() => deleteClick()}
          onDisagreeClick={toggleDeletePopup}
        />
      )}

      {isStudentDetailOpen && (
        <StudentFormView
          selectedId={selectedId}
          agreeText={"Save"}
          disagreeText={"Cancel"}
          onAgreeClick={(studentDetails) => saveClick(studentDetails)}
          onDisagreeClick={toggleStudentDetailPopUp}
          courses={courses}
        />
      )}
    </div>
  );
}
