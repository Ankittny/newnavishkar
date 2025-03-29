"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, TextField, Paper, Grid, CssBaseline } from "@mui/material";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp } from "@/redux/Action/Auth";
import "../../styles/_login.scss";
import { MdEdit } from "react-icons/md";
import { login } from "@/redux/Action/Auth";
import toast from "react-hot-toast";
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

// const API_URL = "https://admin.navishkar.com/api/v1/auth/social-login"; // Backend API

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, profile_status, isLoading, isError, error } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // Flag to prevent multiple clicks

  useEffect(() => {
    if (isSuccess) {
      if (profile_status === false) {
        router.push("/myprofile");
      } else {
        router.push("/");
      }
    }
  }, [isSuccess, profile_status, router]);

  const handleSendOtp = () => {
    if (phone.length === 13) {
      dispatch(sendOtp(phone));
      setIsOtpSent(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
      });
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const googleToken = await user.getIdToken(); // Get Firebase Auth Token

      console.log("Google Auth Token:", googleToken); // Debugging

      const response = await axios.post('/auth/social-login', {
        token: googleToken,
        unique_id: user.uid,
        medium: "google",
      });


      console.log("Backend Response:", response.data); // Debugging


      if (response.data?.token) {
        const userData = {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          token: response.data.token, // Store backend-provided token
        };

        dispatch(login(userData));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${user.displayName}`,
        });

        // Ensure navigation only happens after Redux state updates
        setTimeout(() => {
          router.push("/myprofile");
        }, 500);
      } else {
        throw new Error("Token not received from backend");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data?.message || error.message,
      });
    }
  };



  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (/[^0-9+]/.test(value)) {
      return; // Prevent invalid characters
    }

    if (value.length <= 13 && value.startsWith("+91")) {
      setPhone(value);
    }
  };


  const handleEditPhone = () => {
    setIsOtpSent(false); // Go back to phone input state
    setOtp(Array(6).fill("")); // Clear OTP if user wants to edit the phone number
  };
  const handleOtpChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      if (!isVerifying) {
        setIsVerifying(true);
        const firebaseToken = "default-firebase-token";
        dispatch(
          verifyOtp({
            phone,
            otp: otpCode,
            cm_firebase_token: firebaseToken,
          })
        );
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete OTP",
        text: "Please enter all 6 digits of the OTP.",
      });
    }
  };

  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: "Incorrect OTP",
        text: error,
      }).then(() => {
        setIsVerifying(false);
      });
    } else if (isSuccess) {
      setIsVerifying(false);
    }
  }, [isError, error, isSuccess]);

  return (
    <Grid container component="main" className="login-wrapper-page" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} sx={{ backgroundImage: 'url("/log.png")', backgroundSize: "cover" }}>
        <Image src="/log.png" width={700} height={650} alt="Login Image" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        {/* <div className="fresh-login">
          <Grid item xs={12} sm={12}>
            <div className='loginwithother' onClick={handleGoogleLogin}>
              <Image src='/icons/google.png' width={30} height={30} alt='google' />
              <p className='m-0'>Login with Google</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} className="mt-2">
            <div className="loginwithother">
              <Image src="/icons/facebook.png" width={30} height={30} alt="facebook" />
              <p className="m-0">Login with Facebook</p>
            </div>
          </Grid>
        </div> */}
        <div className="mt-4">
          <Divider>Login with Mobile OTP { }</Divider>
        </div>

        {!isOtpSent ? (
          <form noValidate className="outline-form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Enter Your Mobile Number"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              inputProps={{ maxLength: 13 }}
              placeholder="Enter 10-digit mobile number"
            />
            <Button
              type="button"
              variant="contained"
              fullWidth
              disabled={isLoading}
              onClick={handleSendOtp}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form noValidate>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              {otp.map((digit, index) => (
                <Grid item key={index} xs={2} sm={2} md={1}>
                  <TextField
                    variant="outlined"
                    id={`otp-input-${index}`}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="button"
              variant="contained"
              fullWidth
              disabled={isLoading || isVerifying}
              onClick={handleVerifyOtp}
              sx={{ mt: 3 }}
            >
              {isLoading || isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}
        {isOtpSent && (
          <div className="mt-4">
            <Divider>
              You want to Edit  {phone}
              <Button
                onClick={handleEditPhone} // Go back to the phone input section
                sx={{ ml: 2 }}
                variant="text"
                color="primary"
              >
                <MdEdit size={25} />
              </Button>
            </Divider>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Login;





