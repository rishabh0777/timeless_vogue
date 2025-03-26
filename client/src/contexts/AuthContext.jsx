import { createContext, useState} from "react";


// Custom Hook for Input Handling
export const useInput = (initialValue="") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};





const AuthContext = createContext();


const AuthProvider = ({children})=>{ 
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return(
      <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};