import axios from "axios";

//login url's
const login = (data) => {
  debugger;
  return axios.post("https://localhost:7226/api/user/Login", data);
};

const register = (data) => {
  debugger;
  return axios.post("https://localhost:7226/api/user/Register", data);
};


//punch url's
const getpunch = (data) => {
  return axios.get("https://localhost:7226/api/punch", data);
};

const createpunch = (data) => {
  debugger;
  return axios.post("https://localhost:7226/api/punch", data);
};
const GetById = async (userId) => {
  return await axios.get(`https://localhost:7226/api/punch/GetById/${userId}`);
};

const updatepunch = (userId, data) => {
  debugger;
  return axios.put(`https://localhost:7226/api/punch/${userId}`, data);
};

const getpunchid = (id) => {
  return axios.get(`https://localhost:7226/api/punch/${id}`);
};
const checkpunch = async (userId) => {
  return await axios.get(`https://localhost:7226/api/punch/(Check)/${userId}`);
};


//Status url
const getAll = (data) => {
  debugger;
  return axios.get("https://localhost:7226/api/status", data);
};

const get = (id) => {
  return axios.get(`https://localhost:7226/api/status/${id}`);
};

const create = (data) => {
  debugger;
  return axios.post("https://localhost:7226/api/status", data);
};

const update = (data) => {
  debugger;
  return axios.put("https://localhost:7226/api/status", data);
};

const remove = (id) => {
  return axios.delete(`https://localhost:7226/api/status/${id}`);
};

const userbyId = async (userId) => {
  return await axios.get(`https://localhost:7226/api/status/GetById/${userId}`);
};


//Leave Url
const getbyidleave = (id) => {
  return axios.get(`https://localhost:7226/api/leave/${id}`);
};

const createleave = (data) => {
  debugger;
  return axios.post("https://localhost:7226/api/leave", data);
};

const updateleave = (data) => {
  debugger;
  return axios.put("https://localhost:7226/api/leave", data);
};

const removeleave = (id) => {
  return axios.delete(`https://localhost:7226/api/leave/${id}`);
};

const getuserbyId = async (userId) => {
  return await axios.get(`https://localhost:7226/api/leave/GetById/${userId}`);
};

const Service = {
  login,
  register,
  getpunch,
  createpunch,
  updatepunch,
  getpunchid,
  GetById,
  remove,
  update,
  create,
  get,
  getAll,
  userbyId,
  checkpunch,
  getuserbyId,
  removeleave,
  updateleave,
  createleave,
  getbyidleave,
};

export default Service;
