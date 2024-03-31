// // AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if user is logged in on component mount
//     const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check local storage
//     //console.log(userLoggedIn);
//     setIsLoggedIn(userLoggedIn);
//   }, []);


//   const login = () => {
//     // Your login logic here
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     // Your logout logic here
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    return userLoggedIn && tokenExpiration && currentTime < parseInt(tokenExpiration);
  });

  const login = () => {
    // Your login logic here
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.setItem('isLoggedIn', 'false'); // Store login status in localStorage
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const currentTime = new Date().getTime();

      if (userLoggedIn && tokenExpiration && currentTime < parseInt(tokenExpiration)) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // Add event listener for changes in local storage
    window.addEventListener('storage', checkLoggedInStatus);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', checkLoggedInStatus);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
