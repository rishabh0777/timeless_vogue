import { createContext, useState, useEffect } from "react";
import axios from 'axios';




const DataContext = createContext();



const DataProvider = ({children})=>{
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
        <DataContext.Provider value={{products}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider; 
export {DataContext};