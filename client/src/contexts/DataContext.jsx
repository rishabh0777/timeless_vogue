import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
const url = import.meta.env.VITE_API_BASE_URL


const DataContext = createContext();

export const addCart = async ({ userId, productId }) => {
  try {
    const response = await axios.post(`${url}/api/v1/products/cart`, {
      userId,
      productId,
    }, { withCredentials: true });

    return response.data;
  } catch (error) {
    // console.log(`unable to add item in cart: ${error}`)
    throw error
  }
};



// function to fetch cart data
export const fetchData = async (info) => {
  if (info.isLoggedIn) {
    try {
      const response = await axios.get(`${url}/api/v1/products/cart/${info.userId}`, {
  withCredentials: true
});
      info.setCart(response.data.data.cart);
      info.setCartLength(response.data.data.cart.items.length);
    } catch (error) {
      // console.err(err);
      throw err
    }
  } else {
    info.setCart({});
    info.setCartLength(0);
  }
};
// function to remove item from cart
export const removeItem = async ({ userId, productId }) => {
  try {
    const response = await axios.delete(
  `${url}/api/v1/products/cart/${userId}/remove-cart-item`,
  {
    data: { productId },
    withCredentials: true,
  }
);

    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error
  }
};

export const decreaseCartQuantity = async (userId, productId) => {
  try {
    const response = await axios.put(`${url}/api/v1/products/cart/decrease-quantity`, {
  userId,
  productId,
}, { withCredentials: true });

    setCart(response.data.data.cart);
    setCartLength(response.data.data.cart.items.length);
  } catch (error) {
    // console.log(error);
    throw error
  }
}


const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [myProductId, setMyProductId] = useState(null);
  const [cart, setCart] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // cart data fetching information for function


  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/products`);
        setProducts(response.data);
      } catch (err) {
        // console.log(err);
        throw err
      }
    };
    getProductData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"))
      if(!user){
        // console.log('user not found')
        return
      }
      if (isLoggedIn) {
        try {
          const response = await axios.get(`${url}/api/v1/products/cart/${user?._id}`, {
            withCredentials: true
          });
          setCart(response.data.data.cart);
          setCartLength(response.data.data.cart.items.length);
          // console.log(response)
        } catch (error) {
          // console.err(err);
          throw error
        }
      } else {
        setCart({});
        setCartLength(0);
      }
    };
    fetchData();
  }, [isLoggedIn, setIsLoggedIn, setCart]);





  return (
    <DataContext.Provider
      value={{ products, setCart, cart, cartLength, setCartLength, myProductId, setMyProductId }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
export { DataContext };
