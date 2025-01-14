import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

export const WorkshopData = (slug) => async (dispatch) => {
  try {
    dispatch({ type: "workshopRequest" });
    const { data } = await axios.get(`/categories/work-shop-products/${slug}`);
    console.log("Workshop Data: Ankit", data);

    dispatch({ type: "workshopSuccess", payload: data.workshopproducts || [] });
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


export const WorkshopDataDetails = (slug) => async(dispatch)=>{
  try {
    dispatch({ type: "workshopDetailsRequest" });

    const { data } = await axios.get(`/categories/work-shop-details/${slug}`);
    console.log("WorkshopDetail Data: Ankit Details", data);

    dispatch({ type: "workshopDetailsSuccess", payload: data.workshopproductsdetails || [] });

  } catch (error) {
    console.error("Error fetching workshop:", error);

    dispatch({
      type: "workshopDetailsError",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}