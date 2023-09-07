import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getAsync = async (url) => {
  const headers = await getHeaders();
  return axios.get(BASE_URL + url, { headers });
};

export const postAsync = async (url, model) => {
  const headers = await getHeaders();
  return axios.post(BASE_URL + url, model, { headers });
};

export const putAsync = async (url, model) => {
  const headers = await getHeaders();
  return axios.put(BASE_URL + url, model, { headers });
};

export const deleteAsync = async (url) => {
  const headers = await getHeaders();
  return axios.delete(BASE_URL + url, { headers });
};

const getTokenAsync = async () => {
  let token;
  await axios
    .post(BASE_URL + "/api/Users/login", {
      email: "thaixuanhieu300698@gmail.com",
      password: "Abc@123",
      rememberMe: true,
    })
    .then((res) => {
      token = res.data.token;
    })
    .catch((error) => {
      console.log(error);
    });

  return token;
};

const getHeaders = async () => {
  var token = await getTokenAsync();
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};
