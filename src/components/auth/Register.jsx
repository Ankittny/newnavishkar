
"use client";
import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/_register.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { register } from "@/redux/Action/Auth";
import { useSelector,useDispatch } from "react-redux";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object({
  fname: Yup.string()
    .matches(/^[A-Za-z]+$/, "First Name can only contain alphabets")
    .min(3, "Name must contain at least 3 characters")
    .required("First Name is required"),

  lname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last Name can only contain alphabets")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Email is required"),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  termsAccepted: Yup.bool().oneOf([true], "You must accept the terms"),
});

export default function Register() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
 
  const dispatch = useDispatch();
  const {loading:isLoading,success:isSuccess,error}=useSelector(state =>state.auth)

  const handleSubmit = async (values) => {
    try {
      const response = dispatch(register(values));
      console.log("Response",response);
      alert("Resiter Successfully")
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create account");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image}>
        <Image src='/log.png' width={700} height={900} alt="sjsjs"   />
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className="mainHeading">
            Sign Up
          </Typography>
          <p className="signuppara mt-3">
            Let’s get you all set up so you can access your personal account.
          </p>
          <Formik
            initialValues={{
              fname: "",
              lname: "",
              email: "",
              number: "",
              password: "",
              cpassword: "",
              termsAccepted: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values)=>{
              handleSubmit(values)
            }}
            validateOnBlur={true}
          >
            {({ values, handleChange,handleSubmit }) => (
              <Form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fname"
                      label="First Name"
                      name="fname"
                      autoComplete="fname"
                      autoFocus
                      value={values.fname}
                      onChange={handleChange}
                      helperText={
                        <ErrorMessage
                          name="fname"
                          component="div"
                          className="error"
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lname"
                      label="Last Name"
                      name="lname"
                      autoComplete="lname"
                      value={values.lname}
                      onChange={handleChange}
                      helperText={
                        <ErrorMessage
                          name="lname"
                          component="div"
                          className="error"
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      helperText={
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="number"
                      label="Phone Number"
                      name="number"
                      autoComplete="number"
                      value={values.number}
                      onChange={handleChange}
                      inputProps={{ maxLength: 10 }}
                      helperText={
                        <ErrorMessage
                          name="number"
                          component="div"
                          className="error"
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error"
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="cpassword"
                      label="Confirm Password"
                      name="cpassword"
                      type={showCPassword ? "text" : "password"}
                      value={values.cpassword}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={() => setShowCPassword(!showCPassword)}
                            >
                              {showCPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        <ErrorMessage
                          name="cpassword"
                          component="div"
                          className="error"
                        />
                      }
                    />
                  </Grid>

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        name="termsAccepted"
                        color="primary"
                        checked={values.termsAccepted}
                        onChange={handleChange}
                      />
                    }
                    label="I agree to all the Terms and Conditions"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create Account
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>


          {/* Feedback messages */}
          {isLoading && <p>Loading...</p>}
          {isSuccess && <p>Account created successfully!</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          <Grid container>
            <Grid item xs>
              <p>
                Already have an account?{" "}
                <span>
                  <Link>Login</Link>
                </span>
              </p>
            </Grid>
          </Grid>

          <div className="mt-2 mb-2">
            <Divider>OR</Divider>
          </div>

          <Grid container className="mt-2">
            <Grid item xs={6}>
              <div className="signupwithother">
                <FacebookIcon />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="signupwithother">
                <GoogleIcon />
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
