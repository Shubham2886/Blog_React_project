import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import { Snackbar, Alert as MuiAlert } from '@mui/material';


const Logout = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { logout } = useAuth(); // Use login function from useAuth

  useEffect(() => {
    // Clear token and related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.setItem('isLoggedIn', false);
    logout();
    // Redirect to the login page
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirect after 2 seconds

    // Open Snackbar to notify user about logout
    setOpenSnackbar(true);
  }, [navigate]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="info">
          You have been logged out.
        </MuiAlert>
      </Snackbar>
      <div>Logging out...</div>
    </div>
  );
};

export default Logout;
