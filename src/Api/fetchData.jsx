import axios from "axios";
import encryptData from "../utils/encryptData";

export const fetchDataFromAPI = (method, url, body, requestHeaders, form) => {
  let contentType;
  if (form === true) {
    contentType = "multipart/form-data";
  } else {
    contentType = "application/json";
  }
  let reqHeader = {
    // "Content-Type": contentType,
    Authorization: "Bearer " + localStorage.getItem("token"),
    ...requestHeaders,
  };

  const encryptedBody =
    body &&
    !(body instanceof FormData) &&
    (method === "POST" || method === "PUT" || method === "PATCH")
      ? { data: encryptData(body) }
      : body;

  switch (method) {
    case "GET": {
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response?.data);
            if (
              err?.response?.status === 401 ||
              err?.response?.status === 403
            ) {
              localStorage.clear();
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          });
      });
    }
    case "POST": {
      return new Promise((resolve, reject) => {
        axios
          .post(url, encryptedBody, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response?.data);
            if (
              err?.response?.status === 401 ||
              err?.response?.status === 403
            ) {
              localStorage.clear();
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          });
      });
    }

    case "DELETE": {
      return new Promise((resolve, reject) => {
        axios
          .delete(url, { headers: reqHeader })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response.data);
            if (
              err?.response?.status === 401 ||
              err?.response?.status === 403
            ) {
              localStorage.clear();
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          });
      });
    }

    case "PUT": {
      return new Promise((resolve, reject) => {
        axios
          .put(url, encryptedBody, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response?.data);
            if (
              err?.response?.status === 401 ||
              err?.response?.status === 403
            ) {
              localStorage.clear();
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          });
      });
    }
    default: {
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response.data);
            if (
              err?.response?.status === 401 ||
              err?.response?.status === 403
            ) {
              localStorage.clear();
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          });
      });
    }
  }
};
