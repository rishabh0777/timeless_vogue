import { createContext, useState, useEffect } from "react";
import axios from 'axios';


const AuthContext = createContext();




const AuthProvider = ({children})=>{
  return(
      <AuthContext.Provider>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider;
export {AuthContext};