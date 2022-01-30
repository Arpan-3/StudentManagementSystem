import React from "react";
import StudentController from "../controller/StudentController/StudentController";
export default function StudentManagement() {
  return (
    <div>
      <text
        style={{
          textAlign: "center",
          fontSize: "30px",
          display: "flex",
          justifyContent: "space-around",
          color: " rgb(206, 69, 27)",
        }}
      >
        Student Management
      </text>
      <StudentController />
    </div>
  );
}
