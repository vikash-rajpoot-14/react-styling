
import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut : ()=>{},
    onLogin : ()=>{},
})

export const AuthContextProvider = (props)=>{
    const userlogin = localStorage.getItem("isLoggedIn")
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const loginHandler = (email, password) => {
      localStorage.setItem('isLoggedIn', "1")
      setIsLoggedIn(true);
    };
  
    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn')
      setIsLoggedIn(false);
    };
    useEffect(()=>{
      if(userlogin==="1"){
        setIsLoggedIn(true);
      }
    },[userlogin])

    return <AuthContext.Provider value={{isLoggedIn : isLoggedIn ,onLogOut : logoutHandler,onLogin:loginHandler }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;