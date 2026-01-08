import axios from "../api/axios";

export const loginUser = async (data) => {
  const res = await axios.post("/user/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post("/user/register", data);
  return res.data;
};

export const getLoggedInUser = async () => {
  const res = await axios.get("/user/loggedInUser");
  return res.data.user;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  return res.data;
};
