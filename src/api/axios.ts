import axios, { AxiosInstance } from "axios"

const BASE_URL = "http://185.217.131.88:8090"

const axiosWithoutToken: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosInstance = (): AxiosInstance => {
  if (localStorage.getItem("token")) {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
  } else {
    return axiosWithoutToken;
  }
}
const axiosNew = axiosInstance();
export default axiosNew;