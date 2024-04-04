import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo-no-background.png'; // Import the logo image
import { useAuth } from './AuthContext'; // Import the useAuth hook
import '../assets/footer.css'
const Header = () => {
    const { isLoggedIn } = useAuth(); // Use the useAuth hook to get authentication state

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Adjust logo height */}
                    </Link>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}> {/* Align buttons to the right */}
                    <Button component={Link} to="/" color="inherit" style={{ marginRight: '10px' }}>Home</Button>
                    {isLoggedIn && ( // Show "Add Blog" link only when logged in
                        <Button component={Link} to="/addblog" color="inherit" style={{ marginRight: '10px' }}>Add Blog</Button>
                    )}
                    <Button
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        size="small" // Reduce the size of the IconButton
                        sx={{ padding: '4px' }} // Reduce padding to take up less space
                    >
                        <MenuIcon />
                    </Button>
                </div>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                {isLoggedIn ? (
                    [
                      <MenuItem key="profile" onClick={handleClose}><Link to="/user-profile">User Profile</Link></MenuItem>,
                      <MenuItem key="userBlogs" onClick={handleClose}><Link to="/user-blogs">Your Blogs</Link></MenuItem>,
                      <MenuItem key="userActivity" onClick={handleClose}><Link to="/user-activity">Your Activity</Link></MenuItem>,
                      <MenuItem key="logout" onClick={handleClose}><Link to="/logout">Logout</Link></MenuItem>
                    ]
                  ) : (
                    [
                      <MenuItem key="login" onClick={handleClose}><Link to="/login">Login</Link></MenuItem>,
                      <MenuItem key="register" onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
                    ]
                  )}                  
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const Footer = () => {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <p className="footer-text">&copy; 2024 Daily Blogs. All Rights Reserved.</p>
          <div className="footer-links">
            {/* Adding onClick event to the link */}
            <Link to="/privacy-policy" className="footer-link" onClick={scrollToTop}>Privacy Policy</Link>
            <span className="footer-separator"> | </span>
            <Link to="/terms-of-service" className="footer-link" onClick={scrollToTop}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    );
};

export { Header, Footer };
