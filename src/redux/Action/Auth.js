import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

// Register action
export const profile = (values) => async (dispatch) => {
  try {
    dispatch({ type: "profileRequest" });
    const { data } = await axios.post("auth/register", values);
    const { token, user } = data;

    if (token) {
      localStorage.setItem("authAdminToken", token);
      dispatch({ type: "profileSuccess", payload: user });
    } else {
      dispatch({ type: "profileFail", payload: "Profile failed. Please try again." });
    }
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response?.data?.message || "Something went wrong" });
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
    console.log("OTP SEND")
    dispatch({ type: "sendOtpSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "sendOtpFail", payload: error.response?.data?.message || "Failed to send OTP" });
  }
};

export const verifyOtp = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "verifyOtpRequest" });
    const { data } = await axios.post("auth/otp-verify", payload);
    console.log("OTP VERIFY");

    const { token, user, profile_status, message } = data;

    if (token) {
      localStorage.setItem("authAdminToken", token);
      dispatch({ type: "verifyOtpSuccess", payload: { user, profile_status } });
    } else {
      // Dispatch failure with message if OTP verification failed
      dispatch({ type: "verifyOtpFail", payload: message || "OTP verification failed." });
    }
  } catch (error) {
    // Dispatch failure if an error occurs during the request
    dispatch({ type: "verifyOtpFail", payload: error.response?.data?.message || "OTP verification failed" });
  }
};



// Logout action

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    localStorage.removeItem("authAdminToken");
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response?.data?.message || "Logout failed" });
  }
};