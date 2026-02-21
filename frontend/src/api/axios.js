import axios from "axios";

const instance = axios.create({
  baseURL: " https://woofey.onrender.com",
  withCredentials: true,
});

export default instance;
