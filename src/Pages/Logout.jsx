import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { logout } = useAuth(); // Use login function from useAuth

  useEffect(() => {
    // Simulate some asynchronous initialization tasks
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 2-second loading time
  }, []);

  useEffect(() => {
    // Clear token and related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.setItem('isLoggedIn', false);
    logout(); // Call the logout function

    // Redirect to the login page
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirect after 2 seconds

    // Open Snackbar to notify user about logout
    setOpenSnackbar(true);
  }, [navigate, logout]); // Include logout in the dependency array

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust anchor origin for mobile devices
      >
        <MuiAlert onClose={handleSnackbarClose} severity="info">
          You have been logged out.
        </MuiAlert>
      </Snackbar>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div> {/* Display CircularProgress while logging out */}
          <p style={{ marginTop: '20px' }}>Please visit again!</p> {/* Display message */}
        </div>
      ) : (
        <div>Logging out...</div>
      )}
    </div>
  );
};

export default Logout;
