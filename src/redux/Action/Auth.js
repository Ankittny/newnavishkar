import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

// Register action
export const register = (values) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post("auth/register", values);
    const { token, user } = data;

    if (token) {
      localStorage.setItem("authAdminToken", token);
      dispatch({ type: "registerSuccess", payload: user });
    } else {
      dispatch({ type: "registerFail", payload: "Registration failed. Please try again." });
    }
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response?.data?.message || "Something went wrong" });
  }
};

// Login action
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

export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post("auth/login", values);
    const { token, user } = data;

    if (token) {
      localStorage.setItem("authAdminToken", token);
      dispatch({ type: "loginSuccess", payload: user });
    } else {
      dispatch({ type: "loginFail", payload: "Login failed. Please check your credentials." });
    }
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response?.data?.message || "Login failed" });
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