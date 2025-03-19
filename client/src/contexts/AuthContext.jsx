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
  const [userData, setUserData] = useState(false)


  return(
      <AuthContext.Provider value={{userData, setUserData}}>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};