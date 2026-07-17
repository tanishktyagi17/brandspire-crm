import axios from "axios";

const api = axios.create({
  baseURL: "site--brandspire-crm--gnbmjcfsyzsx.code.run",
  withCredentials: true,
});

export default api;