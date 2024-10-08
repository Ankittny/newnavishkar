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
import { Facebook as FacebookIcon, Google as GoogleIcon } from "@mui/icons-material";
import { register } from "@/redux/Action/Auth";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

// Styles for the component
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

// Validation schema using Yup
const validationSchema = Yup.object({
  f_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "First Name can only contain alphabets")
    .min(3, "Name must contain at least 3 characters")
    .required("First Name is required"),

  l_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last Name can only contain alphabets")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
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
  const { loading: isLoading, success: isSuccess, error } = useSelector((state) => state.auth);

  
  const handleSubmit = async (values) => {
    try {
      const { cpassword, termsAccepted, ...registerValues } = values;
      console.log("Register Values:", registerValues);
      const response = await dispatch(register(registerValues));

      if (response) {
        console.log("Response", response);
        alert("Register Successfully");
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create account");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image}>
        <Image src="/log.png" width={700} height={900} alt="Background image" />
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
              f_name: "",
              l_name: "",
              email: "",
              phone: "",
              password: "",
              cpassword: "",
              termsAccepted: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values)=>{
              handleSubmit(values)
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="f_name"
                      label="First Name"
                      name="f_name"
                      autoComplete="f_name"
                      autoFocus
                      value={values.f_name}
                      onChange={handleChange}
                      helperText={<ErrorMessage name="f_name" component="div" className="error" />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="l_name"
                      label="Last Name"
                      name="l_name"
                      autoComplete="l_name"
                      value={values.l_name}
                      onChange={handleChange}
                      helperText={<ErrorMessage name="l_name" component="div" className="error" />}
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
                      helperText={<ErrorMessage name="email" component="div" className="error" />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      value={values.phone}
                      onChange={handleChange}
                      helperText={<ErrorMessage name="phone" component="div" className="error" />}
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
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={<ErrorMessage name="password" component="div" className="error" />}
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
                              {showCPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={<ErrorMessage name="cpassword" component="div" className="error" />}
                    />
                  </Grid>

                  <FormControlLabel
                    control={
                      <Field as={Checkbox} name="termsAccepted" color="primary" onChange={handleChange} />
                    }
                    label="I agree to all the Terms and Conditions"
                  />
                  <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                    Create Account
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Divider variant="middle" />
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );}