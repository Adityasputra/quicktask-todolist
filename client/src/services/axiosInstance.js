import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: localStorage.access_token,
  },
});

export default instance;
