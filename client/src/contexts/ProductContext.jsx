import { createContext, useState, useEffect } from "react";
import axios from 'axios';




const ProductContext = createContext();



const ProductProvider = ({children})=>{
    const [products, setProducts] = useState([])

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
        <ProductContext.Provider value={{products}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider; 
export {ProductContext};