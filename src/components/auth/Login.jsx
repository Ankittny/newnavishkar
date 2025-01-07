"use client";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from '@mui/material/TextField';
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles/_login.scss";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp } from "@/redux/Action/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, profile_status, isLoading, isError, error } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);  // Flag to prevent multiple clicks

  useEffect(() => {
    if (isSuccess) {
      if (profile_status === false) {
        router.push("/profile");
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

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (/[^0-9+]/.test(value)) {
      return; // Prevent invalid characters
    }

    if (value.length <= 13 && value.startsWith('+91')) {
      setPhone(value);
    }
  };

  const handleOtpChange = (value, index) => {
    // Only allow numeric input or an empty string (for deleting digits)
    if (/^[0-9]$/.test(value) || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Automatically focus on the next input if the current input is filled
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
        setIsVerifying(true); // Set verifying flag to true to prevent multiple clicks
        const firebaseToken = "default-firebase-token";
        dispatch(verifyOtp({
          phone,
          otp: otpCode,
          cm_firebase_token: firebaseToken,
        }));
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete OTP",
        text: "Please enter all 6 digits of the OTP.",
      });
    }
  };

  // Check for OTP verification result and handle alerts
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: "Incorrect OTP",
        text: error,
      }).then(() => {
        setIsVerifying(false);  // Reset verifying flag after alert
      });
    } else if (isSuccess) {
      setIsVerifying(false);  // Reset verifying flag on success
    }
  }, [isError, error, isSuccess]);

  return (
    <Grid container component="main" className={`${classes.root} login-wrapper-page`}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image}>
        <Image src="/log.png" width={700} height={650} alt="Login Image" />
      </Grid>
      <Grid>

      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <div className="fresh-login">
          <Grid item xs={12} sm={12}>
            <div className="loginwithother ">
              <Image src="/icons/google.png" width={30} height={30} />
              <p className="m-0">Login with Google</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} className="mt-2">
            <div className="loginwithother">
              <Image src="/icons/facebook.png" width={30} height={30} />
              <p className="m-0">Login with Facebook</p>
            </div>
          </Grid>
        </div>
        <div className={classes.paper}>
          <div className="mt-4">
            <Divider>Login with Mobile OTP</Divider>
          </div>

          {!isOtpSent ? (
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Enter Your Mobile Number"
                name="phone"
                value={phone}
                onChange={handlePhoneChange} // Phone number change handler
                inputProps={{ maxLength: 13 }}
                placeholder="Enter 10-digit mobile number"
              />
              <Button
                type="button"
                variant="contained"
                className="loginButton"
                disabled={isLoading}
                onClick={handleSendOtp}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <form className={classes.form} noValidate>
              <Grid container spacing={2} justifyContent="center">
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
                      onChange={(e) => handleOtpChange(e.target.value, index)} // Handling OTP input
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                type="button"
                variant="contained"
                className="loginButton mt-3"
                disabled={isLoading || isVerifying}
                onClick={handleVerifyOtp}
              >
                {isLoading || isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
