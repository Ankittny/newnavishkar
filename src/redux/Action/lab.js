import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const lab = () => async (dispatch) => {
  try {
    console.log("Hello Lab");
    dispatch({ type: "labRequest" });
    const { data } = await axios.get("");
    console.log("Lab Data:", data);
    dispatch({ type: "labSuccess" });
  } catch (error) {
    dispatch({
      type: "labFail",
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};

export const labDetail = (labId) => async (dispatch) => {
  try {
    console.log("Hello Lab Detail");
    dispatch({ type: "labDetailRequest" });
    const { data } = await axios.get(``);
    console.log("Lab Detail Data", data);
    dispatch({ type: "labDetailSuccess" });
  } catch (error) {
    dispatch({
      type: "labDetailFail",
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};
