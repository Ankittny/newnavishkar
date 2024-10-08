import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const register = (values) => async (dispatch) => {
  try {
    console.log("Hello,Shele");
    dispatch({type:'registerRequest'});
    const {data} = await axios.post("auth/register",values);
    const {token} = data;
    if (success == true) {
      console.log("token run", token);
      localStorage.setItem("authAdminToken", token);
      // localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "registerSuccess" });
    } else {
      dispatch({ type: "registerFail", payload: message });
    }
  } catch (error) {
    console.log(error)
  }
};

export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    console.log(values);
    
    const { data } = await axios.post("auth/login",values);
    const {token } = data;
    if (token) {
      console.log("token run", token);
      localStorage.setItem("authAdminToken", token);
      // localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "loginSuccess" });
    } else {
      dispatch({ type: "loginFail", payload: message });
    }
  } catch (error) {
    console.log(error)
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({type:'logoutRequest'});
    localStorage.removeItem("authAdminToken");
    dispatch({type:'logoutSuccess'});
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    })
  }
};
