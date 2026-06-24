import axios from "axios";

// In dev (vite) talk to the local backend; in prod use the deployed one.
const baseURL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://woofey.onrender.com";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

// On a 401, try a one-time silent refresh and replay the original request.
// Endpoints that are themselves part of the auth handshake are excluded to
// avoid loops.
const AUTH_EXCLUDED = ["/user/login", "/user/register", "/user/refresh"];

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    const isExcluded = AUTH_EXCLUDED.some((url) =>
      original?.url?.includes(url)
    );

    if (status === 401 && original && !original._retry && !isExcluded) {
      original._retry = true;
      try {
        await instance.post("/user/refresh");
        return instance(original);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
