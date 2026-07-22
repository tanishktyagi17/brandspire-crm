import api from "./api";


/* ===========================================================
   SEND OTP
=========================================================== */

export const sendOtp = async (email) => {

  const response = await api.post(
    "/auth/send-otp",
    {
      email,
    }
  );

  return response.data;

};



/* ===========================================================
   VERIFY OTP
=========================================================== */

export const verifyOtp = async (data) => {

  const response = await api.post(
    "/auth/verify-otp",
    data
  );

  return response.data;

};



/* ===========================================================
   REGISTER USER
=========================================================== */

export const registerUser = async (data) => {

  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;

};



/* ===========================================================
   LOGIN USER
=========================================================== */

export const loginUser = async (data) => {

  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;

};