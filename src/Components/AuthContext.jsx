// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     const tokenExpiration = localStorage.getItem('tokenExpiration');
//     const currentTime = new Date().getTime();

//     return userLoggedIn && tokenExpiration && currentTime < parseInt(tokenExpiration);
//   });
  
//   const [currentUser, setCurrentUser] = useState(() => {
//     const user = JSON.parse(localStorage.getItem('currentUser'));
//     return user ? user : null;
//   });

//   const login = () => {
//     // Your login logic here
//     setIsLoggedIn(true);
//     localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
//     // Set currentUser if needed
//     const user = JSON.parse(localStorage.getItem('currentUser'));
//     setCurrentUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('tokenExpiration');
//     localStorage.setItem('isLoggedIn', 'false'); // Store login status in localStorage
//     setIsLoggedIn(false);
//     // Clear currentUser
//     setCurrentUser(null);
//   };

//   useEffect(() => {
//     const checkLoggedInStatus = () => {
//       const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//       const tokenExpiration = localStorage.getItem('tokenExpiration');
//       const currentTime = new Date().getTime();

//       if (userLoggedIn && tokenExpiration && currentTime < parseInt(tokenExpiration)) {
//         setIsLoggedIn(true);
//         // Set currentUser if needed
//         const user = JSON.parse(localStorage.getItem('currentUser')); // Assuming currentUser is stored in localStorage
//         setCurrentUser(user);
//       } else {
//         setIsLoggedIn(false);
//         // Clear currentUser
//         setCurrentUser(null);
//       }
//     };

//     // Add event listener for changes in local storage
//     window.addEventListener('storage', checkLoggedInStatus);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('storage', checkLoggedInStatus);
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
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
  
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user : null;
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const currentTime = new Date().getTime();

      if (tokenExpiration && currentTime > parseInt(tokenExpiration)) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.setItem('isLoggedIn', 'false');
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [setIsLoggedIn, setCurrentUser]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
