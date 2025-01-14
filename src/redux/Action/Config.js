import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const configData = () => async (dispatch) => {
  try {
    console.log("Hello Config");
    dispatch({ type: "configRequest" });

    const { data } = await axios.get("/config");
    console.log("Config Data shalu", data);

    // Pass the data to configSuccess action
    dispatch({ type: "configSuccess", payload: data });  // Pass the data here
  } catch (error) {
    dispatch({
      type: "configFail",
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};
