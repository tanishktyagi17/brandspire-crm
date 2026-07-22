import api from "./api";



/* ===========================================================
   LOGIN USER
=========================================================== */

export const loginUser = async (data) => {

  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;

};



/* ===========================================================
   REGISTER USER
=========================================================== */

export const registerUser = async (data) => {

  const response =
    await api.post(
      "/auth/register",
      data
    );

  return response.data;

};