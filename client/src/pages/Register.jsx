import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";

import {
  sendOtp,
  verifyOtp,
  registerUser,
} from "../services/authService";


const Register = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Employee",
  });


  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);

  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSendOtp = async () => {

    if (!formData.email) {

      toast.error(
        "Please enter your email first."
      );

      return;
    }


    try {

      setLoading(true);


      const response =
        await sendOtp(formData.email);


      toast.success(
        response.message
      );


      setOtpSent(true);


    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP."
      );


    } finally {

      setLoading(false);

    }

  };




  const handleVerifyOtp = async () => {


    if (!otp) {

      toast.error(
        "Please enter OTP."
      );

      return;

    }



    try {

      setLoading(true);


      const response =
        await verifyOtp({
          email: formData.email,
          otp,
        });



      toast.success(
        response.message
      );


      setOtpVerified(true);



    } catch(error){


      toast.error(
        error.response?.data?.message ||
        "OTP verification failed."
      );


    } finally {

      setLoading(false);

    }

  };




  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!otpVerified) {

      toast.error(
        "Please verify OTP first."
      );

      return;

    }



    if (
      formData.password !==
      formData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match."
      );

      return;

    }



    try {

      setLoading(true);



      const response =
        await registerUser({

          name: formData.name,

          email: formData.email,

          password: formData.password,

          role: formData.role,

        });



      toast.success(
        response.message
      );



      navigate("/login");



    } catch(error){


      toast.error(
        error.response?.data?.message ||
        "Registration failed."
      );


    } finally {

      setLoading(false);

    }

  };





  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">


      <motion.div

        initial={{
          opacity:0,
          y:30
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"

      >


        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h1>


        <p className="text-center text-gray-500 mt-2">
          Join Brandspire CRM
        </p>




        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >



          <div className="relative">

            <User
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />

            <input

              name="name"

              value={formData.name}

              onChange={handleChange}

              placeholder="Full Name"

              className="w-full pl-10 p-3 border rounded-lg"

              required

            />

          </div>




          <div className="relative">

            <Mail
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />

            <input

              name="email"

              type="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Email Address"

              className="w-full pl-10 p-3 border rounded-lg"

              required

            />


          </div>



          <button

            type="button"

            onClick={handleSendOtp}

            disabled={loading}

            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

          >

            {loading
              ? "Sending..."
              : "Send OTP"
            }

          </button>





          {otpSent && (

            <div className="space-y-3">


              <div className="relative">


                <KeyRound

                  className="absolute left-3 top-3 text-gray-400"

                  size={20}

                />


                <input

                  value={otp}

                  onChange={(e)=>setOtp(e.target.value)}

                  placeholder="Enter OTP"

                  className="w-full pl-10 p-3 border rounded-lg"

                />


              </div>



              <button

                type="button"

                onClick={handleVerifyOtp}

                disabled={loading || otpVerified}

                className="w-full bg-green-600 text-white py-3 rounded-lg"

              >

                {
                  otpVerified
                  ? "OTP Verified"
                  : "Verify OTP"
                }


              </button>


            </div>

          )}






          <div className="relative">


            <Lock

              className="absolute left-3 top-3 text-gray-400"

              size={20}

            />


            <input

              name="password"

              type="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Password"

              className="w-full pl-10 p-3 border rounded-lg"

              required

            />


          </div>





          <div className="relative">


            <Lock

              className="absolute left-3 top-3 text-gray-400"

              size={20}

            />


            <input

              name="confirmPassword"

              type="password"

              value={formData.confirmPassword}

              onChange={handleChange}

              placeholder="Confirm Password"

              className="w-full pl-10 p-3 border rounded-lg"

              required

            />


          </div>





          <div className="relative">


            <ShieldCheck

              className="absolute left-3 top-3 text-gray-400"

              size={20}

            />


            <select

              name="role"

              value={formData.role}

              onChange={handleChange}

              className="w-full pl-10 p-3 border rounded-lg"

            >

              <option value="Employee">
                Employee
              </option>

              <option value="Manager">
                Manager
              </option>

              <option value="Admin">
                Admin
              </option>


            </select>


          </div>





          <button

            type="submit"

            disabled={loading}

            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"

          >

            {
              loading
              ? "Creating Account..."
              : "Register"
            }


          </button>



        </form>


      </motion.div>


    </div>

  );

};


export default Register;