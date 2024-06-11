import Axios from "axios";

// export const BASE_URL = "http://localhost:8000/api";
// export const sanctum = "http://localhost:8000/sanctum/csrf-cookie";
const BASE_URL = "https://jeep-todo-api.vercel.app/api/api";
export const sanctum = "https://jeep-todo-api.vercel.app/sanctum/csrf-cookie";

const axios = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
});

axios.interceptors.response.use(null, (err) => {
  const error = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: "",
  };

  switch (err.response?.status) {
    case 422:
      for (let field in err.response.data.errors) {
        error.validation[field] = err.response.data.errors[field][0];
        if (error.validation.email == "The email has already been taken.") {
          error.validation.email = "The username/email has already been taken.";
        }
      }
      break;
    case 403:
      error.message = "You're not allowed to do that.";
      break;
    // case 401:
    //   error.message = "Please re-login.";
    //   break;
    default:
      error.message = "Something went wrong. Please try again later.";
      break;
  }

  return Promise.reject(error);
});

export default axios;
