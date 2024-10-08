import axiosInstance from "@/utils/axios";

const axios = axiosInstance;


export const categories = () => async (dispatch) => {
  try {
    console.log("Hello Category");
    dispatch({ type: 'categoryRequest' });
    // const token = (typeof window !== 'undefined' && localStorage.getItem('authAdminToken')) || 'navishkar';
    
    const { data } = await axios.get('/categories');
    console.log("Category Data:", data);
    dispatch({ type: 'categorySuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'categoryFail',
      payload: error.response && error.response.message
        ? error.response.message
        : error.message,
    });
  }
};

export const categoryByAgeGroups = (slug) => async (dispatch) => {
  try {
    dispatch({ type: 'categoryByAgeGroupRequest' });
    const { data } = await axios.get(`/categories/products/${slug}`);
    dispatch({
      type: 'categoryByAgeGroupSuccess',
      payload: data, 
    });
  } catch (error) {
    
    dispatch({
      type: 'categoryByAgeGroupFail',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const CategoryDetail = (categoryId) => async (dispatch) => {
  try {
    console.log("Fetching category details for ID:", categoryId);
    dispatch({ type: "categoryDetailRequest" });
    const { data } = await axios.get(`/products/details/${categoryId}`);
    console.log("Category Details Response", data);
    if (data) {
      dispatch({ type: "categoryDetailSuccess", payload: data });
    } else {
      dispatch({
        type: "categoryDetailFail",
        payload: "No category details found",
      });
    }
  } catch (error) {
    console.error("Error fetching category details:", error);
    dispatch({ type: "categoryDetailFail", payload: error.message });
  }
};



