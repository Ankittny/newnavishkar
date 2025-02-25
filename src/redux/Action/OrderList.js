import axiosInstance from "@/utils/axios";
const axios = axiosInstance;

export const orderLists = () => async (dispatch) => {
    try {
        dispatch({ type: "orderListRequest" });

        const { data } = await axios.get("/customer/order/list");
        console.log("Order List Data:", data);

        dispatch({ type: "orderListSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "orderListFail",
            payload: error.response?.data?.message || error.message,
        });
    }
};



export const orderGetById = (id) => async (dispatch) => {
    try {

        dispatch({ type: "orderGetByIdRequest" });

        const token = localStorage.getItem("authAdminToken"); // Get token from localStorage
        // console.log("Token being sent:", token);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        // const { data } = await axios.get('/customer/order/get-order-by-id',
        //     { order_id: id }, config);

        const { data } = await axios.get(`/customer/order/get-order-by-id?order_id=${id}`, config);
        console.log(`Order ${id} Data:, data`);

        dispatch({ type: "orderGetByIdSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "orderGetByIdFail",
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "orderDetailsByIdRequest" });

        const token = localStorage.getItem("authAdminToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get(`/customer/order/details?order_id=${id}`, config)
        console.log(`Order ${id} Data:`, data); // ✅ Fixed log statement


        dispatch({ type: "orderDetailsByIdSuccess", payload: data});
    } catch (error) {
        dispatch({ type: "orderDetailsByIdFail", 
            payload: error.response?.data?.message || error.message });
    }
}
