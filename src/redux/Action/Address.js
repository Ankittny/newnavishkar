import axiosInstance from "@/utils/axios";

const axios = axiosInstance;

export const AddressData = (values) => async (dispatch) => {
  try {
    dispatch({ type: "addressRequest" });
    const token = localStorage.getItem('authAdminToken');

    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '', // Only add token if it exists
      }
    };

    const { data } = await axios.post("/customer/address/add", values, config);
    dispatch({ type: "addressSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addressFail", payload: error.response?.data.message || error.message });
  }
};

export const getAddressData = () => async (dispatch) => {
  try {
    dispatch({ type: "addressRequest" });

    const token = localStorage.getItem('authAdminToken');

    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '', // Only add token if it exists
      }
    };
    const { data } = await axios.get("/customer/address/list", config);
    dispatch({ type: "addressSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "addressFail", payload: error.response?.data.message || error.message });
  }
};





export const updateAddressData = (values) => async (dispatch) => {
  try {
    dispatch({ type: "addressUpdateRequest" });
    const token = localStorage.getItem("authAdminToken");

    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const { data } = await axios.post(`/customer/address/update`, values, config);
    dispatch({ type: "addressUpdateSuccess", payload: data });
    dispatch(getAddressData()); // Refresh the address list after update
  } catch (error) {
    dispatch({ type: "addressUpdateFail", payload: error.response?.data.message || error.message });
  }
};




// export const deleteAddressData = () => async (dispatch) => {
//   try {
//     dispatch({ type: "addressDeleteRequest" });
//     const token = localStorage.getItem('authAdminToken');
//     const config = {
//       headers: {
//         'Authorization': token ? `Bearer ${token}` : '', // Only add token if it exists
//       }
//     }
//     await axios.delete("api/v1/customer/address/delete_address", {
//       data: { customer_id: customerId, address_id: addressId },config,
//     });
//     dispatch({ type: "addressDeleteSuccess", payload: id });
//   } catch (error) {
//     dispatch({ type: "addressDeleteFail", payload: error.response?.data.message || error.message });
//   }
// }

// export const deleteAddressData = (customerId, addressId) => async (dispatch) => {
//   try {
//     dispatch({ type: "addressDeleteRequest" });
//     const token = localStorage.getItem("authAdminToken");
//     const config = {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : "",
//       },
//       data: { customer_id: customerId, address_id: addressId }, // Correct way to send data
//     };

//     await axios.delete("/customer/address", config);

//     dispatch({ type: "addressDeleteSuccess", payload: addressId });
//     dispatch(getAddressData()); // Refresh address list after deletion
//   } catch (error) {
//     dispatch({ type: "addressDeleteFail", payload: error.response?.data.message || error.message });
//   }
// };


export const deleteAddressData = (address_id) => async (dispatch) => {
  try {
    dispatch({ type: "addressDeleteRequest" });

    const token = localStorage.getItem("authAdminToken");
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      data: { address_id }, // Send data in body
    };

    const { data } = await axios.delete("/customer/address/delete_address", config);

    if (data.message === "successfully removed!") {
      dispatch({ type: "addressDeleteSuccess", payload: data });
      dispatch(getAddressData()); // Refresh address list
      return { payload: data }; // Return API response for toast handling
    }
  } catch (error) {
    dispatch({
      type: "addressDeleteFail",
      payload: error.response?.data.message || error.message,
    });
    return { error: true }; // Return error for toast handling
  }
};

