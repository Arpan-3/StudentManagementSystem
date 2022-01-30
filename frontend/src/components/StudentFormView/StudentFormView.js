import React, { useEffect, useState } from "react";
import BottonComponent from "../ButtonComponent/ButtonComponent";
import SelectionComponent from "../Selection/Selection";
import { Multiselect } from "multiselect-react-dropdown";
import TextInput from "../TextInput/TextInput";
import DatePicker from "../DatePicker/DatePicker";
import css from "./StudentFormView.module.css";
import { findAge, formatDate } from "../../Utils/Date";
import { getStudent } from "../../services/api";
const StudentFormView = (props) => {
  const {
    selectedId = "",
    onAgreeClick,
    onDisagreeClick,
    agreeText,
    disagreeText,
    courses,
  } = props;

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCoursesError, setSelectedCoursesError] = useState(false);

  const [shouldApplyValidation, setShouldApplyValidation] = useState(false);

  const handleMultiSelectChange = (selectedList) => {
    setSelectedCourses(selectedList);
    if (selectedList.length > 0) setSelectedCoursesError("");
  };

  const populate = async () => {
    try {
      const response = await getStudent(selectedId);
      setName(response.data.name);
      setGender(response.data.gender);
      setSelectedCourses(response.data.courses);
      setDob(formatDate(response.data.dob));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (selectedId) populate();
  }, []);

  const isValidForm = () => {
    if (
      !name ||
      !dob ||
      !gender ||
      !selectedCourses.length ||
      8 > findAge(dob)
    ) {
      setShouldApplyValidation(true);
      if (!gender) setGenderError("Please select gender.");
      if (selectedCourses.length == 0)
        setSelectedCoursesError("Please select any course.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    setShouldApplyValidation(false);
    if (isValidForm()) {
      let studentDetails = {
        name: name,
        dob: dob,
        gender: gender,
        age: findAge(dob),
        courses: selectedCourses,
      };
      onAgreeClick(studentDetails);
    }
  };

  return (
    <div className={css.popUpBox}>
      <div className={css.box}>
        <text className={css.studentHeaderStyle}>Student Details</text>
        <div>
          <text className={css.textStyle}>
            {"Name "}
            <sup>*</sup>
          </text>
          <TextInput
            name={"name"}
            value={name}
            placeHolder={"Name"}
            onInputChange={(value) => {
              setName(value);
            }}
            isRequired={shouldApplyValidation}
          />
        </div>
        <div>
          <text className={css.textStyle}>
            Date Of Birth <sup>*</sup>
          </text>
          <DatePicker
            name={"dob"}
            value={dob}
            placeHolder={"Date Of Birth"}
            onInputChange={(value) => {
              setDob(value);
            }}
            isRequired={shouldApplyValidation}
            maxAge={8}
          />
        </div>
        <div>
          <text className={css.textStyle}>
            {" "}
            Gender <sup>*</sup>
          </text>
          <br />
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={(e) => {
              setGender(e.target.value);
              setGenderError("");
            }}
            checked={gender == "Male"}
          />
          <label for="Male">Male</label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={(e) => {
              setGender(e.target.value);
              setGenderError("");
            }}
            checked={gender == "Female"}
          />
          <label for="Female">Female</label>
          <br />
          <text className={css.text}>{genderError}</text>
        </div>
        <div>
          <text className={css.textStyle}>
            Courses <sup>*</sup>
          </text>
          <Multiselect
            options={courses}
            displayValue="name"
            selectedValues={selectedCourses}
            onSelect={handleMultiSelectChange}
            onRemove={handleMultiSelectChange}
          />
          <br />
          <text className={css.text}>{selectedCoursesError}</text>
        </div>
        <div className={css.btnWrapper}>
          <BottonComponent title={agreeText} onClick={() => handleSave()} />
          <BottonComponent title={disagreeText} onClick={onDisagreeClick} />
        </div>
      </div>
    </div>
  );
};
export default StudentFormView;
