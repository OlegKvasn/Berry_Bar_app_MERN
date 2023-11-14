import { IUser } from "../types/models";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser") || "{}") as IUser;
};

export default getCurrentUser;
