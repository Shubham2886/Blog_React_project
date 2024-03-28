// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check local storage
    //console.log(userLoggedIn);
    setIsLoggedIn(userLoggedIn);
  }, []);


  const login = () => {
    // Your login logic here
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
