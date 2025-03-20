import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

// Register action
export const profile = (values) => async (dispatch) => {
  try {
    dispatch({ type: "profileRequest" });

    const gettoken = localStorage.getItem("authAdminToken");

    // Set up headers with the token
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${gettoken}`,
      },
    };

    const { data } = await axios.post("customer/update-profile", values, config);
    const { user } = data;

    if (user) {
      dispatch({ type: "profileSuccess", payload: user });
    } else {
      dispatch({ type: "profileFail", payload: "Profile update failed. Please try again." });
    }

    return data; // Return the API response
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    dispatch({
      type: "profileFail",
      payload: errorMessage,
    });
    throw new Error(errorMessage); // Throw an error to handle it in the component
  }
};


export const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "getProfileRequest" });
    const gettoken = localStorage.getItem("authAdminToken");

    // Set up headers with the token
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${gettoken}`,
      },
    };

    const { data } = await axiosInstance.get("customer/info", config);
    dispatch({ type: "getProfileSuccess", payload: data });

    

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    dispatch({ type: "getProfileFail", payload: errorMessage });
  }
};


// export const login = (values) => async (dispatch) => {
//   try {
//     dispatch({ type: "loginRequest" });
//     const { data } = await axios.post("auth/login", values);
//     const { token, user } = data;

//     if (token) {
//       localStorage.setItem("authAdminToken", token);
//       dispatch({ type: "loginSuccess", payload: user });
//     } else {
//       dispatch({ type: "loginFail", payload: "Login failed. Please check your credentials." });
//     }
//   } catch (error) {
//     dispatch({ type: "loginFail", payload: error.response?.data?.message || "Login failed" });
//   }
// };

export const sendOtp = (phone) => async (dispatch) => {
  try {
    dispatch({ type: "sendOtpRequest" });
    const { data } = await axios.post("auth/send-otp", { phone });
    console.log("OTP SEND");
    dispatch({ type: "sendOtpSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "sendOtpFail",
      payload: error.response?.data?.message || "Failed to send OTP",
    });
  }
};

export const verifyOtp = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "verifyOtpRequest" });
    const { data } = await axios.post("auth/otp-verify", payload);
    console.log("OTP VERIFY");

    const { id, token, user, profile_status, message } = data;

    if (token) {
      localStorage.setItem("authAdminToken", token);
      localStorage.setItem("userid", id);
      dispatch({ type: "verifyOtpSuccess", payload: { user, profile_status } });
    } else {
      // Dispatch failure with message if OTP verification failed
      dispatch({
        type: "verifyOtpFail",
        payload: message || "OTP verification failed.",
      });
    }
  } catch (error) {
    // Dispatch failure if an error occurs during the request
    dispatch({
      type: "verifyOtpFail",
      payload: error.response?.data?.message || "OTP verification failed",
    });
  }
};

// Logout action

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    localStorage.removeItem("authAdminToken");
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};
