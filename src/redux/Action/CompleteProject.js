import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const completeProjectData = (slug) => async (dispatch) => {
  try {
   
    dispatch({ type: "completeProjectRequest" });

    const { data } = await axios.get(`/categories/products/${slug}`);
  

    dispatch({ type: "completeProjectSuccess", payload: data });
  } catch (error) {
    console.error("Error fetching navbar categories:", error);
    dispatch({
      type: "completeProjectFail",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.",
    });
  }
};
