import axiosInstance from "@/utils/axios";
export const navbarCategoriesData = () => async (dispatch) => {
  dispatch({ type: "navbarCategoryRequest" });

  try {
    const { data } = await axiosInstance.get("/categories/workshop-category");
    dispatch({
      type: "navbarCategorySuccess",
      payload: data.workshopcategories || [],
    });
  } catch (error) {
    console.error("Error fetching navbar categories:", error);
    dispatch({
      type: "navbarCategoryFail",
      payload: error.response?.data?.message || error.message || "Something went wrong.",
    });
  }
};
