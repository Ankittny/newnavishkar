"use client";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { login, register } from "@/redux/Action/Auth";
import "../../styles/_login.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useRouter } from "next/navigation";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const guest_id = 1;
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter for redirection
  const { loading: isLoading, isSuccess, error: authError } = useSelector((state) => state.auth);


  useEffect(() => {
  // console.log("Redux auth state:", { isLoading, isSuccess, authError });
  if (isSuccess) {
    // console.log("Redirecting to /products...");
    router.push("/");
  } else if (authError) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: authError || "Invalid credentials. Please try again.",
    });
  }
}, [isSuccess, authError, router]);// Make sure to include router in the dependency array

  const handleSubmit = (values) => {
    const updatedValues = { ...values, guest_id };
    dispatch(login(updatedValues));
  };

  return (
    <Grid
      container
      component="main"
      className={`${classes.root} login-wrapper-page`}
    >
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image}>
        <Image src="/log.png" width={700} height={650} alt="sjsjs" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid container>
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
          </Grid>
          <div className="mt-4">
            <Divider>OR</Divider>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
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
                      //  placeholder="Email Address"
                      helperText={
                        <ErrorMessage
                          name="email"
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
                  <Grid item xs className="text-end">
                    <Link href="/forget-password">Forget Password</Link>
                  </Grid>
                </Grid>
                <Grid item xs className="text-center mt-2 mb--2">
                <Button type="submit" variant="contained" className="loginButton" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <p className="mt-4 text-center">
                Dont have an account?{" "}
                <span>
                  <Link href="/register" className="curser">
                    Register
                  </Link>
                </span>
              </p>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
