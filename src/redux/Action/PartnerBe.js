import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const partnerBeData = (formData) => async (dispatch) => {
  try {
    console.log("Partnerus API Request Initiated");
    dispatch({ type: "partnerRequest" });

    const response = await axios.post("/be_partner_with", formData);

    // Extract serializable data
    const { status, message } = response.data || {};

    if (status) {
      dispatch({
        type: "partnerSuccess",
        payload: { status, message }, // Only serializable data
      });
      return { status, message }; // Return serializable data
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    console.error("API Error: ", error);

    dispatch({ 
      type: "partnerFail", 
      payload: { message: error.message } 
    });
    throw error;
  }
};
