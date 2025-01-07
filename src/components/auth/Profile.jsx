"use client";
import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { profile } from "@/redux/Action/Auth";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  previewImage: {
    marginTop: theme.spacing(2),
    maxHeight: 200,
    width:"300px",
    margin:"auto",
    borderRadius:"15px",
    marginBottom:"30px",
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
});

export default function Profile() {
  const classes = useStyles();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading: isLoading, success: isSuccess, error } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("f_name", values.f_name);
      formData.append("l_name", values.l_name);
      formData.append("email", values.email);
      if (file) {
        formData.append("file", file);
      }

      console.log("Form Data:", formData);
      const response = await dispatch(profile(formData));

      if (response) {
        console.log("Response", response);
        alert("profile Successfully");
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
        <Image src="/log.png" width={700} height={700} alt="Background image" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className="mainHeading">
            Update Your Profile
          </Typography>
          <Formik
            initialValues={{
              f_name: "",
              l_name: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, handleChange }) => (
              <Form className={classes.form} noValidate>
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
                      helperText={<ErrorMessage name="email" component="div" className="error" />}
                    />
                  </Grid>

                  {preview && (
                    <img src={preview} alt="Preview" className={classes.previewImage} />
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                    Update Profile
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
