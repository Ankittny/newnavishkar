import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

export const AddressData = (values) => async (dispatch) => {
  try {
    dispatch({ type: "addressRequest" });
    const token = localStorage.getItem('authAdminToken');

    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '', // Only add token if it exists
      }
    };
    
    const { data } = await axios.post("/customer/address/add", values,config);
    dispatch({ type: "addressSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addressFail", payload: error.response?.data.message || error.message });
  }
};

export const getAddressData = () => async (dispatch) => {
  try {
    dispatch({ type: "addressRequest" });

    const token = localStorage.getItem('authAdminToken');

    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '', // Only add token if it exists
      }
    };
    const { data } = await axios.get("/customer/address/list",config);
    dispatch({ type: "addressSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addressFail", payload: error.response?.data.message || error.message });
  }
};
