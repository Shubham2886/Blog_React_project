import React, { useState } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext'; //
import '../assets/login.css'; // Import the CSS file for styling

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login function from useAuth

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            if (data.status === "ok") {
                // Handle successful login
                localStorage.setItem('token', data.jwt_token);
                // Set expiration timestamp (adjust expiresIn based on your token expiry logic)
                const expiresIn = 3600; // 1 hour in seconds
                const expirationTime = new Date().getTime() + expiresIn * 1000;
                localStorage.setItem('tokenExpiration', expirationTime);
                localStorage.setItem('isLoggedIn', true);
                login();
                setOpen(true); // Open the Snackbar for successful login
                setTimeout(() => {
                    setOpen(false); // Close the Snackbar after 3 seconds
                    navigate('/'); // Redirect to '/'
                }, 3000);
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage(error.message || 'An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='password' value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
            <Snackbar open={open}>
                <MuiAlert elevation={6} variant="filled" severity="success">
                    Login Successful
                </MuiAlert>
            </Snackbar>
            <Snackbar open={errorMessage !== ""} onClose={() => setErrorMessage("")}>
                <MuiAlert elevation={6} variant="filled" severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Login;
