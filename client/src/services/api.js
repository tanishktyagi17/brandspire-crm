import axios from "axios";

const api = axios.create({
  baseURL: "https://site--brandspire-crm--gnbmjcfsyzsx.code.run/api",
  withCredentials: true,
});

export default api;