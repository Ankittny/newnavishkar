import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const register = (values) => async (dispatch) => {
  try {
    console.log("Hello,Shele");
    dispatch({type:'registerRequest'});
    console.log("firstname",fname);
    console.log("lastname",lname);
    console.log("email", email);
    console.log("password", password);
    const {data} = await axios.post("/register",{values});
    const {token} = data;
    if (success == true) {
      console.log("token run", token);
      localStorage.setItem("authAdminToken", token);
      localStorage.setItem("user", JSON.stringify(user));
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
    console.log("Hello Sky");
    dispatch({ type: "loginRequest" });
    console.log("email", email);
    console.log("password", password);
    const { data } = await axios.post("/login",{values});
    const {token } = data;
    if (success == true) {
      console.log("token run", token);
      localStorage.setItem("authAdminToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "loginSuccess" });
    } else {
      dispatch({ type: "loginFail", payload: message });
    }
  } catch (error) {
    console.log(error)
  }
};

export const logout = () => async () => {
  try {
  } catch (error) {}
};
