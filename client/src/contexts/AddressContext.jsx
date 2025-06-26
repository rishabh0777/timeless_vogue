import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const AddressContext = createContext();

export const addAddress = async (address)=>{
    try{
      const myAddress = await axios.post('/api/v1/address/add', address)
      console.log("Successfully Address Created!");
    }catch{
      console.log("Something went wrong!");
    }
}

export const fetchAddress = async (userId)=>{
  
}






const AddressProvider = ({ children }) => {
  

  return (
    <AddressContext.Provider
      value={{ }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;
export { AddressContext };
