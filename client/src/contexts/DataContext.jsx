import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const DataContext = createContext();

export const addCart = async ({ userId, productId }) => {
  try {
    const response = await axios.post(`api/v1/products/cart`, {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.log(`unable to add item in cart: ${error}`);
  }
};

// function to fetch cart data
export const fetchData = async (info) => {
  if (info.isLoggedIn) {
    try {
      const response = await axios.get(`/api/v1/products/cart/${info.userId}`);
      info.setCart(response.data.data.cart);
      info.setCartLength(response.data.data.cart.items.length);
    } catch (error) {
      console.err(err);
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
      `/api/v1/products/cart/${userId}/remove-cart-item`,
      { data: { productId } }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  // cart data fetching information for function

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.get("/api/v1/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProductData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`/api/v1/products/cart/${user._id}`);
          setCart(response.data.data.cart);
          setCartLength(response.data.data.cart.items.length);
        } catch (error) {
          console.err(err);
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
      value={{ products, setCart, cart, cartLength, setCartLength }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
export { DataContext };
