import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const apiRequest = (config = null) => {
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };

  let axiosInstance = axios.create({
    baseURL: `${BASE_URL}/`,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 423) {
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance(config);
};
