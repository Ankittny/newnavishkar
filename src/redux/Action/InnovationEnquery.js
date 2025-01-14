import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const InnovationEnqueryData = (formData) => async (dispatch) => {
  try {
   
    const response = await axios.post("/innovations_enquiry_create", formData);
   
    // Extract serializable data
    const { status, message } = response.data || {};

    if (status) {
      dispatch({ 
        type: "SUBMIT_SUCCESS", 
        payload: { status, message } // Only serializable data
      });
      return { status, message }; // Return serializable data
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    console.error("Error in Innovation Inquiry:", error);

    // Serialize the error message
    dispatch({ 
      type: "SUBMIT_FAILURE", 
      payload: { message: error.message } 
    });
    throw error;
  }
};
