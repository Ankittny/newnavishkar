import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

export const WorkshopData = () => async (dispatch) => {
  try {
    dispatch({ type: "workshopRequest" });
    const { data } = await axios.get("/categories/workshop-category");
    console.log("Workshop Data:", data);

    dispatch({ type: "workshopSuccess", payload: data });
  } catch (error) {
    console.error("Error fetching workshop:", error);

    dispatch({
      type: "workshopFail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
