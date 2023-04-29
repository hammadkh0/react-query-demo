import axios from "axios";

const token = "token"; // get token from local storage or where ever you have stored

const client = axios.create({ baseURL: "http://localhost:3001" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response) => {
    console.debug("Request Successful!", response);
    return response;
  };

  const onError = (error) => {
    console.debug("Request Failed:", error);
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
