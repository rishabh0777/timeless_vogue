import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AddressContext = createContext();

export const addAddress = async (address)=>{
    try{
      const myAddress = await axios.post('/api/v1/address/add', address)
      console.log("Successfully Address Created!");
      return myAddress
    }catch{
      console.log("Something went wrong!");
    }
}

export const fetchAddress = async (user)=>{
  try{
    const myAddress = await axios.get('/api/v1/address/get');
    console.log("Address Fetched");
    return myAddress;
  }catch{
    console.log("Something went wrong!");
  }
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
