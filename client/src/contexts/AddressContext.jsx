import { createContext, useState } from "react";
import axios from "axios";

const AddressContext = createContext();
const url = import.meta.env.VITE_API_BASE_URL

export const addAddress = async (formData) => {
  try {
    const response = await axios.post(
      `${url}/api/v1/address/add`,
      formData);
    return response;
  } catch (err) {
    // console.log("something went wrong!")
    throw err
  }
};

 
export const fetchAddress = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${url}/api/v1/address/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    // console.log("Failed to fetch Address!: ", error);
  }
}

export const updateAddress = async (id, formData) => {
  if (!id) {
    // console.log("Unable to find id");
    return;
  }
  if (!formData) {
    // console.log("formData not found");
    return;
  }

  try {
    const response = await axios.put(`${url}/api/v1/address/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response; // ✅ Return actual response, not the function itself
  } catch (error) {
    // console.log("Error while updating address:", error);
    throw error; // Optional: So caller knows something went wrong
  }
};

export const removeAddress = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${url}/api/v1/address/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id }, // ✅ Send ID in request body
    });
    return response;
  } catch (error) {
    // console.error("Failed to delete address", error);
    throw error;
  }
};









const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')


  return (
    <AddressContext.Provider
      value={{ addresses, setAddresses, selectedAddress, setSelectedAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;
export { AddressContext };
