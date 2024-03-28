import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo-no-background.png'; // Import the logo image
import { useAuth } from './AuthContext'; // Import the useAuth hook

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
                    {isLoggedIn ? ( // Show "User Profile" link only when logged in
                        <>
                            <MenuItem onClick={handleClose}><Link to="/user-profile">User Profile</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/logout">Logout</Link></MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={handleClose}><Link to="/login">Login</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
