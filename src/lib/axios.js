import Axios from "axios";

// const BASE_URL = "http://localhost:8000/api";
const BASE_URL = "https://jeep-todo-api.vercel.app/api/api";

const axios = Axios.create({
  baseURL: BASE_URL,
});

export default axios;
