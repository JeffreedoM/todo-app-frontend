import Axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axios = Axios.create({
  baseURL: BASE_URL,
});

export default axios;
