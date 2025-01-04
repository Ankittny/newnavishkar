import axiosInstance from "@/utils/axios";
const axios = axiosInstance;
// Action creator for fetching banner
export const Banner = () => async (dispatch) => {
  try {
    console.log("Hello Banner");

    // Dispatch bannerRequest to set loading state
    dispatch({ type: "bannerRequest" });

    // Fetch banner data
    const { data } = await axios.get("/banners");
    console.log("Banner Data:", data);

    // Dispatch bannerSuccess with the fetched data
    dispatch({ type: "bannerSuccess", payload: data });
  } catch (error) {
    console.error("Error fetching banners:", error);

    // Dispatch bannerFail with the error message
    dispatch({
      type: "bannerFail",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
