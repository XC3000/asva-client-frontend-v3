import axios from "axios";

// import { currentEnvironment } from "./environment";
// let api_url = "http://35.175.46.153:3000/";
// let api_url = "http://qa-admin-api.metalaunch.io/";
// const api_url = "http://localhost:3000/";
// const api_url = "http://dev-admin-api.metalaunch.io/";
// const api_url = "http://qa-admin-api.metalaunch.io/";

let token = "";
// http://qa-admin-api.metalaunch.io/users/checkUserProjectStatus/1639499412985/8b6aaec6-23bf-47f5-bbad-dacbc103c701
// let api_url = "https://api.metalaunch.io/v1/client/projects";
// https://api.metalaunch.io/projects/client/v1/getAllProjects

// if (currentEnvironment === "development") {
//   api_url = "http://qa-admin-api.metalaunch.io/";
// } else if (currentEnvironment === "production") {
//   api_url = "https://api.metalaunch.io/";
//   // api_url = "http://qa-admin-api.metalaunch.io/";
// }

const getBackendUrl = (env_var) => {
  console.log("env_var ", env_var);
  if (env_var.toUpperCase().trim() === "LOCAL") {
    return "http://dev-admin-api.metalaunch.io/";
  } else if (env_var.toUpperCase().trim() === "DEV") {
    return "http://dev-admin-api.metalaunch.io/";
  } else if (env_var.toUpperCase().trim() === "QA") {
    return "http://qa-admin-api.metalaunch.io/";
  } else if (env_var.toUpperCase().trim() === "PROD") {
    return "https://api.metalaunch.io/";
  }
};

// let api_url = getBackendUrl(process.env.REACT_APP_ENV);
let api_url = "http://dev-admin-api.metalaunch.io";

class ApiCall {
  post = (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(api_url + url, data)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  // get = (url) =>
  //   new Promise((resolve, reject) => {
  //     var headers = {
  //       Authorization: "Bearer " + token,
  //     };

  //     axios
  //       .get(api_url + url, { headers })
  //       .then(function (response) {
  //         resolve(response);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });

  getWithoutHeaders = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(api_url + url)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });

  postReplace = (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(api_url + url, data)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  get = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(api_url + url)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };
}

export default new ApiCall();
