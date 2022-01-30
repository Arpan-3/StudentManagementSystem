import axios from "axios";
import { url, apis } from "./constants";

export const getStudenList = async () => {
  return await axios.get(url + apis.studentApis);
};

export const getStudent = async (id) => {
  return await axios.get(url + apis.studentApis + "/" + id);
};

export const insertStudent = async (student) => {
  return await axios.post(url + apis.studentApis, student);
};

export const deleteStudent = async (id) => {
  return await axios.delete(url + apis.studentApis + "/" + id);
};

export const updateStudent = async (id, student) => {
  return await axios.put(url + apis.studentApis + "/" + id, student);
};

export const getCoursesList = async () => {
  return await axios.get(url + apis.coursesApis);
};
