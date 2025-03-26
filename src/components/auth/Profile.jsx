
"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getProfile, profile } from "@/redux/Action/Auth";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
    .required("Email is required"),
});

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile_info } = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [initialValues, setInitialValues] = useState({
    f_name: "",
    l_name: "",
    email: "",
    profile_image: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile_info) {
      setInitialValues({
        f_name: profile_info.f_name || "",
        l_name: profile_info.l_name || "",
        email: profile_info.email || "",
        profile_image: profile_info.image_full_url?.path || "",
        
      });
      setPreview(profile_info.image_full_url?.path || ""); // Set preview if image exists
    }
  }, [profile_info]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("f_name", values.f_name);
      formData.append("l_name", values.l_name);
      formData.append("email", values.email);
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      const response = await dispatch(profile(formData));
      if (response?.message === "Successfully updated!") {
        toast.success("Profile successfully updated!");
        
      } else {
        toast.error("Failed to update profile");
        dispatch(getProfile());
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={12} component={Paper} elevation={6} square>
        <div>
          <Typography component="h1" variant="h5" className="text-center mb-2">
            Update Your Profile
          </Typography>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form noValidate>
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
                      value={values.f_name}
                      onChange={handleChange}
                      helperText={<ErrorMessage name="f_name" component="div" className="error" />}
                    />
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
                  <Grid item xs={12} sm={6} className="d-flex justify-content-center align-items-center">
                  {preview ? (
                      <img
                        src={preview}
                        alt="Profile Photo"
                        style={{ width: "80%", maxHeight: "200px", borderRadius: "8px"}}
                      />
                    ) : (
                      <Typography variant="subtitle1" className="text-center">No image uploaded</Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Button type="submit" variant="contained" color="primary">
                      Update Profile <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    
                  </Grid>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={handleFileChange}>
                      Upload files
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
