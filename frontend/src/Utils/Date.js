import moment from "moment";

export const findAge = (birthDate) => {
  return Math.floor((Date.now() - new Date(birthDate).getTime()) / 3.15576e10);
};

export const formatDate = (d) => {
  return moment(d).format("YYYY-MM-DD");
  // return new Date(d).toISOString().split("T")[0];
};

export const getDisplayDate = (d) => {
  return moment(d).format("DD-MMM-YYYY");
  // return new Date(d).toISOString().split("T")[0];
};
