import { createContext, useState, useEffect } from "react";
import axios from 'axios';




const DataContext = createContext();

export const addCart = async ({userId, productId})=>{
    try{
        const response = await axios.post(`api/v1/products/cart`, {userId, productId})
        return response.data
    }catch(error){
        console.log(`unable to add item in cart: ${error}`)
    }
}

export const getCart = async (userId) => {
  try {
    const response = await axios.get(`/api/v1/products/cart/${userId}`);
    console.log(response?.data?.data?.cart)

    return response?.data?.data?.cart; // Ensure only cart is returned
  } catch (err) {
    console.log(err);
    return null;
  }
};





const DataProvider = ({children})=>{
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    useEffect(()=>{
        const getProductData = async ()=>{
            try{
                const response = await axios.get('/api/v1/products')
                setProducts(response.data)
            }catch(err){console.log(err)}
        }
        getProductData();
    },[])
   
    
        
  

    
    return(
        <DataContext.Provider value={{products, setCart, cart}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider; 
export {DataContext};