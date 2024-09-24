import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });
    
    const { data } = await axios.post("/api/register", userData);
    
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'loginRequest' });
    
    const { data } = await axios.post("/api/login", userData);
    
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });
    
    await axios.post("/api/logout");
    
    dispatch({ type: 'logoutSuccess' });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};
