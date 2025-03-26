import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import {AuthContext} from './AuthContext'




const DataContext = createContext();

export const addCart = async ({userId, productId})=>{
    try{
        const response = await axios.post(`api/v1/products/cart`, {userId, productId})
        return response.data
    }catch(error){
        console.log(`unable to add item in cart: ${error}`)
    }
}

export const removeItem = async ({userId, productId})=>{
    try{
        const response = await axios.delete(`api/v1/products/cart`, {userId, productId})
        return response.data
    }catch(error){
        console.log(`unable to remove item in cart: ${error}`)
    }
}





const DataProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [cartLength, setCartLength] =  useState(0);
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem('user'));



    useEffect(()=>{
        const getProductData = async ()=>{
            try{
                const response = await axios.get('/api/v1/products')
                setProducts(response.data)
            }catch(err){console.log(err)}
        }
        getProductData();
    },[])

    useEffect(()=>{
        const fetchData = async ()=>{
            if(isLoggedIn){
                try{
                    const response = await axios.get(`/api/v1/products/cart/${user._id}`)
                    setCart(response.data.data.cart)
                    setCartLength(response.data.data.cart.items.length)
                }catch(error){
                    console.err(err)
                }
            }else{
                setCart({})
                    setCartLength(0)
            }

        }
        fetchData();
    },[isLoggedIn, setIsLoggedIn, setCart]);


   
    
        
  

    
    return(
        <DataContext.Provider value={{products, setCart, cart, cartLength, setCartLength}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider; 
export {DataContext};